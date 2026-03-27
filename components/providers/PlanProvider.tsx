'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';

type Plan = 'free' | 'starter' | 'pro' | 'premium';

type PlanLimits = {
  maxCrmItems: number;
  maxEmailsPerMonth: number;
  canSendEmail: boolean;
  canSeeInvestorNames: boolean;
  canExportCsv: boolean;
  canUseAI: boolean;
};

const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    maxCrmItems: 5,
    maxEmailsPerMonth: 0,
    canSendEmail: false,
    canSeeInvestorNames: true,
    canExportCsv: false,
    canUseAI: false,
  },
  starter: {
    maxCrmItems: 100,
    maxEmailsPerMonth: 100,
    canSendEmail: true,
    canSeeInvestorNames: true,
    canExportCsv: true,
    canUseAI: false,
  },
  pro: {
    maxCrmItems: 500,
    maxEmailsPerMonth: 500,
    canSendEmail: true,
    canSeeInvestorNames: true,
    canExportCsv: true,
    canUseAI: true,
  },
  premium: {
    maxCrmItems: 1000,
    maxEmailsPerMonth: 1000,
    canSendEmail: true,
    canSeeInvestorNames: true,
    canExportCsv: true,
    canUseAI: true,
  },
};

type PlanContextType = {
  plan: Plan;
  limits: PlanLimits;
  credits: number;
  unlockedInvestorIds: string[];
  refreshCredits: () => Promise<void>;
  loading: boolean;
};

const PlanContext = createContext<PlanContextType>({
  plan: 'free',
  limits: PLAN_LIMITS.free,
  credits: 0,
  unlockedInvestorIds: [],
  refreshCredits: async () => {},
  loading: true,
});

export function PlanProvider({ children }: { children: ReactNode }) {

  const [plan, setPlan] = useState<Plan>('free');
  const [credits, setCredits] = useState<number>(0);
  const [unlockedInvestorIds, setUnlocked] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPlan = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }

    // Load Plan & Credits
    const { data: userData } = await supabase
      .from('users')
      .select('plan, credits')
      .eq('auth_id', user.id)
      .single();

    if (userData) {
      if (userData.plan) setPlan(userData.plan as Plan);
      if (userData.credits !== undefined) setCredits(userData.credits);
    }

    // Load Unlocked Investors
    const { data: unlockedData } = await supabase
      .from('unlocked_investors')
      .select('investor_id')
      .eq('user_id', user.id);

    if (unlockedData) {
      setUnlocked(unlockedData.map(u => u.investor_id));
    }

    setLoading(false);
  };

  useEffect(() => {
    loadPlan();
  }, []);

  return (
    <PlanContext.Provider value={{ plan, limits: PLAN_LIMITS[plan], credits, unlockedInvestorIds, refreshCredits: loadPlan, loading }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);

/**
 * Blur a name for free plan users: "Ali Koç" → "A** K**"
 */
export function blurName(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0] + '*'.repeat(Math.max(word.length - 1, 2)))
    .join(' ');
}
