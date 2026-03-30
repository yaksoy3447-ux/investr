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
    canSeeInvestorNames: false,
    canExportCsv: true,
    canUseAI: false,
  },
  pro: {
    maxCrmItems: 500,
    maxEmailsPerMonth: 500,
    canSendEmail: true,
    canSeeInvestorNames: false,
    canExportCsv: true,
    canUseAI: true,
  },
  premium: {
    maxCrmItems: 1000,
    maxEmailsPerMonth: 1000,
    canSendEmail: true,
    canSeeInvestorNames: false,
    canExportCsv: true,
    canUseAI: true,
  },
};

type PlanContextType = {
  plan: Plan;
  limits: PlanLimits;
  credits: number;
  unlockedInvestorIds: string[];
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  refreshCredits: () => Promise<void>;
  loading: boolean;
};

const PlanContext = createContext<PlanContextType>({
  plan: 'free',
  limits: PLAN_LIMITS.free,
  credits: 0,
  unlockedInvestorIds: [],
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  refreshCredits: async () => {},
  loading: true,
});

export function PlanProvider({ children }: { children: ReactNode }) {

  const [plan, setPlan] = useState<Plan>('free');
  const [credits, setCredits] = useState<number>(0);
  const [unlockedInvestorIds, setUnlocked] = useState<string[]>([]);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState<boolean>(false);
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
      .select('plan, credits, current_period_end, cancel_at_period_end, stripe_subscription_id')
      .eq('auth_id', user.id)
      .single();

    if (userData) {
      let currentPlan = userData.plan as Plan;
      
      // RECOVERY LOGIC: If plan is 'free' but there's an active period and a subscription ID, 
      // it's likely a premature downgrade or sync issue. Treat as 'starter' or 'pro'?
      // Since we don't know the exact plan name easily without extra columns, we'll favor 'starter' as a safe default.
      if (currentPlan === 'free' && userData.stripe_subscription_id && userData.current_period_end) {
        if (new Date(userData.current_period_end) > new Date()) {
          console.log('Recovery logic triggered: User is "free" but has active period. Rescuing to "starter".');
          currentPlan = 'starter';
        }
      }

      setPlan(currentPlan || 'free');
      if (userData.credits !== undefined) setCredits(userData.credits);
      setCurrentPeriodEnd(userData.current_period_end || null);
      setCancelAtPeriodEnd(userData.cancel_at_period_end || false);
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
    <PlanContext.Provider value={{ 
      plan, 
      limits: PLAN_LIMITS[plan], 
      credits, 
      unlockedInvestorIds, 
      currentPeriodEnd,
      cancelAtPeriodEnd,
      refreshCredits: loadPlan, 
      loading 
    }}>
      {children}
    </PlanContext.Provider>
  );
}

export const usePlan = () => useContext(PlanContext);

/**
 * Blur a name for free plan users: "Ali Koç" → "A** K**"
 */
export function blurName(name: string): string {
  // Prevent users from guessing the length of the name/company
  return 'E***** Y*****';
}
