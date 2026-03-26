import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-24.acacia',
});

// We need the service role key to bypass RLS and update user plans
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // We expect the user's ID to be passed in client_reference_id
    const userId = session.client_reference_id;
    const customerEmail = session.customer_details?.email;
    
    if (userId) {
      // Logic to map the purchased price ID to the internal plan name
      let newPlan = 'starter';
      
      // Determine plan by identifying the session's item
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0]?.price?.id;
      
      if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID) {
        newPlan = 'premium';
      } else if (priceId === process.env.STRIPE_GROWTH_PRICE_ID) {
        newPlan = 'pro';
      } else {
        newPlan = 'starter';
      }

      // Update the user's plan in Supabase
      const { error } = await supabase
        .from('users')
        .update({
          plan: newPlan,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: session.subscription as string,
        })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user plan:', error);
        return new NextResponse('Database Update Failed', { status: 500 });
      }
      
      console.log(`User ${userId} upgraded to ${newPlan}`);
    } else {
      console.warn('Checkout completed but no client_reference_id found.');
    }
  }

  // Handle subscription cancellations
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    
    const { error } = await supabase
      .from('users')
      .update({ plan: 'free' })
      .eq('stripe_subscription_id', subscription.id);
      
    if (error) {
      console.error('Error downgrading user:', error);
    }
  }

  return new NextResponse('Webhook Received', { status: 200 });
}
