'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Bell, Globe, User, LogOut, Settings, Coins, CheckCheck } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/providers/AuthProvider';
import { usePlan } from '@/components/providers/PlanProvider';
import { createClient } from '@/lib/supabase/client';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

function timeAgo(dateStr: string, locale: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return locale === 'tr' ? 'Az önce' : 'Just now';
  if (diffMin < 60) return locale === 'tr' ? `${diffMin} dk önce` : `${diffMin}m ago`;
  if (diffHr < 24) return locale === 'tr' ? `${diffHr} sa önce` : `${diffHr}h ago`;
  if (diffDay < 7) return locale === 'tr' ? `${diffDay} gün önce` : `${diffDay}d ago`;
  return date.toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'short' });
}

export default function Navbar() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { credits } = usePlan();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) setNotifications(data);
  }, [user]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Mark single notification as read
  const markAsRead = async (id: string) => {
    const supabase = createClient();
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  // Mark all as read
  const markAllAsRead = async () => {
    const supabase = createClient();
    const unreadIds = notifications.filter(n => !n.is_read).map(n => n.id);
    if (unreadIds.length === 0) return;
    await supabase.from('notifications').update({ is_read: true }).in('id', unreadIds);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

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

  const typeColor: Record<string, string> = {
    success: 'bg-emerald-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-glass-border bg-white/80 backdrop-blur-sm relative z-50">
      <div />

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Credits Badge */}
        <button
          onClick={() => router.push('/upgrade')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100 transition-colors mr-2 cursor-pointer"
          title={locale === 'en' ? 'Get more credits' : 'Kredi satın al'}
        >
          <Coins size={14} className="text-orange-500" />
          <span className="font-bold text-sm tracking-tight">{credits}</span>
        </button>
        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); if (!showNotifications) fetchNotifications(); }}
            className="relative p-2.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-all"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 animate-pulse">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-glass-border shadow-xl z-100 animate-fade-in overflow-hidden">
              <div className="flex items-center justify-between p-3 border-b border-glass-border">
                <h3 className="font-semibold text-sm">{t('notifications')}</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary-dark transition-colors"
                  >
                    <CheckCheck size={12} />
                    {locale === 'tr' ? 'Tümünü Oku' : 'Mark All Read'}
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-sm text-foreground-muted text-center py-8">
                    {t('noNotifications')}
                  </div>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={cn(
                        'w-full text-left px-3 py-2.5 border-b border-glass-border/50 hover:bg-background-tertiary transition-colors',
                        !n.is_read && 'bg-primary/[0.03]'
                      )}
                    >
                      <div className="flex items-start gap-2">
                        <span className={cn('mt-1.5 w-2 h-2 rounded-full shrink-0', typeColor[n.type] || 'bg-gray-400', n.is_read && 'opacity-30')} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className={cn('text-xs font-semibold truncate', n.is_read ? 'text-foreground-muted' : 'text-foreground')}>{n.title}</span>
                            <span className="text-[10px] text-foreground-muted whitespace-nowrap shrink-0">{timeAgo(n.created_at, locale)}</span>
                          </div>
                          <p className={cn('text-[11px] mt-0.5 leading-relaxed', n.is_read ? 'text-foreground-muted/70' : 'text-foreground-secondary')}>{n.message}</p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
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

