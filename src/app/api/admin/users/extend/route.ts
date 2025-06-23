import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { subscriptionId, durationDays, reason, userEmail } = body;

    if (!durationDays || !userEmail) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    
    const result = await clerkClient.users.getUserList({
      emailAddress: [userEmail],
    });

    if (result.length === 0) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    let clertUser = result[0]

    // First, ensure the user exists
    const targetUser = await prisma.user.upsert({
      where: { email: userEmail },
      update: {},
      create: {
        email: userEmail,
        clerk_id: clertUser.id,
        name: clertUser.firstName ? `${clertUser.firstName} ${clertUser .lastName || ''}`.trim() : null,
      },
    });

    let subscription;
    let currentEndDate = new Date();

    if (subscriptionId) {
      // If subscriptionId is provided, try to find and update existing subscription
      subscription = await prisma.subscription.findUnique({
        where: { id: subscriptionId },
      });

      if (subscription) {
        // If subscription exists and is not expired, use its end date
        if (subscription.end_date && new Date(subscription.end_date) > new Date()) {
          currentEndDate = new Date(subscription.end_date);
        }
      }
    }

    // Calculate new end date
    const newEndDate = new Date(currentEndDate);
    newEndDate.setDate(newEndDate.getDate() + durationDays);

    // Use upsert to handle both creation and update cases
    subscription = await prisma.subscription.upsert({
      where: {
        user_email: userEmail,
      },
      update: {
        end_date: newEndDate,
        sub_status: "active",
      },
      create: {
        user_email: userEmail,
        user_clerk_id: targetUser.clerk_id,
        sub_status: "active",
        sub_type: "admin_extended",
        end_date: newEndDate,
        last_stripe_cs_id: `admin_ext_${Date.now()}`,
        stripe_customer_id: `admin_ext_${Date.now()}`,
      },
    });

    // Create extension record
    const extension = await prisma.subscriptionExtension.create({
      data: {
        subscription_id: subscription.id,
        extended_by: user.id,
        previous_end: currentEndDate,
        new_end: newEndDate,
        duration_days: durationDays,
        reason: reason || null,
      },
    });

    return NextResponse.json({
      subscription,
      extension,
    });
  } catch (error) {
    console.error("Error extending subscription:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 