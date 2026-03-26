'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Building2, TrendingUp, Mail, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('landing');

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-0 overflow-hidden bg-[#030303] text-white min-h-[90vh] flex items-center">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Core aesthetic glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/20 blur-[150px] mix-blend-screen" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-12">
        
        {/* Left Content (Typography & CTA) */}
        <div className="flex-1 text-center lg:text-left pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Elegant Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(184,148,31,0.1)]">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary/90 uppercase tracking-widest">
                {t('heroBadge')}
              </span>
            </div>

            {/* High-End Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 tracking-tight">
              {t('heroH1_1')} <br className="hidden lg:block"/>
              <span className="relative inline-block mt-2">
                <span className="font-[family-name:var(--font-playfair)] font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-[#F9E596] via-primary to-[#A07D1C]">
                  {t('heroH1_2')}
                </span>
                {/* Glowing underline */}
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 blur-[1px]" />
              </span>
              <br className="hidden md:block"/>
              <span className="font-medium mt-2 block">{t('heroH1_3')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              {t('heroSubtitle')}
            </p>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
              <Link
                href="/register"
                className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold text-sm overflow-hidden transition-all hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <span className="relative flex items-center gap-2">
                  {t('heroBtn1')}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
              
              <Link
                href="/#faq"
                className="px-8 py-4 rounded-full border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors flex items-center gap-2"
              >
                {t('heroBtn2')}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Abstract Glassmorphic UI Representation */}
        <div className="flex-1 w-full relative h-[500px] lg:h-[650px] flex items-center justify-center lg:justify-end">
          
          <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
            
            {/* Center Main Glass Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="absolute z-20 w-[85%] aspect-square rounded-[2rem] border border-white/10 bg-[#111111]/60 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] p-8 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">{t('heroCards.matchAnalysis')}</h3>
                  <div className="text-2xl font-[family-name:var(--font-playfair)] text-white">{t('heroCards.highMatch')}</div>
                </div>
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center bg-primary/10">
                  <Sparkles size={18} className="text-primary" />
                </div>
              </div>

              {/* Mock Graph */}
              <div className="flex-1 flex items-end gap-3 px-2">
                {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                    className={`flex-1 rounded-t-sm w-full ${i === 5 ? 'bg-primary' : 'bg-white/10'}`}
                  />
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex -space-x-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[#111] bg-gray-700" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#111] bg-gray-600" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#111] bg-gray-500" />
                  <div className="w-8 h-8 rounded-full border-2 border-[#111] bg-white/10 flex items-center justify-center text-[10px] text-white">
                    +12k
                  </div>
                </div>
                <div className="text-sm font-medium text-white/80">{t('heroCards.activeInvestors')}</div>
              </div>
            </motion.div>

            {/* Floating Card 1 (Top Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute z-30 -top-4 -left-8 lg:-left-16 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Building2 size={20} className="text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-white/50 mb-1">{t('heroCards.stageMatch')}</div>
                <div className="text-sm font-semibold text-white">{t('heroCards.seriesA')}</div>
              </div>
            </motion.div>

            {/* Floating Card 2 (Bottom Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute z-30 -bottom-8 -right-4 lg:-right-12 bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center relative">
                <Mail size={20} className="text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#1A1A1A]" />
              </div>
              <div>
                <div className="text-xs text-white/50 mb-1">{t('heroCards.outreachLabel')}</div>
                <div className="text-sm font-semibold text-white flex items-center gap-1">
                  {t('heroCards.outreachAi')} <CheckCircle2 size={12} className="text-green-400" />
                </div>
              </div>
            </motion.div>

            {/* Glow behind cards */}
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75" />

          </div>
        </div>
      </div>
    </section>
  );
}
