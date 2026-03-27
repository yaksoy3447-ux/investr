'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, Plus, Check, Mail, ExternalLink, X, Lock, Loader2, Coins } from 'lucide-react';
import { Investor } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';
import { INVESTOR_TYPES, SECTORS, INVESTMENT_STAGES } from '@/lib/constants';
import { cn, formatCurrency } from '@/lib/utils';
import { useCRM } from '@/components/providers/CRMProvider';
import { usePlan, blurName } from '@/components/providers/PlanProvider';
import { useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';

function getLabel(items: readonly { value: string; labelTr: string; labelEn: string }[], value: string, locale: string) {
  const item = items.find((i) => i.value === value);
  if (!item) return value;
  return locale === 'en' ? item.labelEn : item.labelTr;
}

export default function InvestorCard({ investor, index }: { investor: Investor; index: number }) {
  const [showDetail, setShowDetail] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { addToList, removeFromList, isInList, items: crmItems } = useCRM();
  const { limits, unlockedInvestorIds, credits, refreshCredits } = usePlan();
  const locale = useLocale();
  const router = useRouter();
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const added = isInList(investor.id);
  const isUnlocked = unlockedInvestorIds.includes(investor.id);
  const canSeeNames = limits.canSeeInvestorNames || isUnlocked;
  const crmFull = crmItems.length >= limits.maxCrmItems;

  const displayName = canSeeNames ? investor.name : blurName(investor.name);
  const displayCompany = canSeeNames ? investor.company : (investor.company ? blurName(investor.company) : '');

  const handleUnlock = async () => {
    if (credits <= 0) {
      router.push('/pricing');
      return;
    }
    
    setUnlocking(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const res = await fetch('/api/investors/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, investorId: investor.id })
      });
      const json = await res.json();
      
      if (json.success) {
        await refreshCredits();
      } else {
        alert(json.error || 'Failed to unlock');
      }
    } catch(err) {
      console.error(err);
    } finally {
      setUnlocking(false);
    }
  };

  const handleToggleList = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (added) {
      removeFromList(investor.id);
    } else if (!crmFull) {
      addToList(investor);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        onClick={() => setShowDetail(true)}
        className="bg-white rounded-xl border border-glass-border p-5 cursor-pointer group hover:shadow-md hover:border-primary/15 transition-all duration-300 relative"
      >
        {/* Top — Avatar + Name */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/15 to-primary-dark/15 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-primary-dark font-bold text-sm">
              {canSeeNames ? investor.name.split(' ').map((n) => n[0]).join('') : '??'}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={cn("font-semibold text-foreground text-sm truncate", !canSeeNames && "select-none")}>{displayName}</h3>
            <p className={cn("text-foreground-muted text-xs truncate", !canSeeNames && "select-none")}>
              {canSeeNames ? `${investor.title} · ${investor.company}` : `${investor.title ? '****' : ''} · ${displayCompany}`}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {investor.investor_type.map((type) => (
            <span key={type} className="px-2 py-0.5 text-[11px] rounded-full bg-primary/10 text-primary-dark font-medium">
              {getLabel(INVESTOR_TYPES, type, locale)}
            </span>
          ))}
          {investor.stages.slice(0, 2).map((stage) => (
            <span key={stage} className="px-2 py-0.5 text-[11px] rounded-full bg-blue-50 text-blue-600 font-medium">
              {getLabel(INVESTMENT_STAGES, stage, locale)}
            </span>
          ))}
          {investor.sectors.slice(0, 2).map((sector) => (
            <span key={sector} className="px-2 py-0.5 text-[11px] rounded-full bg-background-tertiary text-foreground-secondary">
              {getLabel(SECTORS, sector, locale)}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-foreground-muted pt-2 border-t border-glass-border">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {investor.location_city}
          </span>

        </div>

        {/* Quick actions on hover */}
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleToggleList}
            className={cn(
              'p-1.5 rounded-lg border transition-all',
              added
                ? 'bg-success/10 border-success/20 text-success'
                : 'bg-white border-glass-border text-foreground-muted hover:text-primary-dark hover:border-primary/20'
            )}
            title={added ? (locale === 'en' ? 'Remove from CRM' : 'CRM\'den çıkar') : (locale === 'en' ? 'Add to CRM' : 'CRM\'e Ekle')}
          >
            {added ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>
      </motion.div>

      {/* Detail Modal via Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {showDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-100 flex items-center justify-center p-4"
              onClick={() => setShowDetail(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl border border-glass-border shadow-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-glass-border">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-full bg-linear-to-br from-primary/15 to-primary-dark/15 border border-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary-dark font-bold text-base">
                          {canSeeNames ? investor.name.split(' ').map((n) => n[0]).join('') : '??'}
                        </span>
                      </div>
                      <div>
                        <h2 className={cn("text-lg font-semibold text-foreground", !canSeeNames && "select-none")}>{displayName}</h2>
                        <p className={cn("text-foreground-secondary text-sm", !canSeeNames && "select-none")}>
                          {canSeeNames ? `${investor.title} · ${investor.company}` : `**** · ${displayCompany}`}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-foreground-muted">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {investor.location_city}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDetail(false)}
                      className="p-1.5 rounded-lg hover:bg-background-tertiary text-foreground-muted"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-5">
                  {/* Bio */}
                  {investor.bio && (
                    <p className="text-foreground-secondary text-sm leading-relaxed">{investor.bio}</p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {investor.investor_type && Array.isArray(investor.investor_type) && investor.investor_type.map((type) => (
                      <span key={type} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary-dark font-medium">
                        {getLabel(INVESTOR_TYPES, type, locale)}
                      </span>
                    ))}
                    {investor.stages && Array.isArray(investor.stages) && investor.stages.map((stage) => (
                      <span key={stage} className="px-2.5 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium">
                        {getLabel(INVESTMENT_STAGES, stage, locale)}
                      </span>
                    ))}
                    {investor.sectors && Array.isArray(investor.sectors) && investor.sectors.map((sector) => (
                      <span key={sector} className="px-2.5 py-1 text-xs rounded-full bg-background-tertiary text-foreground-secondary">
                        {getLabel(SECTORS, sector, locale)}
                      </span>
                    ))}
                  </div>

                  {/* Check Size */}
                  {(investor.min_ticket || investor.max_ticket) && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={16} className="text-foreground-muted" />
                      <span className="text-foreground-secondary">
                        Check Size: {formatCurrency(investor.min_ticket || 0)} — {formatCurrency(investor.max_ticket || 0)}
                      </span>
                    </div>
                  )}

                  {/* Portfolio */}
                  {investor.portfolio && Array.isArray(investor.portfolio) && investor.portfolio.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                        <Briefcase size={16} className="text-foreground-muted" /> {locale === 'en' ? 'Portfolio' : 'Portföy'}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {investor.portfolio.map((company) => (
                          <span key={company} className="px-3 py-1.5 text-xs rounded-lg bg-background-tertiary text-foreground-secondary font-medium">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Info Wrapper */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-glass-border">
                    <div className="flex items-center gap-2 text-sm text-foreground font-semibold mb-1">
                      {locale === 'en' ? 'Contact Details' : 'İletişim Bilgileri'}
                    </div>

                    {/* Email */}
                    {investor.email && (
                      canSeeNames ? (
                        <a
                          href={`mailto:${investor.email}`}
                          className="flex items-center gap-2 text-sm text-foreground hover:underline px-3 py-2.5 bg-success/5 border border-success/10 rounded-xl"
                        >
                          <Mail size={16} className="text-success flex-shrink-0" /> {investor.email}
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-foreground-muted select-none px-3 py-2.5 bg-background-tertiary rounded-xl border border-glass-border">
                           <Lock size={16} className="flex-shrink-0" /> <span className="blur-sm opacity-50">hidden_email@investor.com</span>
                        </div>
                      )
                    )}

                    {/* LinkedIn */}
                    {investor.linkedin_url && (
                      canSeeNames ? (
                        <a
                          href={investor.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-blue-600 hover:underline px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-xl"
                        >
                          <ExternalLink size={16} className="flex-shrink-0" /> {locale === 'en' ? 'LinkedIn Profile' : 'LinkedIn Profili'}
                        </a>
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-foreground-muted select-none px-3 py-2.5 bg-background-tertiary rounded-xl border border-glass-border">
                           <Lock size={16} className="flex-shrink-0" /> <span className="blur-sm opacity-50">linkedin.com/in/investor-profile</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-glass-border flex gap-3">
                  {isUnlocked ? (
                    <>
                      <button
                        onClick={() => handleToggleList()}
                        className={cn(
                          'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all',
                          added
                            ? 'bg-success/10 text-success border border-success/20'
                            : 'btn-secondary'
                        )}
                      >
                        {added ? <Check size={16} /> : <Plus size={16} />}
                        {added ? (locale === 'en' ? 'Remove from CRM' : 'CRM\'den Çıkar') : (locale === 'en' ? 'Add to CRM' : 'CRM\'e Ekle')}
                      </button>
                      <Link href={`/outreach?investor=${investor.id}`} className="flex-1">
                        <button className="w-full btn-primary flex items-center justify-center gap-2 py-2.5 text-sm">
                          <Mail size={16} /> {locale === 'en' ? 'Send Email' : 'Email Gönder'}
                        </button>
                      </Link>
                    </>
                  ) : (
                    <button 
                      onClick={handleUnlock} 
                      disabled={unlocking}
                      className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm font-bold shadow-lg shadow-orange-500/20 bg-linear-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 border-none transition-all"
                    >
                      {unlocking ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          <Coins size={18} className="text-white" /> 
                          {locale === 'en' ? 'Reveal Contact (1 Credit)' : 'İletişimi Aç (1 Kredi)'}
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
