import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import LandingHeader from '@/components/landing/LandingHeader';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';
import { Clock, ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, id: string }> }) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('landing.blog');

  // Next-intl raw returns arrays for complex objects
  const posts = t.raw('posts') as Array<{
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;
    readMinutes: number;
    image: string;
    category: string;
  }>;

  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#030303] text-white pt-32">
      <LandingHeader />
      
      <div className="max-w-4xl mx-auto px-6 py-12 mb-20">
        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{t('back')}</span>
        </Link>

        {/* Article Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 tracking-wide uppercase">
            {post.category}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-white">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm border-b border-white/10 pb-8">
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary/60" />
              <span className="font-medium text-white/80">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readMinutes} {t('min')} {t('readTime').toLowerCase()}</span>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden mb-16 shadow-2xl ring-1 ring-white/10">
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => {
            // Get secondary images if they exist
            const secondaryImages = (post as any).secondaryImages || [];
            
            return (
              <div key={index}>
                <p className={`text-white/90 leading-[1.8] mb-10 text-lg md:text-xl font-normal ${index === 0 ? 'first-letter:text-7xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left' : ''}`}>
                  {paragraph}
                </p>
                
                {/* Insert secondary images at specific points (after p0, p2, p4, p5) */}
                {secondaryImages.length > 0 && (
                  (index === 0 && secondaryImages[0]) ||
                  (index === 2 && secondaryImages[1]) ||
                  (index === 4 && secondaryImages[2]) ||
                  (index === 5 && secondaryImages[3])
                ) && (
                  <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden my-16 shadow-2xl ring-1 ring-white/20 group transition-all duration-500 hover:ring-primary/40">
                    <Image 
                      src={
                        index === 0 ? secondaryImages[0] :
                        index === 2 ? secondaryImages[1] :
                        index === 4 ? secondaryImages[2] :
                        secondaryImages[3]
                      } 
                      alt={`${post.title} detail ${index}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-32 p-10 md:p-16 rounded-[40px] bg-[#0A0A0A] border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <h3 className="text-3xl md:text-4xl font-bold mb-6 relative z-10">{t('ctaTitle')}</h3>
            <p className="text-white/60 mb-10 max-w-2xl mx-auto text-lg md:text-xl relative z-10">
                {t('ctaSub')}
            </p>
            <Link 
                href="/register"
                className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-primary text-white font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 relative z-10 hover:shadow-primary/40"
            >
                {t('ctaBtn')}
            </Link>
        </div>
      </div>
      
      <div className="bg-[#030303] text-white">
        <Footer />
      </div>
    </main>
  );
}
