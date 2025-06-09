import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

// Get available time slots
export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        user: {
          clerk_id: userId,
        },
      },
      orderBy: {
        start_time: "desc",
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("[APPOINTMENTS_ME_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}