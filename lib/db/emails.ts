import { createClient } from '@/lib/supabase/client';

/**
 * Create an email thread when user sends an outreach email
 */
export async function createEmailThread(investorId: string, subject: string, body: string) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  // Create thread
  const { data: thread, error: threadError } = await supabase
    .from('email_threads')
    .insert({
      user_id: user.id,
      investor_id: investorId,
      subject,
      status: 'sent',
      reply_to_address: `user-${user.id.slice(0, 8)}@mail.investr.co`,
      sent_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (threadError || !thread) {
    console.error('Error creating thread:', threadError);
    return { error: threadError?.message || 'Failed to create thread' };
  }

  // Create the outbound message
  const { error: msgError } = await supabase
    .from('email_messages')
    .insert({
      thread_id: thread.id,
      direction: 'outbound',
      body,
    });

  if (msgError) {
    console.error('Error creating message:', msgError);
  }

  return { data: thread };
}

/**
 * Get all email threads for the current user (with investor data)
 */
export async function getEmailThreads() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('email_threads')
    .select(`
      *,
      investor:investors(id, name, company, investor_type),
      messages:email_messages(*)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching threads:', error);
    return [];
  }

  return data || [];
}

/**
 * Get this month's email count for the current user (for monthly limit)
 */
export async function getMonthlyEmailCount(): Promise<number> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  // Start of this month (UTC)
  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);

  const { count, error } = await supabase
    .from('email_threads')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('sent_at', monthStart.toISOString());

  if (error) return 0;
  return count || 0;
}

/**
 * Add a reply message to an existing thread
 */
export async function addReplyToThread(threadId: string, body: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('email_messages')
    .insert({
      thread_id: threadId,
      direction: 'outbound',
      body,
    });

  if (error) {
    console.error('Error adding reply:', error);
    return { error: error.message };
  }

  return { success: true };
}
