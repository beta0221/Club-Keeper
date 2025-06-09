import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

// Get available time slots
export async function GET(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Start date and end date are required" },
        { status: 400 }
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        start_time: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            clerk_id: true,
          },
        },
      },
      orderBy: {
        start_time: "asc",
      },
    });

    // Filter user data based on the requesting user
    const filteredAppointments = appointments.map(appointment => {
      const isCurrentUserAppointment = appointment.user.clerk_id === user.id;
      return {
        ...appointment,
        user: isCurrentUserAppointment ? appointment.user : null,
        notes: isCurrentUserAppointment ? appointment.notes : "",
      };
    });

    return NextResponse.json(filteredAppointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// Create a new appointment
export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { startTime, endTime, notes } = body;

    if (!startTime || !endTime) {
      return NextResponse.json(
        { error: "Start time and end time are required" },
        { status: 400 }
      );
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }

    // Check for overlapping appointments
    const overlappingAppointment = await prisma.appointment.findFirst({
      where: {
        OR: [
          {
            AND: [
              { start_time: { lte: start } },
              { end_time: { gt: start } },
            ],
          },
          {
            AND: [
              { start_time: { lt: end } },
              { end_time: { gte: end } },
            ],
          },
          {
            AND: [
              { start_time: { gte: start } },
              { end_time: { lte: end } },
            ],
          },
        ],
      },
    });

    if (overlappingAppointment) {
      return NextResponse.json(
        { error: "This time slot overlaps with an existing appointment" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        start_time: start,
        end_time: end,
        notes,
        status: "confirmed",
        user: {
          connect: {
            clerk_id: user.id,
          },
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 }
    );
  }
} 