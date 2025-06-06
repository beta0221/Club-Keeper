import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { startTime, endTime } = body;

    if (!startTime || !endTime) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validate time slot
    if (start >= end) {
      return new NextResponse("End time must be after start time", { status: 400 });
    }

    // Check if slot overlaps with existing slots
    const overlappingSlot = await prisma.timeSlot.findFirst({
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
        ],
      },
    });

    if (overlappingSlot) {
      return new NextResponse("Time slot overlaps with an existing slot", { status: 400 });
    }

    // Create the time slot
    const timeSlot = await prisma.timeSlot.create({
      data: {
        start_time: start,
        end_time: end,
        is_available: true,
        max_bookings: 1,
        current_bookings: 0,
      },
    });

    return NextResponse.json(timeSlot);
  } catch (error) {
    console.error("[SLOTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 