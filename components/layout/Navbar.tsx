'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Bell, Globe, User, LogOut, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/providers/AuthProvider';

export default function Navbar() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Get user initials
  const userName = user?.user_metadata?.full_name || user?.email || '';
  const userInitials = userName
    .split(/[@\s]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s: string) => s[0]?.toUpperCase())
    .join('');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: 'tr' | 'en') => {
    router.replace(pathname, { locale: newLocale });
    setShowLangMenu(false);
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-glass-border bg-white/80 backdrop-blur-sm relative z-50">
      <div />

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-all"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-xl border border-glass-border p-3 shadow-lg z-[100] animate-fade-in">
              <h3 className="font-semibold text-sm mb-2">{t('notifications')}</h3>
              <div className="text-sm text-foreground-muted text-center py-4">
                {t('noNotifications')}
              </div>
            </div>
          )}
        </div>

        {/* Language Switcher */}
        <div ref={langRef} className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 p-2.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-all"
          >
            <Globe size={18} />
            <span className="text-xs font-medium uppercase">{locale}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-12 w-36 bg-white rounded-xl border border-glass-border p-1 shadow-lg z-[100] animate-fade-in">
              <button
                onClick={() => switchLocale('tr')}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm rounded-lg transition-all',
                  locale === 'tr'
                    ? 'text-primary-dark bg-primary/10 font-medium'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary'
                )}
              >
                TR Türkçe
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm rounded-lg transition-all',
                  locale === 'en'
                    ? 'text-primary-dark bg-primary/10 font-medium'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary'
                )}
              >
                EN English
              </button>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div ref={userRef} className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-background-tertiary transition-all"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary-dark/20 border border-primary/15 flex items-center justify-center">
              {userInitials ? (
                <span className="text-primary-dark font-bold text-[11px]">{userInitials}</span>
              ) : (
                <User size={14} className="text-primary-dark" />
              )}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-xl border border-glass-border p-1.5 shadow-lg z-[100] animate-fade-in">
              {/* User info */}
              {user && (
                <div className="px-3 py-2 mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.user_metadata?.full_name || (locale === 'en' ? 'User' : 'Kullanıcı')}
                  </p>
                  <p className="text-xs text-foreground-muted truncate">{user.email}</p>
                </div>
              )}
              <hr className="my-1 border-glass-border" />
              <a
                href={`/${locale}/settings`}
                className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-foreground-secondary hover:text-foreground hover:bg-background-tertiary rounded-lg transition-all"
              >
                <Settings size={14} /> {locale === 'en' ? 'Settings' : 'Ayarlar'}
              </a>
              <button
                onClick={signOut}
                className="flex items-center gap-2 w-full px-3 py-2 text-left text-sm text-error hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut size={14} /> {t('logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

