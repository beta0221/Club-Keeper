import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Generate time slots for a date range
export async function POST(request: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { startDate, endDate } = body;

    if (!startDate || !endDate) {
      return new NextResponse("Missing date range", { status: 400 });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeSlots = [];

    // Generate slots for each day in the range
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      // Generate slots from 9 AM to 5 PM with 1-hour intervals
      for (let hour = 9; hour < 17; hour++) {
        const slotStart = new Date(date);
        slotStart.setHours(hour, 0, 0, 0);
        
        const slotEnd = new Date(date);
        slotEnd.setHours(hour + 1, 0, 0, 0);

        // Check if slot already exists
        const existingSlot = await prisma.timeSlot?.findFirst({
          where: {
            start_time: slotStart,
            end_time: slotEnd,
          },
        });

        if (!existingSlot) {
          timeSlots.push({
            start_time: slotStart,
            end_time: slotEnd,
            is_available: true,
            max_bookings: 1,
            current_bookings: 0,
          });
        }
      }
    }

    // Create all new slots in a transaction
    if (timeSlots.length > 0) {
      await prisma.timeSlot?.createMany({
        data: timeSlots,
      });
    }

    return NextResponse.json({ message: "Time slots generated successfully" });
  } catch (error) {
    console.error("[TIMESLOTS_GENERATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 