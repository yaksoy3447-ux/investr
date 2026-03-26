import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import LandingHeader from '@/components/landing/LandingHeader';
import Pricing from '@/components/landing/Pricing';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/landing/Footer';
import DetailedPricingTable from '@/components/landing/DetailedPricingTable';

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('landing.pricingPage');

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32">
      <LandingHeader />
      
      <div className="max-w-4xl mx-auto text-center px-6 mb-16">
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-12 backdrop-blur-md text-sm font-medium mx-auto shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5 text-white">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            {t('badge')}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          {t('title1')} <br className="hidden md:block"/>
          {t('title2')}
        </h1>
        <p className="text-white/50 mb-4 text-lg">
          {t('subtitle')}
        </p>
      </div>

      <Pricing />
      <DetailedPricingTable />
      <div className="bg-white text-black mt-24">
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
