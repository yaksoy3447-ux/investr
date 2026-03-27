'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePlan } from '@/components/providers/PlanProvider';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(10);
  const t = useTranslations('landing.pricingPage');
  const locale = useLocale();
  
  // Safe context extraction for when used outside PlanProvider (Landing Page)
  let currentPlan: string | undefined = undefined;
  try {
    const context = usePlan();
    currentPlan = context?.plan;
  } catch (e) {
    // Ignore error if usePlan is used outside PlanProvider
  }

  const planTiers: Record<string, number> = {
    free: 0,
    starter: 1,
    pro: 2,
    premium: 3,
    growth: 2, // Map legacy or alternate names if necessary
  };
  const userTier = currentPlan ? planTiers[currentPlan] || 0 : -1;

  type PlanType = {
    id: string;
    name: string;
    badge: string;
    price: string | number;
    period: string;
    description: string;
    isFree?: boolean;
    isCredit?: boolean;
    isSubscription?: boolean;
    popular?: boolean;
    limits: string[];
    features: { name: string, included: boolean }[];
    cta: string;
  };

  const plans = t.raw('plans') as PlanType[];

  // Adjust plans based on isYearly
  const visiblePlans = plans.map(p => {
    if (p.isSubscription && isYearly && !p.isFree) {
      return {
        ...p,
        price: Number(p.price) * 9,
        period: '/ year'
      };
    }
    if (p.isCredit && isYearly) {
      // Hide or keep the credit card in yearly view? 
      // The user said "Aylık ve yıllık aynı şekilde kalsın sadece aylık kısmına extra kredi alma ekleyecektik... yıllık kısmında çıkıp yap."
      // Let's just grey it out or keep it the same since credits are independent.
      return p;
    }
    return p;
  }).filter(p => {
    // Hide the credit option if we are in Yearly view?
    // "sadece aylık kısmına extra kredi alma ekleyecektik o kadar." -> only in monthly view.
    if (isYearly && p.isCredit) return false;
    return true;
  });

  const handleCheckout = async (planId: string, isFree: boolean, isCredit: boolean) => {
    if (isFree) {
      window.location.href = '/register';
      return;
    }
    
    setLoadingPlan(planId);
    
    try {
      const payload: { planLevel: string; quantity?: number } = { planLevel: planId };
      if (isCredit) {
        payload.quantity = creditAmount;
      }

      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.status === 401) {
        window.location.href = '/register';
        return;
      }
      
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        alert('Stripe initialization failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to payment gateway.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-24 px-6 bg-[#030303] text-white overflow-hidden relative" id="pricing">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Toggle Controls */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 rounded-full p-1.5 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-md">
            <button 
              onClick={() => setIsYearly(false)}
              className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${!isYearly ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
            >
              {t('monthly')}
            </button>
            <button 
              onClick={() => setIsYearly(true)}
              className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${isYearly ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
            >
              {t('yearly')}
              <span className="absolute -top-3 -right-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                {t('yearlyBadge')}
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards - We have 5 items in Monthly, 4 items in Yearly */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch ${isYearly ? 'lg:grid-cols-4' : 'lg:grid-cols-5'}`}>
          {visiblePlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-6 flex flex-col ${
                plan.popular
                  ? 'bg-primary text-white shadow-[0_0_50px_rgba(59,130,246,0.2)] lg:-translate-y-2 border border-blue-400/50'
                  : plan.isFree
                  ? 'bg-white/[0.03] border border-white/[0.06]'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-md whitespace-nowrap uppercase ${plan.popular ? 'bg-blue-100 text-blue-700' : 'bg-white/10 text-white/80 border border-white/20'}`}>
                  {plan.badge}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-white mt-2">{plan.name}</h3>
              <p className={`text-xs mb-5 h-8 ${plan.popular ? 'text-blue-100' : 'text-white/60'}`}>{plan.description}</p>

              <div className="flex flex-col items-start gap-1 mb-5">
                {plan.isCredit ? (
                  // Credit dynamic pricing UI
                  <div className="flex flex-col w-full">
                    <div className="flex items-end gap-1 mb-3">
                      <span className="text-3xl font-extrabold tracking-tighter text-white">
                        ${(creditAmount * 0.99).toFixed(2)}
                      </span>
                      <span className="font-medium mb-1 text-white/50 text-sm">
                        {plan.period}
                      </span>
                    </div>
                    
                    {/* Counter Control */}
                    <div className="flex items-center justify-between bg-white/10 rounded-lg overflow-hidden border border-white/10 p-1 mb-2">
                      <button 
                        onClick={() => setCreditAmount(Math.max(10, creditAmount - 5))}
                        className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-xl"
                      >
                        -
                      </button>
                      <span className="font-bold text-sm">{creditAmount} Credits</span>
                      <button 
                        onClick={() => setCreditAmount(creditAmount + 5)}
                        className="w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  // Standard Pricing UI
                  <div className="flex items-center gap-1 h-[72px]">
                    <span className="text-4xl font-extrabold tracking-tighter text-white">
                      ${plan.price}
                    </span>
                    <span className={`font-medium mb-1 text-sm ${plan.popular ? 'text-blue-200' : 'text-white/50'}`}>
                      {plan.isFree ? '' : plan.period}
                    </span>
                  </div>
                )}
              </div>

              {/* Angle Match Style Core Features Layout */}
              <ul className="space-y-3 mb-6">
                {plan.limits.map((limit, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-white/90">
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-70" />
                    <span>{limit}</span>
                  </li>
                ))}
              </ul>

              <div className={`h-px w-full mb-6 ${plan.popular ? 'bg-blue-400/30 border-blue-400/30' : 'bg-white/10 border-white/10'} border-b border-dashed bg-transparent`} />

              {/* Angel Match Style Feature Checklist */}
              <ul className="space-y-3 flex-1 mb-6">
                {plan.features?.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-xs font-medium ${plan.popular ? 'text-blue-50' : 'text-white/80'}`}>
                    <div className="mt-0.5 flex-shrink-0">
                      {feature.included ? (
                        <Check size={14} className={plan.popular ? 'text-white' : 'text-emerald-400'} />
                      ) : (
                        <X size={14} className="text-white/20" />
                      )}
                    </div>
                    <span className={feature.included ? '' : 'text-white/30 line-through'}>{feature.name}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id, plan.isFree || false, plan.isCredit || false)}
                disabled={loadingPlan === plan.id || (!isYearly && !plan.isCredit && planTiers[plan.id] !== undefined && planTiers[plan.id] <= userTier)}
                className={`w-full text-center py-3 rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 mt-auto ${
                  (!isYearly && currentPlan === plan.id) || (!isYearly && !plan.isCredit && planTiers[plan.id] !== undefined && planTiers[plan.id] < userTier)
                    ? 'bg-white/10 text-white/40 cursor-not-allowed border border-white/5'
                    : plan.popular
                    ? 'bg-white hover:bg-gray-100 text-primary shadow-lg'
                    : plan.isFree
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/5'
                } ${loadingPlan === plan.id ? 'opacity-70 cursor-wait' : ''}`}
              >
                {loadingPlan === plan.id ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : !isYearly && currentPlan === plan.id ? (
                  locale === 'tr' ? 'Mevcut Planınız' : 'Your Current Plan'
                ) : !isYearly && !plan.isCredit && planTiers[plan.id] !== undefined && planTiers[plan.id] < userTier ? (
                  locale === 'tr' ? 'Kullanılamaz' : 'Unavailable'
                ) : (
                  plan.cta
                )}
              </button>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
