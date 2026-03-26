'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const t = useTranslations('landing.pricingPage');

  const calculatePrice = (monthlyPrice: number) => {
    if (isYearly) {
      return (monthlyPrice * 0.75).toFixed(0);
    }
    return monthlyPrice;
  };

  const calculateYearlyTotal = (monthlyPrice: number) => {
    return monthlyPrice * 9;
  };

  const plans = [
    {
      name: t('tiers.free'),
      basePrice: 0,
      isFree: true,
      popular: false,
      features: t.raw('planFeatures.free') as { name: string, included: boolean }[]
    },
    {
      name: t('tiers.startup'),
      basePrice: 29,
      isFree: false,
      popular: false,
      features: t.raw('planFeatures.starter') as { name: string, included: boolean }[]
    },
    {
      name: t('tiers.pro'),
      basePrice: 69,
      isFree: false,
      popular: true,
      features: t.raw('planFeatures.growth') as { name: string, included: boolean }[]
    },
    {
      name: t('tiers.enterprise'),
      basePrice: 149,
      isFree: false,
      popular: false,
      features: t.raw('planFeatures.premium') as { name: string, included: boolean }[]
    }
  ];

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

        {/* Plan Cards — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {plans.map((plan, index) => (
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
                    {t('mostPopular')}
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold mb-3 text-white">{plan.name}</h3>

              <div className="flex flex-col items-start gap-1 mb-6">
                <div className="flex items-end gap-1">
                  {plan.isFree ? (
                    <span className="text-4xl font-extrabold tracking-tighter text-white">
                      $0
                    </span>
                  ) : (
                    <span className="text-4xl font-extrabold tracking-tighter text-white">
                      ${calculatePrice(plan.basePrice)}
                    </span>
                  )}
                  <span className={`font-medium mb-1 ${plan.popular ? 'text-blue-200' : 'text-white/50'}`}>
                    {plan.isFree ? '' : isYearly ? t('perYear') : t('perMonth')}
                  </span>
                </div>
                {isYearly && !plan.isFree && (
                  <div className={`text-xs font-semibold py-1 px-3 mt-2 rounded-md ${plan.popular ? 'bg-white/20 text-white' : 'bg-primary/20 text-primary-light'}`}>
                    {t('billedYearly')}: ${calculateYearlyTotal(plan.basePrice)}
                  </div>
                )}
              </div>

              <Link
                href="/register"
                className={`w-full text-center py-3 rounded-xl font-bold transition-all mb-6 text-sm ${
                  plan.popular
                    ? 'bg-white hover:bg-gray-100 text-primary shadow-lg'
                    : plan.isFree
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                {plan.isFree ? t('startFree') : t('choosePlan')}
              </Link>

              <div className={`h-px w-full mb-6 ${plan.popular ? 'bg-blue-400/30' : 'bg-white/10'}`} />

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, i) => (
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
