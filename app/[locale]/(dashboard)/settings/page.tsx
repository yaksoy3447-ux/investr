'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { User, Building2, Mail, Globe, Bell, Shield, Save, Check, Camera, Crown, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

import { createClient } from '@/lib/supabase/client';
import { getProfile, updateProfile } from '@/lib/db/users';
import { usePlan } from '@/components/providers/PlanProvider';
import { useCRM } from '@/components/providers/CRMProvider';
import { getMonthlyEmailCount } from '@/lib/db/emails';

export default function SettingsPage() {
  const t = useTranslations('dashboard.settings');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { plan, limits } = usePlan();
  const { items: crmItems } = useCRM();
  const [monthlyEmails, setMonthlyEmails] = useState(0);

  const PLAN_LABELS: Record<string, { tr: string; en: string; color: string; bg: string; border: string }> = {
    free: { tr: 'Ücretsiz', en: 'Free', color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' },
    starter: { tr: 'Başlangıç', en: 'Starter', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
    pro: { tr: 'Büyüme', en: 'Growth', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
    premium: { tr: 'Premium', en: 'Premium', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  };
  const planStyle = PLAN_LABELS[plan] || PLAN_LABELS.free;

  const [passwords, setPasswords] = useState({
    new: '',
    confirm: ''
  });

  const [profile, setProfile] = useState({
    fullName: '',
    companyName: '',
    email: '',
    website: '',
    sector: '',
    stage: '',
    bio: '',
  });

  const [notifications, setNotifications] = useState({
    emailReplies: true,
    weeklyDigest: false,
    productUpdates: true,
  });

  // Load profile from Supabase on mount
  useEffect(() => {
    async function loadProfile() {
      const data = await getProfile();
      if (data) {
        setProfile({
          fullName: data.full_name || '',
          companyName: data.company_name || '',
          email: data.email || '',
          website: data.website || '',
          sector: '',
          stage: '',
          bio: '',
        });
        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      }
    }
    loadProfile();
    getMonthlyEmailCount().then(setMonthlyEmails);
  }, []);

  const crmUsed = crmItems.length;
  const crmMax = limits.maxCrmItems;
  const emailMax = limits.maxEmailsPerMonth;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/webp'].includes(file.type)) return;
    if (file.size > 5 * 1024 * 1024) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleSave = async () => {
    setSaving(true);
    setPasswordError('');

    if (activeTab === 'security') {
      if (!passwords.new || !passwords.confirm) {
        setPasswordError(locale === 'en' ? 'Please fill in all fields.' : 'Lütfen tüm alanları doldurun.');
        setSaving(false);
        return;
      }
      if (passwords.new !== passwords.confirm) {
        setPasswordError(locale === 'en' ? 'Passwords do not match.' : 'Yeni şifreler eşleşmiyor.');
        setSaving(false);
        return;
      }
      if (passwords.new.length < 6) {
        setPasswordError(locale === 'en' ? 'Password must be at least 6 characters.' : 'Şifre en az 6 karakter olmalıdır.');
        setSaving(false);
        return;
      }
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: passwords.new });
      if (error) {
        setPasswordError(locale === 'en' ? 'An error occurred. Please try again.' : 'Bir hata oluştu. Lütfen tekrar deneyin.');
        setSaving(false);
        return;
      }
      // Send notification
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        await supabase.from('notifications').insert({
          user_id: authUser.id,
          title: locale === 'en' ? 'Password Changed' : 'Şifre Değiştirildi',
          message: locale === 'en' ? 'Your password has been successfully changed.' : 'Şifreniz başarıyla değiştirildi.',
          type: 'info'
        });
      }
      setPasswords({ new: '', confirm: '' });
    } else if (activeTab === 'profile') {
      const result = await updateProfile({
        full_name: profile.fullName,
        company_name: profile.companyName,
        email: profile.email,
        website: profile.website,
      });
      if (result.error) {
        console.error('Profile save error:', result.error);
        setSaving(false);
        return;
      }
    } else {
      await new Promise((r) => setTimeout(r, 500));
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: t('profileTitle'), icon: User },
    { id: 'notifications', label: t('notificationsTitle'), icon: Bell },
    { id: 'security', label: t('securityTitle'), icon: Shield },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-foreground">
          {t('title')}
        </h1>
        <p className="text-foreground-secondary text-sm mt-1">{t('subtitle')}</p>
      </div>

      {/* Plan Status Card */}
      <div className={cn('rounded-2xl border p-5', planStyle.bg, planStyle.border)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Crown size={18} className={planStyle.color} />
            <div>
              <span className={cn('text-sm font-bold', planStyle.color)}>
                {planStyle[locale === 'en' ? 'en' : 'tr']} Plan
              </span>
            </div>
          </div>
          {plan !== 'premium' && (
            <Link
              href="/upgrade"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              {locale === 'en' ? 'Upgrade Plan' : 'Planı Yükselt'} <ArrowUpRight size={12} />
            </Link>
          )}
        </div>

        {/* Usage bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CRM Usage */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-foreground-secondary">
                {locale === 'en' ? 'CRM Records' : 'CRM Kaydı'}
              </span>
              <span className="text-xs font-bold text-foreground">
                {crmUsed} / {crmMax}
              </span>
            </div>
            <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min((crmUsed / crmMax) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Email Usage */}
          {emailMax > 0 && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-foreground-secondary">
                  {locale === 'en' ? 'Monthly Messages' : 'Aylık Mesaj'}
                </span>
                <span className="text-xs font-bold text-foreground">
                  {monthlyEmails} / {emailMax}
                </span>
              </div>
              <div className="w-full h-2 bg-white/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${Math.min((monthlyEmails / emailMax) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-background-tertiary rounded-xl p-1 w-fit">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setPasswordError(''); // Clear errors when switching tabs
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-white text-foreground shadow-sm'
                  : 'text-foreground-secondary hover:text-foreground'
              )}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
        onChange={handleAvatarChange}
      />

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-glass-border p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-6 border-b border-glass-border">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary/15 to-primary-dark/15 border border-primary/10 flex items-center justify-center overflow-hidden group cursor-pointer"
              >
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="Avatar" fill className="object-cover" />
                ) : (
                  <User size={24} className="text-primary-dark" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera size={18} className="text-white" />
                </div>
              </button>
              <div>
                <h3 className="font-semibold text-foreground">{t('profilePicture')}</h3>
                <p className="text-xs text-foreground-muted mt-0.5">PNG, JPG — Maks. 5MB</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 text-xs text-primary-dark font-medium hover:underline"
                >
                  {t('change')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('fullName')}</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    placeholder={t('fullName')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('company')}</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type="text"
                    value={profile.companyName}
                    onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                    placeholder={t('company')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('email')}</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder={locale === 'en' ? 'example@company.com' : 'ornek@sirket.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{t('website')}</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder={locale === 'en' ? 'https://company.com' : 'https://sirket.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">{t('about')}</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder={t('aboutPlaceholder')}
                className="w-full px-4 py-3 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {[
              { key: 'emailReplies' as const, label: locale === 'en' ? 'Email Replies' : 'Email Yanıtları', desc: locale === 'en' ? 'Get notified when investors reply' : 'Yatırımcılardan gelen yanıtlarda bildirim al' },
              { key: 'weeklyDigest' as const, label: locale === 'en' ? 'Weekly Digest' : 'Haftalık Özet', desc: locale === 'en' ? 'Receive weekly activity summary' : 'Her hafta aktivite özeti emaili al' },
              { key: 'productUpdates' as const, label: locale === 'en' ? 'Product Updates' : 'Ürün Güncellemeleri', desc: locale === 'en' ? 'Get notified about new features and updates' : 'Yeni özellikler ve güncellemeler hakkında bilgi al' },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between py-4 border-b border-glass-border last:border-0"
              >
                <div>
                  <h4 className="text-sm font-medium text-foreground">{item.label}</h4>
                  <p className="text-xs text-foreground-muted mt-0.5">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    setNotifications({ ...notifications, [item.key]: !notifications[item.key] })
                  }
                  className={cn(
                    'w-11 h-6 rounded-full transition-all relative',
                    notifications[item.key] ? 'bg-primary' : 'bg-gray-200'
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5 transition-all',
                      notifications[item.key] ? 'left-[22px]' : 'left-0.5'
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="pb-6 border-b border-glass-border">
              <h3 className="text-sm font-semibold text-foreground mb-1">{locale === 'en' ? 'Change Password' : 'Şifre Değiştir'}</h3>
              <p className="text-xs text-foreground-muted mb-4">
                {locale === 'en' ? 'Use a strong password (at least 6 characters)' : 'Güvenliğiniz için güçlü bir şifre kullanın (en az 6 karakter)'}
              </p>
              
              {passwordError && (
                <div className="p-3 mb-4 rounded-lg bg-red-50 text-error text-sm border border-red-100 animate-fade-in">
                  {passwordError}
                </div>
              )}

              <div className="space-y-3 max-w-sm">
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder={locale === 'en' ? 'New password' : 'Yeni şifre'}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder={locale === 'en' ? 'Confirm new password' : 'Yeni şifre tekrar'}
                  className="w-full px-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-error mb-1">{locale === 'en' ? 'Delete Account' : 'Hesabı Sil'}</h3>
              <p className="text-xs text-foreground-muted mb-3">
                {locale === 'en' ? 'This action cannot be undone. All your data will be permanently deleted.' : 'Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinir.'}
              </p>
              <button className="px-4 py-2 rounded-lg border border-error/30 text-error text-sm font-medium hover:bg-error/5 transition-all">
                {locale === 'en' ? 'Delete My Account' : 'Hesabımı Sil'}
              </button>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-glass-border flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className={cn(
              'btn-primary flex items-center gap-2 text-sm px-6 py-2.5',
              saving && 'opacity-70 cursor-not-allowed'
            )}
          >
            {saved ? (
              <>
                <Check size={16} /> {t('saved')}
              </>
            ) : saving ? (
              locale === 'en' ? 'Saving...' : 'Kaydediliyor...'
            ) : (
              <>
                <Save size={16} /> {t('save')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
