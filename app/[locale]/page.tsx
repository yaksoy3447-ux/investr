import { setRequestLocale } from 'next-intl/server';
import LandingHeader from '@/components/landing/LandingHeader';
import FAQ from '@/components/landing/FAQ';
import Hero from '@/components/landing/Hero';
import SocialProof from '@/components/landing/SocialProof';
import HowItWorks from '@/components/landing/HowItWorks';
import InvestorPreview from '@/components/landing/InvestorPreview';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <LandingHeader />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <InvestorPreview />
      <Testimonials />
      <div className="bg-white">
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
