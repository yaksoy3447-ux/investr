import { createClient } from '@/lib/supabase/client';
import type { Investor } from '@/lib/types';

type InvestorFilters = {
  types?: string[];
  sectors?: string[];
  stages?: string[];
  locations?: string[];
  search?: string;
};

/**
 * Fetch investors from Supabase with optional filters
 */
export async function getInvestors(filters?: InvestorFilters): Promise<Investor[]> {
  const supabase = createClient();

  let query = supabase
    .from('investors')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  // Array overlap filters
  if (filters?.types && filters.types.length > 0) {
    query = query.overlaps('investor_type', filters.types);
  }

  if (filters?.sectors && filters.sectors.length > 0) {
    query = query.overlaps('sectors', filters.sectors);
  }

  if (filters?.stages && filters.stages.length > 0) {
    query = query.overlaps('stages', filters.stages);
  }

  if (filters?.locations && filters.locations.length > 0) {
    query = query.in('location_city', filters.locations.map(loc => {
      // Map filter values to actual city names
      const cityMap: Record<string, string> = {
        istanbul: 'İstanbul',
        ankara: 'Ankara',
        izmir: 'İzmir',
      };
      return cityMap[loc] || loc;
    }));
  }

  // Text search
  if (filters?.search && filters.search.trim().length > 0) {
    const term = `%${filters.search.trim()}%`;
    query = query.or(`name.ilike.${term},company.ilike.${term}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching investors:', error);
    return [];
  }

  return data as Investor[];
}

/**
 * Get a single investor by ID
 */
export async function getInvestorById(id: string): Promise<Investor | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('investors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching investor:', error);
    return null;
  }

  return data as Investor;
}
