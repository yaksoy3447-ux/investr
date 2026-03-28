import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-03-25.dahlia',
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
    const userId = session.client_reference_id;
    
    if (userId) {
      // Fetch current plan and credits to increment
      const { data: user } = await supabase
        .from('users')
        .select('plan, credits')
        .eq('auth_id', userId)
        .single();
        
      let newPlan = user?.plan || 'free';
      let addedCredits = 0;
      let isYearlyPurchase = false;

      // ── Check if this is a YEARLY one-time purchase (via metadata) ──
      const isYearly = session.metadata?.isYearly === 'true';
      
      if (isYearly) {
        newPlan = session.metadata?.planLevel || newPlan;
        addedCredits = parseInt(session.metadata?.monthlyCredits || '0'); // Only first month
        console.log(`Yearly purchase detected: plan=${newPlan}, monthlyCredits=${addedCredits}`);
        isYearlyPurchase = true;
      } else {
        // ── Standard monthly subscription / credit purchase ──
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const firstItem = lineItems.data[0];
        const priceId = firstItem?.price?.id;
        const quantity = firstItem?.quantity || 1;
        
        if (priceId === process.env.STRIPE_PREMIUM_PRICE_ID?.trim()) {
          newPlan = 'premium';
          addedCredits = 1000;
        } else if (priceId === process.env.STRIPE_GROWTH_PRICE_ID?.trim()) {
          newPlan = 'pro';
          addedCredits = 100;
        } else if (priceId === process.env.STRIPE_STARTER_PRICE_ID?.trim()) {
          newPlan = 'starter';
          addedCredits = 40;
        } else if (priceId === process.env.STRIPE_CREDIT_PRICE_ID?.trim()) {
          addedCredits = quantity;
        } else {
          console.warn(`Webhook received unknown priceId: ${priceId}`);
        }
      }

      const currentCredits = user?.credits || 0;

      // Prepare the update payload
      const updatePayload: Record<string, unknown> = {
        plan: newPlan,
        credits: currentCredits + addedCredits,
      };

      if (session.customer) {
        updatePayload.stripe_customer_id = session.customer as string;
      }

      if (session.subscription) {
        updatePayload.stripe_subscription_id = session.subscription as string;
      }

      // Yearly plan: set expiry date 12 months from now and last refill date
      if (isYearlyPurchase) {
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
        updatePayload.yearly_plan_expires_at = expiresAt.toISOString();
        updatePayload.last_credit_refill = new Date().toISOString();
      }

      // Update the user's plan and credits in Supabase
      const { error } = await supabase
        .from('users')
        .update(updatePayload)
        .eq('auth_id', userId);

      if (error) {
        console.error('Error updating user plan:', error);
        return new NextResponse(`Database Update Failed: ${error.message || JSON.stringify(error)}`, { status: 500 });
      }
      
      console.log(`User ${userId} upgraded to ${newPlan} and received ${addedCredits} credits.`);
      
      // INSERT NOTIFICATION
      let notificationMessage = '';
      const planName = newPlan.charAt(0).toUpperCase() + newPlan.slice(1);
      
      if (isYearly) {
        notificationMessage = `${planName} Yıllık Plan'a başarıyla geçiş yaptınız! ${addedCredits} kredi hesabınıza tanımlandı.`;
      } else if (addedCredits > 0 && newPlan === (user?.plan || 'free')) {
        notificationMessage = `${addedCredits} yatırımcı kilidi açma krediniz başarıyla hesabınıza tanımlandı.`;
      } else if (newPlan !== (user?.plan || 'free')) {
        notificationMessage = `${planName} paketine başarıyla geçiş yaptınız. ${addedCredits > 0 ? addedCredits + ' krediniz eklendi.' : 'Tüm özellikleriniz aktif!'}`;
      }
      
      if (notificationMessage) {
        await supabase.from('notifications').insert({
          user_id: userId,
          title: 'Satın Alma Başarılı',
          message: notificationMessage,
          type: 'success'
        });
      }

    } else {
      console.warn('Checkout completed but no client_reference_id found.');
    }
  }

  // Handle monthly subscription recurring payments
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as any;
    if (invoice.billing_reason === 'subscription_cycle') {
       // Need to fetch user by stripe_subscription_id
       const { data: user } = await supabase
         .from('users')
         .select('id, auth_id, plan, credits')
         .eq('stripe_subscription_id', invoice.subscription as string)
         .single();
         
       if (user) {
         let refill = 40;
         if (user.plan === 'pro') refill = 100;
         if (user.plan === 'premium') refill = 1000;
         
         await supabase.from('users').update({ credits: user.credits + refill }).eq('id', user.id);
         console.log(`Refilled ${refill} credits for recurring subscription of user ${user.id}`);
         
         await supabase.from('notifications').insert({
           user_id: user.auth_id,
           title: 'Abonelik Yenilendi',
           message: `Aylık aboneliğiniz yenilendi ve ${refill} iletişim kilit kredisi hesabınıza yüklendi.`,
           type: 'info'
         });
       }
    }
  }

  // Handle subscription updates (like cancel_at_period_end)
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as any;
    console.log(`Subscription updated for ${subscription.id}: status=${subscription.status}, cancel_at_period_end=${subscription.cancel_at_period_end}`);
    
    const { error } = await supabase
      .from('users')
      .update({
        cancel_at_period_end: subscription.cancel_at_period_end,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id);

    if (error) {
      console.error('Error updating subscription status:', error);
    }
  }

  // Handle subscription cancellations
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    console.log(`Subscription deleted: ${subscription.id}. Downgrading user to free.`);
    
    const { error } = await supabase
      .from('users')
      .update({ 
        plan: 'free',
        cancel_at_period_end: false // Reset
      })
      .eq('stripe_subscription_id', subscription.id);
      
    if (error) {
      console.error('Error downgrading user:', error);
    }
  }

  return new NextResponse('Webhook Received', { status: 200 });
}
