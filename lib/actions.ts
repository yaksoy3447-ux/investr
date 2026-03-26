'use server';

import { createClient } from '@/lib/supabase/server';
import type { Investor, InvestorListItem, CRMStage } from '@/lib/types';

// ===== INVESTORS =====

export async function getInvestors(filters?: {
  search?: string;
  types?: string[];
  sectors?: string[];
  stages?: string[];
  locations?: string[];
  verifiedOnly?: boolean;
}): Promise<Investor[]> {
  const supabase = await createClient();

  let query = supabase
    .from('investors')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (filters?.search) {
    query = query.or(
      `name.ilike.%${filters.search}%,company.ilike.%${filters.search}%`
    );
  }

  if (filters?.types?.length) {
    query = query.overlaps('investor_type', filters.types);
  }

  if (filters?.sectors?.length) {
    query = query.overlaps('sectors', filters.sectors);
  }

  if (filters?.stages?.length) {
    query = query.overlaps('stages', filters.stages);
  }

  if (filters?.locations?.length) {
    const cityMap: Record<string, string> = {
      istanbul: 'İstanbul',
      ankara: 'Ankara',
      izmir: 'İzmir',
    };
    const cities = filters.locations
      .filter((l) => l !== 'other')
      .map((l) => cityMap[l] || l);
    if (cities.length > 0) {
      query = query.in('location_city', cities);
    }
  }

  if (filters?.verifiedOnly) {
    query = query.eq('email_verified', true);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ===== INVESTOR LIST (CRM) =====

export async function getUserInvestorList(): Promise<InvestorListItem[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('investor_list')
    .select(`
      *,
      investor:investors(*)
    `)
    .eq('user_id', user.id)
    .order('added_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function addToList(investorId: string): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase.from('investor_list').upsert(
    {
      user_id: user.id,
      investor_id: investorId,
      crm_stage: 'new',
    },
    { onConflict: 'user_id,investor_id' }
  );

  if (error) throw error;
}

export async function removeFromList(investorId: string): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('investor_list')
    .delete()
    .eq('user_id', user.id)
    .eq('investor_id', investorId);

  if (error) throw error;
}

export async function updateCRMStage(
  listItemId: string,
  stage: CRMStage
): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('investor_list')
    .update({ crm_stage: stage })
    .eq('id', listItemId)
    .eq('user_id', user.id);

  if (error) throw error;
}

export async function updateListNotes(
  listItemId: string,
  notes: string
): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('investor_list')
    .update({ notes })
    .eq('id', listItemId)
    .eq('user_id', user.id);

  if (error) throw error;
}

// ===== PROFILE =====

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(updates: {
  full_name?: string;
  company_name?: string;
  website?: string;
  bio?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id);

  if (error) throw error;
}

// ===== EMAILS =====

export async function getDailyEmailUsage(): Promise<number> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const today = new Date().toISOString().split('T')[0];
  const { data } = await supabase
    .from('daily_email_usage')
    .select('count')
    .eq('user_id', user.id)
    .eq('date', today)
    .single();

  return data?.count || 0;
}
