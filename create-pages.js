const fs = require('fs');

const createPage = (path, titleKey, contentKey) => {
  const content = `import { setRequestLocale } from 'next-intl/server';
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
        <h1 className="text-4xl font-bold mb-8 text-white tracking-tight">{t('${titleKey}')}</h1>
        <div className="prose prose-invert prose-lg max-w-none text-white/70 whitespace-pre-wrap">
          {t('${contentKey}')}
        </div>
      </div>
      <div className="bg-white text-black mt-24">
        <Footer />
      </div>
    </main>
  );
}
`;
  fs.writeFileSync(path, content);
};

createPage('app/[locale]/about/page.tsx', 'aboutTitle', 'aboutContent');
createPage('app/[locale]/contact/page.tsx', 'contactTitle', 'contactContent');
createPage('app/[locale]/careers/page.tsx', 'careersTitle', 'careersContent');
createPage('app/[locale]/terms/page.tsx', 'termsTitle', 'termsContent');
createPage('app/[locale]/privacy/page.tsx', 'privacyTitle', 'privacyContent');
createPage('app/[locale]/cookie-policy/page.tsx', 'cookieTitle', 'cookieContent');

console.log("Pages generated!");
