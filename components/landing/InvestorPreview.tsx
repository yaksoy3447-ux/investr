'use client';

import { motion } from 'framer-motion';
import { Rocket, Briefcase, Key, Compass, Globe2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function InvestorPreview() {
  const t = useTranslations('landing.preview');

  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section 1: Who is it for */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold mb-10 text-[#111827]">
            {t('mainTitle')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#172033] rounded-3xl p-10 text-center shadow-xl border border-white/5 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="text-blue-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('foundersTitle')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
                {t('foundersDesc')}
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#172033] rounded-3xl p-10 text-center shadow-xl border border-white/5 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6">
                <Briefcase className="text-amber-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('businessesTitle')}</h3>
              <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
                {t('businessesDesc')}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Section 2: Match Feature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0A0F1C] rounded-[2rem] p-10 md:p-16 text-center text-white border border-white/5 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          
          <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-playfair)] font-bold mb-6 tracking-tight relative z-10">
            {t('findRightTitle')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-sm md:text-base relative z-10">
            {t('findRightDesc')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative z-10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="p-3 bg-blue-500/20 rounded-xl mb-4">
                <Key className="text-blue-400" size={24} />
              </div>
              <h4 className="font-bold mb-2">{t('feature1')}</h4>
              <p className="text-gray-400 text-sm">{t('feature1Desc')}</p>
            </div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="p-3 bg-amber-500/20 rounded-xl mb-4">
                <Compass className="text-amber-400" size={24} />
              </div>
              <h4 className="font-bold mb-2">{t('feature2')}</h4>
              <p className="text-gray-400 text-sm">{t('feature2Desc')}</p>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="p-3 bg-emerald-500/20 rounded-xl mb-4">
                <Globe2 className="text-emerald-400" size={24} />
              </div>
              <h4 className="font-bold mb-2">{t('feature3')}</h4>
              <p className="text-gray-400 text-sm">{t('feature3Desc')}</p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
