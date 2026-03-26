import { NextResponse } from 'next/server';

// GET /api/investors — investors list with filters
export async function GET() {
  // TODO: Supabase query with filters
  return NextResponse.json({ investors: [], total: 0 });
}

// POST /api/investors — add investor to user's list
export async function POST() {
  // TODO: Add investor to user's list
  return NextResponse.json({ success: true });
}
