import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import LandingHeader from '@/components/landing/LandingHeader';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';
import { Clock } from 'lucide-react';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('landing.blog');

  // Next-intl raw returns arrays for complex objects
  const posts = t.raw('posts') as Array<{
    id: number;
    title: string;
    author: string;
    date: string;
    readMinutes: number;
    image: string;
    category: string;
  }>;

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32">
      <LandingHeader />
      
      <div className="max-w-7xl mx-auto px-6 py-12 mb-20 min-h-[60vh]">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-playfair)] font-bold mb-6 text-white tracking-tight">
            {t('title')}
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-56 w-full overflow-hidden bg-[#222]">
                <Image 
                  src={post.image} 
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg backdrop-blur-md bg-primary/90">
                  {post.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-4 line-clamp-3 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <div className="mt-auto">
                  <div className="text-sm text-white/70 mb-1 font-medium">{post.author}</div>
                  <div className="text-xs text-white/40 mb-4">{t('lastUpdated')} {post.date}</div>
                  
                  <div className="pt-4 border-t border-white/10 flex items-center text-xs font-semibold text-white/50 gap-1.5">
                    <Clock size={14} className="text-white/40" />
                    {t('readTime')} {post.readMinutes} {t('min')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-[#030303] text-white">
        <Footer />
      </div>
    </main>
  );
}
