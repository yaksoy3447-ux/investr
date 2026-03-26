import { createClient } from '@/lib/supabase/client';

type ProfileData = {
  full_name?: string;
  company_name?: string;
  email?: string;
  website?: string;
  avatar_url?: string;
  locale?: string;
};

/**
 * Get the current user's profile from the users table
 */
export async function getProfile() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('auth_id', user.id)
    .single();

  if (error) {
    // Profile doesn't exist yet — return defaults
    if (error.code === 'PGRST116') {
      return {
        auth_id: user.id,
        email: user.email || '',
        full_name: user.user_metadata?.full_name || '',
        company_name: '',
        website: '',
        avatar_url: '',
        plan: 'free' as const,
        locale: 'tr' as const,
      };
    }
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

/**
 * Update the current user's profile
 */
export async function updateProfile(profileData: ProfileData) {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  // Upsert: create if not exists, update if exists
  const { data, error } = await supabase
    .from('users')
    .upsert({
      auth_id: user.id,
      email: user.email || profileData.email,
      ...profileData,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'auth_id',
    })
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    return { error: error.message };
  }

  return { data };
}

/**
 * Create a profile for a new user (called after signup)
 */
export async function createProfile(authId: string, email: string, fullName?: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('users')
    .insert({
      auth_id: authId,
      email,
      full_name: fullName || '',
      plan: 'free',
      locale: 'tr',
    });

  if (error && error.code !== '23505') {
    // 23505 = unique_violation (profile already exists)
    console.error('Error creating profile:', error);
    return false;
  }

  return true;
}

/**
 * Get user's current plan
 */
export async function getUserPlan(): Promise<'free' | 'starter' | 'pro'> {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 'free';

  const { data } = await supabase
    .from('users')
    .select('plan')
    .eq('auth_id', user.id)
    .single();

  return (data?.plan as 'free' | 'starter' | 'pro') || 'free';
}
