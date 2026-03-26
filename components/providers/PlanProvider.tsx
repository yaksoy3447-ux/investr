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
    canSeeInvestorNames: false,
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
  loading: boolean;
};

const PlanContext = createContext<PlanContextType>({
  plan: 'free',
  limits: PLAN_LIMITS.free,
  loading: true,
});

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Plan>('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlan() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('users')
        .select('plan')
        .eq('auth_id', user.id)
        .single();

      if (data?.plan) {
        setPlan(data.plan as Plan);
      }
      setLoading(false);
    }

    loadPlan();
  }, []);

  return (
    <PlanContext.Provider value={{ plan, limits: PLAN_LIMITS[plan], loading }}>
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
