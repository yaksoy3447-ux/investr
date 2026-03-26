'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function SocialProof() {
  const t = useTranslations('landing.socialProof');

  const logos = [
    "500 Startups",
    "Y Combinator",
    "Techstars",
    "Sequoia",
    "a16z",
    "Index Ventures",
  ];

  return (
    <section className="bg-[#0A0F1C] border-t border-white/5 py-10 relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0A0F1C] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0A0F1C] to-transparent z-10" />

      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm font-medium text-gray-400 mb-8 tracking-widest uppercase">
          {t('title')}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="text-xl md:text-2xl font-bold font-[family-name:var(--font-playfair)] text-white/80 select-none hover:text-white transition-colors"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
