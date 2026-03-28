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
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-white/80 leading-[1.8] mb-8 text-lg md:text-xl font-light">
              {paragraph}
            </p>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('ctaTitle')}</h3>
            <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">
                {t('ctaSub')}
            </p>
            <Link 
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/20"
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
