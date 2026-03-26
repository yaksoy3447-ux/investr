import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import LandingHeader from '@/components/landing/LandingHeader';
import Footer from '@/components/landing/Footer';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages');

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32">
      <LandingHeader />
      <div className="max-w-4xl mx-auto px-6 py-16 min-h-[60vh]">
        <h1 className="text-4xl font-bold mb-8 text-white tracking-tight">{t('aboutTitle')}</h1>
        <div className="prose prose-invert prose-lg max-w-none text-white/70 whitespace-pre-wrap">
          {t('aboutContent')}
        </div>
      </div>
      <div className="bg-white text-black mt-24">
        <Footer />
      </div>
    </main>
  );
}
