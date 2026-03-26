'use client';

import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Globe, Menu, X, Radar } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export default function LandingHeader() {
  const t = useTranslations('landing');
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: 'tr' | 'en') => {
    router.replace(pathname, { locale: newLocale });
    setShowLangMenu(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-[#030303]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand */}
          <Link href="/" className="flex items-center group">
            <Radar className="text-primary mr-2" strokeWidth={2.5} size={28} />
            <span className="text-xl font-bold text-white transition-opacity tracking-tight">
              GetInvestr
            </span>
          </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="/#how-it-works" className="hover:text-white transition-colors">{t('header.howItWorks')}</Link>
          <Link href="/blog" className="hover:text-white transition-colors">{t('header.blog')}</Link>
          <Link href="/#testimonials" className="hover:text-white transition-colors">{t('header.testimonials')}</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">{t('header.pricing')}</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div ref={langRef} className="relative hidden sm:block">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-medium transition-colors"
            >
              <Globe size={16} /> {locale.toUpperCase()}
            </button>
            
            {showLangMenu && (
              <div className="absolute right-0 top-8 w-36 bg-[#111] rounded-xl border border-white/10 p-1 shadow-2xl z-[100] animate-fade-in">
                <button
                  onClick={() => switchLocale('tr')}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm rounded-lg transition-all',
                    locale === 'tr'
                      ? 'text-primary bg-primary/10 font-medium'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  TR Türkçe
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm rounded-lg transition-all',
                    locale === 'en'
                      ? 'text-primary bg-primary/10 font-medium'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  EN English
                </button>
              </div>
            )}
          </div>
          
          <Link 
            href="/login" 
            className="hidden sm:block text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            {t('header.login')}
          </Link>
          
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {t('header.join')}
          </Link>
        </div>

      </div>
    </motion.header>
  );
}
