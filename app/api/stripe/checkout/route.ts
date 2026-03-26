import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-03-25.dahlia',
});

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { planLevel } = body;

    let priceId = '';
    if (planLevel === 'premium') {
      priceId = process.env.STRIPE_PREMIUM_PRICE_ID as string;
    } else if (planLevel === 'growth') {
      priceId = process.env.STRIPE_GROWTH_PRICE_ID as string;
    } else if (planLevel === 'starter') {
      priceId = process.env.STRIPE_STARTER_PRICE_ID as string;
    }

    if (!priceId) {
      return new NextResponse('Invalid or missing planLevel', { status: 400 });
    }

    // Determine return URL based on environments
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_email: user.email,
      client_reference_id: user.id, // Very important for webhook mapping
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/tr/settings?success=true`,
      cancel_url: `${appUrl}/tr/pricing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
