'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function FAQ() {
  const t = useTranslations('landing.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') }
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-[#000000] relative overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">
            {t('title')}
          </h2>
          <p className="text-white/40 max-w-xl mx-auto font-light">
            {t('description')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;
            // Only render if a question exists to avoid empty slots if i18n is missing q6/q7
            if (!item.q || item.q.includes('landing.faq.q')) return null;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  isOpen ? "border-primary/30 bg-primary/[0.03]" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.04]"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className={cn(
                    "font-medium text-lg pr-8 transition-colors",
                    isOpen ? "text-primary" : "text-white/80 group-hover:text-white"
                  )}>
                    {item.q}
                  </span>
                  <div className={cn(
                    "flex-shrink-0 transition-transform duration-300",
                    isOpen ? "text-primary rotate-180" : "text-white/20 group-hover:text-white/40"
                  )}>
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-white/50 leading-relaxed font-light">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
