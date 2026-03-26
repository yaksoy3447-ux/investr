'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { Eye, EyeOff, Mail, Lock, User, Building2, ArrowRight, Radar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          },
        },
      });

      if (error) {
        // Translate common Supabase errors to Turkish
        const errorMap: Record<string, string> = {
          'Email rate limit exceeded': 'Çok fazla deneme yaptınız. Lütfen birkaç dakika bekleyin.',
          'User already registered': 'Bu email zaten kayıtlı. Giriş yapmayı deneyin.',
          'Password should be at least 6 characters': 'Şifre en az 6 karakter olmalıdır.',
          'Unable to validate email address: invalid format': 'Geçersiz email adresi.',
        };
        const msg = Object.entries(errorMap).find(([key]) => error.message.includes(key));
        setError(msg ? msg[1] : error.message);
      } else {
        // Email confirmation disabled — redirect directly
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

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-success/10 flex items-center justify-center">
            <span className="text-3xl">✉️</span>
          </div>
          <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-foreground mb-3">
            Email Doğrulama Gönderildi
          </h1>
          <p className="text-foreground-secondary text-sm mb-6 leading-relaxed">
            <strong>{email}</strong> adresine doğrulama emaili gönderdik. Lütfen emailinizi kontrol edin ve hesabınızı doğrulayın.
          </p>
          <Link href="/login" className="btn-secondary inline-flex items-center gap-2 text-sm">
            Giriş sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-background-tertiary to-background p-12 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-emerald-400/5 blur-[60px]" />

        <div className="relative z-10 text-center max-w-sm">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-dark/10 border border-primary/10 flex items-center justify-center">
            <span className="text-3xl">💡</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
            {t('createAccount')}
          </h2>
          <p className="text-foreground-secondary text-sm leading-relaxed">
            Binlerce yatırımcıyla bağlantı kurmak için Türkiye&apos;nin en kapsamlı yatırımcı veritabanını keşfet.
          </p>
          <div className="mt-6 space-y-2.5 text-left">
            {[t('f1'), t('f2'), t('f3')].map((item) => (
              <div key={item} className="flex items-center gap-2.5 text-sm text-foreground-secondary">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-success text-xs">✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center mb-10 group">
            <Radar className="text-primary mr-2" strokeWidth={2.5} size={32} />
            <div className="text-foreground font-bold text-3xl flex items-center tracking-tight">
              GetInvestr
            </div>
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
            {t('registerTitle')}
          </h1>
          <p className="text-foreground-secondary text-sm mb-8">
            {t('freeTrial')}
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

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-glass-border" />
            <span className="text-xs text-foreground-muted uppercase tracking-wider">{t('orContinueWith')}</span>
            <div className="flex-1 h-px bg-glass-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Name + Company */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('fullName')}</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('fullName')}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-glass-border bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('companyName')}</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t('company')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-glass-border bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('email')}</label>
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

            {/* Password + Confirm */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('passwordLabel')}</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-glass-border bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('cpasswordLabel')}</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-glass-border bg-white text-foreground text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 rounded-lg bg-error/10 text-error text-sm">
                {error}
              </div>
            )}

            {/* Terms */}
            <p className="text-xs text-foreground-muted">
              {t('terms1')} <Link href='/terms' className='text-primary hover:underline'>{t('terms2')}</Link> {t('terms3')}
            </p>

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

          {/* Login link */}
          <p className="text-center text-sm text-foreground-secondary mt-8">
            {t('alreadyAccount')}{' '}
            <Link href="/login" className="text-primary-dark font-medium hover:underline">
              {t('loginLink')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
