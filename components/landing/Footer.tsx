import { Link } from '@/i18n/routing';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('landing.footer');

  return (
    <>
      {/* Unique GetInvestr CTA Section */}
      <section className="bg-white px-6 pb-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-b from-[#0a0f1c] to-[#030712] rounded-[2.5rem] p-10 md:p-24 text-center text-white relative shadow-2xl overflow-hidden border border-white/10">
            {/* Unique Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />
            
            {/* Glowing Orb */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/30 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              
              {/* Requested Alert Bubble */}
              <div className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors rounded-full px-5 py-2 mb-10 shadow-[0_0_30px_rgba(59,130,246,0.15)] backdrop-blur-md">
                <CheckCircle2 size={16} className="text-primary" />
                <span className="text-sm font-medium text-white/90">
                  {t('ctaAlert')}
                </span>
                <Link href="/pricing" className="text-sm font-bold text-primary hover:text-blue-400 underline decoration-primary/30 underline-offset-4 ml-1">
                  {t('ctaAction')}
                </Link>
              </div>

              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                {t('ctaHeading1')} <br className="hidden md:block"/>
                {t('ctaHeading2')}
              </h2>
              
              <p className="text-white/50 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
                {t('ctaDesc')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <Link
                  href="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                >
                  {t('ctaBtn1')} <ArrowRight size={18} />
                </Link>
                <Link
                  href="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-4 px-10 rounded-xl transition-all"
                >
                  {t('ctaBtn2')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overhauled Ultra-Modern Minimal Footer */}
      <footer className="bg-[#030303] text-gray-400 py-16 px-6 relative overflow-hidden border-t border-white/5">
        {/* Massive Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none tracking-tighter">
          INVESTR
        </div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          
          {/* Brand & Copyright */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-white font-bold text-2xl tracking-tight">
              <span className="text-white">Get</span><span className="text-[#3b82f6]">Investr</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs mb-6">
              {t('desc')}
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/xGetInvestr" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white/40 hover:text-primary transition-colors uppercase tracking-wider">
                X (Twitter)
              </a>
              <a href="https://linkedin.com/company/getinvestr" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white/40 hover:text-primary transition-colors uppercase tracking-wider">
                LinkedIn
              </a>
              <a href="https://instagram.com/getinvestr" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-white/40 hover:text-primary transition-colors uppercase tracking-wider">
                Instagram
              </a>
            </div>
          </div>

          {/* Minimal Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16 text-sm">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-xs">{t('links.platform')}</h4>
              <Link href="/#how-it-works" className="hover:text-white transition-colors">{t('links.platform1')}</Link>
              <Link href="/investors" className="hover:text-white transition-colors">{t('links.platform2')}</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">{t('links.platform3')}</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-xs">{t('links.company')}</h4>
              <Link href="/about" className="hover:text-white transition-colors">{t('links.company1')}</Link>
              <Link href="/blog" className="hover:text-white transition-colors">{t('links.company4')}</Link>
              <Link href="/contact" className="hover:text-white transition-colors">{t('links.company2')}</Link>
              <Link href="/careers" className="hover:text-white transition-colors">{t('links.company3')}</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-white mb-2 uppercase tracking-wider text-xs">{t('links.legal')}</h4>
              <Link href="/terms" className="hover:text-white transition-colors">{t('links.legal1')}</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">{t('links.legal2')}</Link>
              <Link href="/cookie-policy" className="hover:text-white transition-colors">{t('links.legal3')}</Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-500">
          <span>© {new Date().getFullYear()} GetInvestr Technologies.</span>
          <span className="flex items-center gap-2">{t('built')} <span className="text-white">Get</span><span className="text-[#3b82f6]">Investr</span></span>
        </div>
      </footer>
    </>
  );
}
