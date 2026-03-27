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

    // Get user from our database to find their stripe_subscription_id
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('stripe_subscription_id, plan')
      .eq('auth_id', user.id)
      .single();

    if (userError || !userData?.stripe_subscription_id) {
      return new NextResponse('No active subscription found.', { status: 400 });
    }

    if (userData.plan === 'free') {
      return new NextResponse('You are already on the free plan.', { status: 400 });
    }

    // Tell Stripe to cancel the subscription AT THE END of the current period
    const subscription = await stripe.subscriptions.update(userData.stripe_subscription_id, {
      cancel_at_period_end: true,
    }) as any;

    // INSTANTLY update our database so the user sees the change right away
    await supabase.from('users').update({
      cancel_at_period_end: true,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    }).eq('auth_id', user.id);

    // Create a notification for the user
    await supabase.from('notifications').insert({
      user_id: user.id,
      title: 'İptal Talebi Alındı',
      message: 'Aboneliğiniz dönem sonunda iptal edilecek şekilde ayarlandı. Bu tarihe kadar tüm özelliklerinizi kullanmaya devam edebilirsiniz.',
      type: 'warning'
    });

    return NextResponse.json({ message: 'Subscription will cancel at period end.' });
  } catch (error) {
    console.error('Stripe cancel error', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
