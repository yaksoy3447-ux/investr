import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// We will lazily initialize clients to avoid build errors if env vars are missing
let resend: Resend;
let supabaseAdmin: ReturnType<typeof createClient>;

function getClients() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key');
  }
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
      process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
    );
  }
  return { resend, supabaseAdmin };
}

export async function POST(req: Request) {
  try {
    const { resend, supabaseAdmin } = getClients();
    
    const { to, subject, body, userId, threadId } = await req.json();

    if (!to || !subject || !body || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId);

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    const senderName = user.user.user_metadata?.full_name || 'GetInvestr Üyesi';
    
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        <tr>
          <!-- Header Logo Alanı -->
          <td style="background-color: #0b2239; padding: 32px 24px; text-align: center;">
            <div style="font-size: 28px; font-weight: 700; letter-spacing: -0.5px; display: inline-block;">
              <span style="color: #ffffff;">Get</span><span style="color: #3b82f6;">Investr</span>
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 32px; color: #334155; font-size: 16px; line-height: 1.6;">
            ${body.replace(/\n/g, '<br/>')}
          </td>
        </tr>
        <tr>
          <td style="background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0 0 12px 0; color: #64748b; font-size: 13px;">
              Bu e-posta, <strong>${senderName}</strong> tarafından <strong>GetInvestr</strong> ağını kullanarak gönderilmiştir.
            </p>
            <p style="margin: 0 0 12px 0; color: #94a3b8; font-size: 11px;">
              GetInvestr platformu üzerinden daha fazla e-posta almak istemiyorsanız, lütfen <a href="mailto:info@getinvestr.com?subject=Unsubscribe" style="color: #94a3b8; text-decoration: underline;">buraya tıklayarak</a> abonelikten ayrılın.
            </p>
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
              &copy; ${new Date().getFullYear()} GetInvestr Inc. Tüm hakları saklıdır.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;

    // Attempt to send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'outreach@getinvestr.com',
      to: [to],
      subject: subject,
      html: htmlContent,
      replyTo: user.user.email || 'info@getinvestr.com',
      tags: threadId ? [{ name: 'thread_id', value: threadId }] : undefined,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Internal server error';
    console.error('Email send failed:', err);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
