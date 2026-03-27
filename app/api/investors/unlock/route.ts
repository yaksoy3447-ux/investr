import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    const body = await req.json();
    const { userId, investorId } = body;

    if (!userId || !investorId) {
      return NextResponse.json({ error: 'Missing userId or investorId' }, { status: 400 });
    }

    // 1. Verify if user has enough credits
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('credits')
      .eq('auth_id', userId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.credits <= 0) {
      return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
    }

    // 2. Check if already unlocked
    const { data: existingUnlock } = await supabaseAdmin
      .from('unlocked_investors')
      .select('id')
      .eq('user_id', userId)
      .eq('investor_id', investorId)
      .single();

    if (existingUnlock) {
      return NextResponse.json({ success: true, message: 'Already unlocked' });
    }

    // 3. Deduct credit & insert unlock record in a transaction-like manner
    // Since Supabase REST API doesn't have true transactions without custom RPC functions,
    // we'll do it sequentially.
    
    const { error: unlockError } = await supabaseAdmin
      .from('unlocked_investors')
      .insert({ user_id: userId, investor_id: investorId });

    if (unlockError) {
      return NextResponse.json({ error: 'Failed to unlock investor' }, { status: 500 });
    }

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ credits: user.credits - 1 })
      .eq('auth_id', userId);

    if (updateError) {
      // Rollback logic could go here in a production env
      return NextResponse.json({ error: 'Failed to deduct credit' }, { status: 500 });
    }

    return NextResponse.json({ success: true, creditsRemaining: user.credits - 1 });
  } catch (error) {
    console.error('Unlock error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
