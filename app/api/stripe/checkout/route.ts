import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-03-25.dahlia',
});

// ──────────────────────────────────────────────────
// Yearly multiplier: 9 means "pay 9 months, get 12"
// Change this single number to adjust the yearly deal.
// ──────────────────────────────────────────────────
const YEARLY_MULTIPLIER = 9;

// Monthly prices in USD cents (must match Stripe)
const MONTHLY_PRICES: Record<string, number> = {
  starter: 2900,   // $29
  pro: 6900,       // $69
  growth: 6900,    // $69 (alias)
  premium: 19900,  // $199
};

// Monthly credits given at purchase & refilled each month by cron
const PLAN_MONTHLY_CREDITS: Record<string, number> = {
  starter: 40,
  pro: 100,
  growth: 100,
  premium: 1000,
};

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { planLevel, quantity, isYearly } = body;

    let priceId = '';
    let checkoutMode: 'subscription' | 'payment' = 'subscription';
    let checkoutQuantity = 1;
    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];

    if (planLevel === 'premium') {
      priceId = process.env.STRIPE_PREMIUM_PRICE_ID as string;
    } else if (planLevel === 'pro' || planLevel === 'growth') {
      priceId = process.env.STRIPE_GROWTH_PRICE_ID as string;
    } else if (planLevel === 'starter') {
      priceId = process.env.STRIPE_STARTER_PRICE_ID as string;
    } else if (planLevel === 'credits') {
      priceId = process.env.STRIPE_CREDIT_PRICE_ID as string;
      checkoutMode = 'payment';
      checkoutQuantity = quantity ? parseInt(quantity.toString()) : 10;
    }

    if (!priceId && !isYearly) {
      return new NextResponse('Invalid or missing planLevel, or missing Stripe Price ID in Env.', { status: 400 });
    }

    // Determine return URL
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

    // ── Yearly one-time payment with dynamic price_data ──
    if (isYearly && planLevel !== 'credits') {
      const monthlyPriceCents = MONTHLY_PRICES[planLevel];
      if (!monthlyPriceCents) {
        return new NextResponse('Invalid plan for yearly billing.', { status: 400 });
      }

      const yearlyAmount = monthlyPriceCents * YEARLY_MULTIPLIER;
      const planName = planLevel.charAt(0).toUpperCase() + planLevel.slice(1);
      const monthlyCredits = PLAN_MONTHLY_CREDITS[planLevel] || 0;

      lineItems = [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `GetInvestr ${planName} - Yıllık Plan`,
            description: `12 aylık erişim (${YEARLY_MULTIPLIER} ay öde, ${12 - YEARLY_MULTIPLIER} ay hediye) · Aylık ${monthlyCredits} kredi`,
          },
          unit_amount: yearlyAmount,
          recurring: {
            interval: 'year' as const,
          },
        },
        quantity: 1,
      }];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        customer_email: user.email,
        client_reference_id: user.id,
        metadata: {
          planLevel,
          isYearly: 'true',
          monthlyCredits: monthlyCredits.toString(),
        },
        line_items: lineItems,
        mode: 'subscription',
        success_url: `${appUrl}/tr/settings?success=true`,
        cancel_url: `${appUrl}/tr/upgrade?canceled=true`,
      });

      return NextResponse.json({ url: session.url });
    }

    // ── Monthly subscription / Credit purchase (existing flow) ──
    lineItems = [{
      price: priceId,
      quantity: checkoutQuantity,
    }];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: lineItems,
      mode: checkoutMode,
      success_url: `${appUrl}/tr/settings?success=true`,
      cancel_url: `${appUrl}/tr/upgrade?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
