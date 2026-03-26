'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { Mail, Lock, Eye, EyeOff, LogIn, Radar, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const t = useTranslations('auth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        window.location.href = '/tr/investors';
      }
    } catch {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-10 group">
            <Radar className="text-primary mr-2" strokeWidth={2.5} size={32} />
            <span className="font-bold text-3xl tracking-tight text-foreground">
              GetInvestr
            </span>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
            {t('welcomeBack')}
          </h1>
          <p className="text-foreground-secondary text-sm mb-8">
            {t('socialProofText')}
          </p>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-glass-border bg-white hover:bg-background-tertiary transition-all text-sm font-medium text-foreground shadow-sm"
          >
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            {t('googleLogin')}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-glass-border" />
            <span className="text-xs text-foreground-muted uppercase tracking-wider">{t('orContinueWith')}</span>
            <div className="flex-1 h-px bg-glass-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('emailLabel')}</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('emailPlaceholder')}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-glass-border bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">{t('passwordLabel')}</label>
                <button type="button" className="text-xs text-primary-dark hover:underline">
                  {t('forgot')}
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('passwordPlaceholder')}
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-glass-border bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-lg bg-error/10 text-error text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-sm',
                loading && 'opacity-70 cursor-not-allowed'
              )}
            >
              {loading ? '...' : t('continue')}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-foreground-secondary mt-8">
            {t('noAccountLabel')}{' '}
            <Link href="/register" className="text-primary-dark font-medium hover:underline">
              {t('noAccountLink')}
            </Link>
          </p>
        </div>
      </div>

      {/* Right — Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-background-tertiary to-background p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 rounded-full bg-blue-400/5 blur-[60px]" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-dark/10 border border-primary/10 flex items-center justify-center">
            <span className="text-3xl">🚀</span>
          </div>
          <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-foreground mb-3">
            Doğru Yatırımcıyı Bul
          </h2>
          <p className="text-foreground-secondary text-sm leading-relaxed">
            1000+ Türk melek yatırımcı ve VC&apos;ye doğrudan erişim. Sürecini hızlandır, girişimini büyüt.
          </p>
        </div>
      </div>
    </div>
  );
}
