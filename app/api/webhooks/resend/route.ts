import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We will lazily initialize the admin client
let supabaseAdmin: ReturnType<typeof createClient>;

function getAdminClient() {
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
      process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
    );
  }
  return supabaseAdmin;
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    
    // Resend webhook payload structure:
    // { type: "email.opened", created_at: "...", data: { id: "resend_email_id", tags: [ { name: "thread_id", value: "..." } ] } }
    
    const { type, data } = payload;
    
    if (!type || !data) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const tags = data.tags || [];
    const threadTag = tags.find((t: { name: string; value: string }) => t.name === 'thread_id');
    const threadId = threadTag?.value;

    if (!threadId) {
      console.log('Webhook received but no thread_id tag found. Skipping.', type);
      return NextResponse.json({ success: true, warning: 'No thread_id found' });
    }

    const supabase = getAdminClient();

    const updates: Record<string, string> = {};
    let newStatus = '';

    // Map Resend events to our local DB statuses
    switch (type) {
      case 'email.sent':
      case 'email.delivered':
        newStatus = 'delivered';
        break;
      case 'email.opened':
      case 'email.clicked':
        newStatus = 'opened';
        updates.opened_at = new Date().toISOString();
        break;
      case 'email.bounced':
      case 'email.complained':
        newStatus = 'bounced';
        break;
      default:
        // Other events (e.g. delivery_delayed) can be ignored
        break;
    }

    // Only update if it's a known status change and it's an escalation 
    // (e.g. don't downgrade 'opened' to 'delivered' if delivered event comes late)
    if (newStatus) {
      // Fetch current status to avoid downgrading
      const { data: currentThread } = await supabase
        .from('email_threads')
        .select('status')
        .eq('id', threadId)
        .single() as { data: { status: string } | null };
        
      if (currentThread) {
        const statuses = ['sent', 'delivered', 'opened', 'replied', 'bounced'];
        const currentScore = statuses.indexOf(currentThread.status || 'sent');
        const newScore = statuses.indexOf(newStatus);
        
        // Bounced always overwrites, other statuses only if higher index (i.e. more advanced state)
        if (newStatus === 'bounced' || newScore > currentScore) {
          updates.status = newStatus;
          
          const { error } = await supabase
            .from('email_threads')
            // @ts-expect-error - Supabase infers never without generated types
            .update(updates)
            .eq('id', threadId);
            
          if (error) {
            console.error('Failed to update thread status:', error);
          }
        }
      }
    }

    // Unsubscribe handling via webhooks (e.g. user clicked native unsubscribe header in email if supported)
    if (type === 'email.complained' || (type === 'email.clicked' && data.click && data.click.url?.includes('unsubscribe'))) {
      // We need investor ID to mark as unsubscribed
      const { data: thread } = await supabase
        .from('email_threads')
        .select('investor_id')
        .eq('id', threadId)
        .single() as { data: { investor_id: string } | null };
        
      if (thread && thread.investor_id) {
        await supabase
          .from('investors')
          // @ts-expect-error - Supabase infers never without generated types
          .update({ opted_out: true, opted_out_at: new Date().toISOString() })
          .eq('id', thread.investor_id);
      }
    }

    return NextResponse.json({ success: true, processed: true });
    
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
