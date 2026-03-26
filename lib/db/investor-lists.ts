import { createClient } from '@/lib/supabase/client';
import type { InvestorListItem, CRMStage, Investor } from '@/lib/types';

/**
 * Get all CRM list items for the current user (with investor data joined)
 */
export async function getUserList(): Promise<InvestorListItem[]> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('investor_lists')
    .select(`
      *,
      investor:investors(*)
    `)
    .eq('user_id', user.id)
    .order('added_at', { ascending: false });

  if (error) {
    console.error('Error fetching user list:', error);
    return [];
  }

  return data as InvestorListItem[];
}

/**
 * Add an investor to the user's CRM list
 */
export async function addToList(investor: Investor): Promise<InvestorListItem | null> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('investor_lists')
    .upsert({
      user_id: user.id,
      investor_id: investor.id,
      crm_stage: 'new',
    }, {
      onConflict: 'user_id,investor_id',
    })
    .select(`
      *,
      investor:investors(*)
    `)
    .single();

  if (error) {
    console.error('Error adding to list:', error);
    return null;
  }

  return data as InvestorListItem;
}

/**
 * Remove an investor from the user's CRM list
 */
export async function removeFromList(investorId: string): Promise<boolean> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('investor_lists')
    .delete()
    .eq('user_id', user.id)
    .eq('investor_id', investorId);

  if (error) {
    console.error('Error removing from list:', error);
    return false;
  }

  return true;
}

/**
 * Update the CRM stage of a list item
 */
export async function updateStage(itemId: string, stage: CRMStage): Promise<boolean> {
  const supabase = createClient();

  const { error } = await supabase
    .from('investor_lists')
    .update({ crm_stage: stage })
    .eq('id', itemId);

  if (error) {
    console.error('Error updating stage:', error);
    return false;
  }

  return true;
}

/**
 * Check if an investor is in the user's list
 */
export async function isInList(investorId: string): Promise<boolean> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from('investor_lists')
    .select('id')
    .eq('user_id', user.id)
    .eq('investor_id', investorId)
    .maybeSingle();

  if (error) return false;
  return !!data;
}
