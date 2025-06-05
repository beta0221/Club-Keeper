import { currentUser } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { User } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // TODO: Add proper admin check here
    // For now, we'll just check if the user exists

    // Fetch all users from Clerk
    const clerk = await clerkClient();
    const response = await clerk.users.getUserList();
    const users = response.data;

    // Fetch subscription data for all users
    const subscriptions = await prisma.subscription.findMany({
      where: {
        user_clerk_id: {
          in: users.map((user: User) => user.id),
        },
      },
    });

    // Combine user data with subscription data
    const usersWithSubscriptions = users.map((user: User) => {
      const subscription = subscriptions.find(
        (sub) => sub.user_clerk_id === user.id
      );
      return {
        ...user,
        subscription: subscription
          ? {
              status: subscription.sub_status,
              type: subscription.sub_type,
              end_date: subscription.end_date,
              user_email: subscription.user_email,
              id: subscription.id
            }
          : null,
      };
    });

    return NextResponse.json(usersWithSubscriptions);
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 