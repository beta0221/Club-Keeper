import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const subscriptionId = searchParams.get("subscriptionId");

    if (!subscriptionId) {
      return new NextResponse("Missing subscriptionId", { status: 400 });
    }

    const extensions = await prisma.subscriptionExtension.findMany({
      where: {
        subscription_id: subscriptionId,
      },
      include: {
        admin: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json(extensions);
  } catch (error) {
    console.error("Error fetching extension history:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 