'use client';

import { motion } from 'framer-motion';
import { Database, UserCheck, Filter, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HowItWorks() {
  const t = useTranslations('landing.howItWorks');

  const features = [
    {
      icon: Database,
      title: t('step1Title'),
      description: t('step1Desc'),
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: UserCheck,
      title: t('step2Title'),
      description: t('step2Desc'),
      iconColor: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: Filter,
      title: t('step3Title'),
      description: t('step3Desc'),
      iconColor: 'text-rose-500',
      bgColor: 'bg-rose-50',
    },
    {
      icon: Users,
      title: t('step4Title'),
      description: t('step4Desc'),
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: TrendingUp,
      title: t('step5Title'),
      description: t('step5Desc'),
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: RefreshCw,
      title: t('step6Title'),
      description: t('step6Desc'),
      iconColor: 'text-amber-500',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="py-24 px-6 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#111827] tracking-tight">
            {t('title')}
          </h2>
          <p className="text-gray-500">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-6"
              >
                <div className={`w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <Icon size={20} className={feature.iconColor} />
                </div>
                <h3 className="text-lg font-bold text-[#111827] mb-2 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
