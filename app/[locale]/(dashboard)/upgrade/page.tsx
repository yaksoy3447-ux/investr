import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Pricing from '@/components/landing/Pricing';
import DetailedPricingTable from '@/components/landing/DetailedPricingTable';

export default async function DashboardPricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('landing.pricingPage');

  return (
    <div className="w-full flex-1 min-h-screen bg-[#030303] text-white">
      <div className="pt-12 pb-6 max-w-4xl mx-auto text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          {t('title1')} {t('title2')}
        </h1>
        <p className="text-white/50 text-base">
          {t('subtitle')}
        </p>
      </div>

      <Pricing />
      <div className="pb-16">
        <DetailedPricingTable />
      </div>
    </div>
  );
}
