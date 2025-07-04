import { NextResponse, NextRequest } from "next/server";
import { stripeService } from "@/libs/stripe";
import { prisma } from "@/lib/prisma";
import { currentUser } from '@clerk/nextjs/server'


export async function POST(req: NextRequest) {

    const user = await currentUser()

  if(!user.id) {
    return NextResponse.json(
      {
        error: "Not signed in",
      },
      {
        status: 401,
      }
    );
  }
  
  try {

    const subscription = await prisma.subscription.findFirst({
      where: {
        user_clerk_id: user.id,
      },
    });

    if (!subscription?.stripe_customer_id) {
      return NextResponse.json(
        {
          error:
            "You don't have a billing account yet. Make a purchase first.",
        },
        {
          status: 400,
        }
      );
    } 

    const returnUrl = `${req.headers.get('origin')}/dashboard`

    const stripePortalUrl = await stripeService.createCustomerPortal(subscription.stripe_customer_id, returnUrl);

    return NextResponse.json({
      url: stripePortalUrl,
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        error: e?.message,
      },
      {
        status: 500,
      }
    );
  }

}
