import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-03-25.dahlia" as any,
});

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Still optionally check auth but don't hard fail if it's a public pricing page check?
    // Actually the user is logged in for the dashboard, but if it's the landing page they might not be.
    // That's fine, we will just allow checking the promo code without auth.

    const body = await req.json();
    const { promoCode } = body;

    if (!promoCode) {
      return new NextResponse("Promo code is required", { status: 400 });
    }

    let discountMatch: {
      percent_off?: number | null;
      amount_off?: number | null;
      currency?: string | null;
    } | null = null;

    // 1. Check promotion codes
    const promotionCodes = await stripe.promotionCodes.list({
      code: promoCode,
      active: true,
      limit: 1,
    });

    if (promotionCodes.data.length > 0) {
      const coupon = promotionCodes.data[0].coupon;
      discountMatch = {
        percent_off: coupon.percent_off,
        amount_off: coupon.amount_off,
        currency: coupon.currency,
      };
    } else {
      // 2. Check coupons
      try {
        const coupon = await stripe.coupons.retrieve(promoCode);
        if (coupon.valid) {
          discountMatch = {
            percent_off: coupon.percent_off,
            amount_off: coupon.amount_off,
            currency: coupon.currency,
          };
        }
      } catch (err: any) {
        // Not a valid coupon
      }
    }

    if (discountMatch) {
      return NextResponse.json(discountMatch);
    } else {
      return new NextResponse("Geçersiz promosyon kodu / Invalid promo code", {
        status: 400,
      });
    }
  } catch (error: any) {
    console.error("Stripe validate promo error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
