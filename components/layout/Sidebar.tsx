'use client';

import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  Users,
  LayoutDashboard,
  Mail,
  Inbox,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Crown,
  ArrowUpRight,
  Radar,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { usePlan } from '@/components/providers/PlanProvider';

const navItems = [
  { href: '/investors', icon: Users, labelKey: 'investors' },
  { href: '/crm', icon: LayoutDashboard, labelKey: 'crm' },
  { href: '/outreach', icon: Mail, labelKey: 'outreach' },
  { href: '/inbox', icon: Inbox, labelKey: 'inbox' },
  { href: '/settings', icon: Settings, labelKey: 'settings' },
] as const;

const PLAN_STYLES = {
  free: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200', label: { tr: 'Ücretsiz', en: 'Free' } },
  starter: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', label: { tr: 'Başlangıç', en: 'Starter' } },
  pro: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', label: { tr: 'Büyüme', en: 'Growth' } },
  premium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: { tr: 'Premium', en: 'Premium' } },
} as const;

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const locale = useLocale();
  const [collapsed, setCollapsed] = useState(false);
  const { plan } = usePlan();
  const style = PLAN_STYLES[plan] || PLAN_STYLES.free;

  return (
    <aside
      className={cn(
        'h-screen flex flex-col border-r border-glass-border bg-white transition-all duration-300 ease-in-out relative z-[60]',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      {/* Logo + Collapse Toggle */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-glass-border">
        <Link href="/" className="flex items-center gap-1.5 group overflow-hidden">
          <div className="flex-shrink-0 flex items-center justify-center w-8">
            <Radar className="text-primary w-6 h-6" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-foreground transition-opacity tracking-tight">
              GetInvestr
            </span>
          )}
        </Link>

        {/* Collapse/Expand button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-background-tertiary transition-all',
            collapsed && 'absolute -right-3 top-5 bg-white border border-glass-border shadow-sm z-10 rounded-full p-1'
          )}
          title={collapsed ? t('expand') : t('collapse')}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.includes(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? t(item.labelKey) : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group font-medium',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-[#3b82f6] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon
                size={18}
                className={cn(
                  'flex-shrink-0 transition-colors',
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                )}
              />
              {!collapsed && (
                <span className="text-[13px] truncate">
                  {t(item.labelKey)}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Plan Badge */}
      <div className={cn("border-t border-glass-border px-3 py-3 pb-10", collapsed && "px-2")}>
        {collapsed ? (
          <div
            className={cn('w-10 h-10 mx-auto rounded-lg flex items-center justify-center', style.bg, style.border, 'border')}
            title={style.label[locale === 'en' ? 'en' : 'tr']}
          >
            <Crown size={14} className={style.text} />
          </div>
        ) : (
          <div className={cn('rounded-xl p-3 border', style.bg, style.border)}>
            <div className="flex items-center gap-2">
              <Crown size={14} className={style.text} />
              <span className={cn('text-xs font-bold', style.text)}>
                {style.label[locale === 'en' ? 'en' : 'tr']} Plan
              </span>
            </div>
            {plan === 'free' && (
              <Link
                href="/pricing"
                className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                {locale === 'en' ? 'Upgrade Plan' : 'Planı Yükselt'} <ArrowUpRight size={11} />
              </Link>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
