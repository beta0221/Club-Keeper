import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();

  // TODO: Add proper role-based access control
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const totalUsers = await prisma.user.count();

    const activeSubscriptions = await prisma.subscription.count({
      where: {
        sub_status: "active",
      },
    });

    return NextResponse.json({
      totalUsers,
      activeUsers: activeSubscriptions,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
