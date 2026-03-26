import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Create a server-side Supabase client to verify auth and deduct limits
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { to, subject, body, userId } = await req.json();

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

    // Attempt to send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'outreach@getinvestr.com',
      to: [to],
      subject: subject,
      html: body.replace(/\n/g, '<br/>'),
      replyTo: `info@getinvestr.com`,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('Email send failed:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
