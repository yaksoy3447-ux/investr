'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Investor, CRMStage } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

export interface CRMItem {
  id: string;
  investor_id: string;
  investor: Investor;
  crm_stage: CRMStage;
  notes: string;
  added_at: string;
}

type CRMContextType = {
  items: CRMItem[];
  loading: boolean;
  addToList: (investor: Investor) => void;
  removeFromList: (investorId: string) => void;
  updateStage: (itemId: string, stage: CRMStage) => void;
  updateNotes: (itemId: string, notes: string) => void;
  isInList: (investorId: string) => boolean;
};

const CRMContext = createContext<CRMContextType>({
  items: [],
  loading: true,
  addToList: () => {},
  removeFromList: () => {},
  updateStage: () => {},
  updateNotes: () => {},
  isInList: () => false,
});

export function CRMProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CRMItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from Supabase on mount
  useEffect(() => {
    async function loadList() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('investor_lists')
        .select(`
          *,
          investor:investors(*)
        `)
        .eq('user_id', user.id)
        .order('added_at', { ascending: false });

      if (!error && data) {
        setItems(data.map((item: Record<string, unknown>) => ({
          id: item.id as string,
          investor_id: item.investor_id as string,
          investor: item.investor as Investor,
          crm_stage: item.crm_stage as CRMStage,
          notes: (item.notes as string) || '',
          added_at: item.added_at as string,
        })));
      }
      setLoading(false);
    }

    loadList();
  }, []);

  const addToList = useCallback(async (investor: Investor) => {
    // Optimistic update
    const tempId = crypto.randomUUID();
    const newItem: CRMItem = {
      id: tempId,
      investor_id: investor.id,
      investor,
      crm_stage: 'new' as CRMStage,
      notes: '',
      added_at: new Date().toISOString(),
    };

    setItems((prev) => {
      if (prev.some((item) => item.investor_id === investor.id)) return prev;
      return [...prev, newItem];
    });

    // Persist to Supabase
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('investor_lists')
      .upsert({
        user_id: user.id,
        investor_id: investor.id,
        crm_stage: 'new',
      }, { onConflict: 'user_id,investor_id' })
      .select(`
        *,
        investor:investors(*)
      `)
      .single();

    if (!error && data) {
      // Replace temp item with real one from DB
      setItems((prev) =>
        prev.map((item) =>
          item.id === tempId
            ? {
                id: data.id,
                investor_id: data.investor_id,
                investor: data.investor as Investor,
                crm_stage: data.crm_stage as CRMStage,
                notes: data.notes || '',
                added_at: data.added_at,
              }
            : item
        )
      );
    }
  }, []);

  const removeFromList = useCallback(async (investorId: string) => {
    // Optimistic remove
    setItems((prev) => prev.filter((item) => item.investor_id !== investorId));

    // Delete from Supabase
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('investor_lists')
      .delete()
      .eq('user_id', user.id)
      .eq('investor_id', investorId);
  }, []);

  const updateStage = useCallback(async (itemId: string, stage: CRMStage) => {
    // Optimistic update
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, crm_stage: stage } : item))
    );

    // Persist
    const supabase = createClient();
    await supabase
      .from('investor_lists')
      .update({ crm_stage: stage })
      .eq('id', itemId);
  }, []);

  const updateNotes = useCallback(async (itemId: string, notes: string) => {
    // Optimistic update
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, notes } : item))
    );

    // Persist
    const supabase = createClient();
    await supabase
      .from('investor_lists')
      .update({ notes })
      .eq('id', itemId);
  }, []);

  const isInList = useCallback(
    (investorId: string) => items.some((item) => item.investor_id === investorId),
    [items]
  );

  return (
    <CRMContext.Provider value={{ items, loading, addToList, removeFromList, updateStage, updateNotes, isInList }}>
      {children}
    </CRMContext.Provider>
  );
}

export const useCRM = () => useContext(CRMContext);
