import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Monthly credit refills per plan
const PLAN_CREDITS: Record<string, number> = {
  starter: 40,
  pro: 100,
  premium: 1000,
};

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const now = new Date();

  // Find all yearly plan users whose plan is active AND haven't been refilled this month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const { data: users, error } = await supabase
    .from('users')
    .select('id, auth_id, plan, credits, last_credit_refill, yearly_plan_expires_at')
    .not('yearly_plan_expires_at', 'is', null)
    .gt('yearly_plan_expires_at', now.toISOString()) // Plan still active
    .lt('last_credit_refill', startOfMonth.toISOString()); // Not refilled this month

  if (error) {
    console.error('Cron refill query error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!users || users.length === 0) {
    return NextResponse.json({ message: 'No yearly users to refill', refilled: 0 });
  }

  let refilled = 0;

  for (const user of users) {
    const monthlyCredits = PLAN_CREDITS[user.plan] || 0;
    if (monthlyCredits === 0) continue;

    // ADD credits (don't replace) — previous month's leftover stays
    const newCredits = (user.credits || 0) + monthlyCredits;

    const { error: updateError } = await supabase
      .from('users')
      .update({
        credits: newCredits,
        last_credit_refill: now.toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      console.error(`Failed to refill user ${user.id}:`, updateError);
      continue;
    }

    // Send notification
    await supabase.from('notifications').insert({
      user_id: user.auth_id,
      title: 'Aylık Kredi Yüklendi',
      message: `Yıllık planınız kapsamında ${monthlyCredits} kredi hesabınıza eklendi. Toplam: ${newCredits}`,
      type: 'success',
    });

    refilled++;
    console.log(`Refilled ${monthlyCredits} credits for yearly user ${user.id}. New total: ${newCredits}`);
  }

  return NextResponse.json({
    message: `Monthly credit refill completed`,
    refilled,
    total_checked: users.length,
  });
}
