'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Pricing() {
  const [isPayAsYouGo, setIsPayAsYouGo] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const t = useTranslations('landing.pricingPage');

  type PlanType = {
    id: string;
    name: string;
    price: string | number;
    period: string;
    description: string;
    features: { name: string, included: boolean }[];
    popular?: boolean;
    isFree?: boolean;
  };

  const monthlyPlans = t.raw('tiers.monthly') as PlanType[];
  const creditPlans = t.raw('tiers.credits') as PlanType[];
  
  // Build Free plan dynamically
  const freePlan: PlanType = {
    id: 'free',
    name: t('tiers.monthly.0.name') === 'Başlangıç' ? 'Ücretsiz' : 'Free',
    price: '0',
    period: t('tiers.monthly.0.period') === '/ aylık' ? 'Süresiz' : 'Forever',
    description: t('tiers.monthly.0.name') === 'Başlangıç' ? 'Veritabanını keşfedin.' : 'Discover our database.',
    features: [
      { name: '5,000+ Investors', included: true },
      { name: 'Advanced Filters', included: true },
      { name: 'Blurred Contacts', included: true }
    ],
    isFree: true
  };

  // We show free plan + monthly plans if not pay as you go.
  // For pay as you go, we just show credit plans.
  const activePlans = isPayAsYouGo ? creditPlans : [freePlan, ...monthlyPlans];

  const handleCheckout = async (planId: string, isFree: boolean) => {
    if (isFree) {
      window.location.href = '/register';
      return;
    }
    
    setLoadingPlan(planId);
    
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planLevel: planId }),
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
              onClick={() => setIsPayAsYouGo(false)}
              className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${!isPayAsYouGo ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
            >
              {t('toggleMonthly')}
            </button>
            <button 
              onClick={() => setIsPayAsYouGo(true)}
              className={`relative px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${isPayAsYouGo ? 'bg-white text-black shadow-lg' : 'text-white/60 hover:text-white'}`}
            >
              {t('toggleAnnual')}
              <span className="absolute -top-3 -right-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                Pay-As-You-Go
              </span>
            </button>
          </div>
        </div>

        {/* Plan Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch ${isPayAsYouGo ? 'lg:grid-cols-3 max-w-5xl mx-auto' : 'lg:grid-cols-4'}`}>
          {activePlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-7 flex flex-col ${
                plan.popular
                  ? 'bg-primary text-white shadow-[0_0_50px_rgba(59,130,246,0.2)] lg:-translate-y-2 border border-blue-400/50'
                  : plan.isFree
                  ? 'bg-white/[0.03] border border-white/[0.06]'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide shadow-md whitespace-nowrap">
                    Best Value
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold mb-3 text-white">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-blue-100' : 'text-white/60'}`}>{plan.description}</p>

              <div className="flex flex-col items-start gap-1 mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold tracking-tighter text-white">
                    ${plan.price}
                  </span>
                  <span className={`font-medium mb-1 ${plan.popular ? 'text-blue-200' : 'text-white/50'}`}>
                    {plan.isFree ? '' : plan.period}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCheckout(plan.id, plan.isFree || false)}
                disabled={loadingPlan === plan.id}
                className={`w-full text-center py-3 rounded-xl font-bold transition-all mb-6 text-sm flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-white hover:bg-gray-100 text-primary shadow-lg'
                    : plan.isFree
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                } ${loadingPlan === plan.id ? 'opacity-70 cursor-wait' : ''}`}
              >
                {loadingPlan === plan.id ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  plan.isFree ? t('cta') : t('ctaPremium')
                )}
              </button>

              <div className={`h-px w-full mb-6 ${plan.popular ? 'bg-blue-400/30' : 'bg-white/10'}`} />

              <ul className="space-y-3 flex-1">
                {plan.features?.map((feature, i) => (
                  <li key={i} className={`flex items-start gap-2.5 text-sm font-medium ${plan.popular ? 'text-blue-50' : 'text-white/80'}`}>
                    <div className="mt-0.5 flex-shrink-0">
                      {feature.included ? (
                        <Check size={16} className={plan.popular ? 'text-white' : plan.isFree ? 'text-emerald-400' : 'text-primary'} />
                      ) : (
                        <X size={16} className="text-white/20" />
                      )}
                    </div>
                    <span className={feature.included ? '' : 'text-white/30 line-through'}>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
