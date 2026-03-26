'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Inbox as InboxIcon, Mail, Clock, Check, CheckCheck, ArrowRight, Loader2, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getEmailThreads, addReplyToThread } from '@/lib/db/emails';
import { usePlan } from '@/components/providers/PlanProvider';
import { Link } from '@/i18n/routing';

type EmailThread = {
  id: string;
  investor_id: string;
  investor: { id: string; name: string; company: string; investor_type: string[] } | null;
  subject: string;
  status: 'sent' | 'delivered' | 'opened' | 'replied';
  sent_at: string;
  replied_at: string | null;
  created_at: string;
  messages: { id: string; direction: string; body: string; sent_at: string }[];
};

function formatDate(dateStr: string, locale: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (locale === 'en') {
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }
  if (diffDays === 0) return 'Bugün';
  if (diffDays === 1) return 'Dün';
  if (diffDays < 7) return `${diffDays} gün önce`;
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}

function StatusBadge({ status, locale }: { status: string; locale: string }) {
  const config: Record<string, { label: string; icon: typeof Check; color: string }> = {
    sent: { label: locale === 'en' ? 'Sent' : 'Gönderildi', icon: Check, color: 'text-foreground-muted bg-background-tertiary' },
    delivered: { label: locale === 'en' ? 'Delivered' : 'Teslim Edildi', icon: CheckCheck, color: 'text-blue-600 bg-blue-50' },
    opened: { label: locale === 'en' ? 'Opened' : 'Açıldı', icon: CheckCheck, color: 'text-blue-600 bg-blue-50' },
    replied: { label: locale === 'en' ? 'Replied' : 'Yanıtlandı', icon: ArrowRight, color: 'text-success bg-success/10' },
  };
  const { label, icon: Icon, color } = config[status] || config.sent;

  return (
    <span className={cn('flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium', color)}>
      <Icon size={10} /> {label}
    </span>
  );
}

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}

export default function InboxPage() {
  const t = useTranslations('dashboard.inbox');
  const locale = useLocale();
  const { limits } = usePlan();
  const canAccess = limits.canSendEmail;
  
  const [threads, setThreads] = useState<EmailThread[]>([]);
  const [loading, setLoading] = useState(canAccess);
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Load threads from Supabase
  useEffect(() => {
    if (!canAccess) return;
    async function load() {
      const data = await getEmailThreads();
      setThreads(data as EmailThread[]);
      setLoading(false);
    }
    load();
  }, [canAccess]);

  const selected = threads.find((th) => th.id === selectedThread);

  const handleReply = async () => {
    if (!replyText.trim() || !selectedThread) return;
    setSendingReply(true);
    
    await addReplyToThread(selectedThread, replyText);
    
    // Update local state
    setThreads((prev) =>
      prev.map((th) =>
        th.id === selectedThread
          ? {
              ...th,
              messages: [
                ...th.messages,
                { id: crypto.randomUUID(), direction: 'outbound', body: replyText, sent_at: new Date().toISOString() },
              ],
            }
          : th
      )
    );
    
    setReplyText('');
    setSendingReply(false);
  };

  if (!canAccess) {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Lock size={28} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {locale === 'en' ? 'Inbox is a Paid Feature' : 'Gelen Kutusu Ücretli Bir Özelliktir'}
          </h2>
          <p className="text-foreground-muted text-sm max-w-md mb-6">
            {locale === 'en'
              ? 'Upgrade to Starter or higher to view and reply to investor messages.'
              : 'Yatırımcı mesajlarını görmek ve yanıtlamak için Başlangıç veya üst plana geçin.'}
          </p>
          <Link href="/pricing" className="btn-primary px-6 py-2.5 text-sm font-semibold">
            {locale === 'en' ? 'Upgrade Plan' : 'Planı Yükselt'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up h-full flex flex-col">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-foreground">
          {t('title')}
        </h1>
        <p className="text-foreground-secondary text-sm mt-1">{t('subtitle')}</p>
      </div>

      {/* Inbox Layout */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Thread List */}
        <div className="w-[380px] flex-shrink-0 bg-white rounded-2xl border border-glass-border overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-glass-border">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <InboxIcon size={16} className="text-primary" />
              {t('title')}
              <span className="ml-auto w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center">
                {threads.length}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-glass-border">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={20} className="animate-spin text-primary" />
              </div>
            ) : threads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-foreground-muted">
                <InboxIcon size={32} className="mb-2 opacity-30" />
                <p className="text-sm">{locale === 'en' ? 'No emails yet' : 'Henüz email yok'}</p>
                <p className="text-xs mt-1">{locale === 'en' ? 'Send your first email from Outreach' : 'İlk emailinizi Email Gönder sayfasından gönderin'}</p>
              </div>
            ) : (
              threads.map((thread) => (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread.id)}
                  className={cn(
                    'w-full text-left px-4 py-3.5 transition-all hover:bg-background-tertiary/50',
                    selectedThread === thread.id && 'bg-primary/5 border-l-2 border-l-primary'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/15 to-primary-dark/15 border border-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-dark font-bold text-[10px]">
                        {thread.investor ? getInitials(thread.investor.name) : '??'}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-foreground truncate">
                          {thread.investor?.name || (locale === 'en' ? 'Unknown' : 'Bilinmeyen')}
                        </span>
                        <span className="text-[10px] text-foreground-muted flex-shrink-0 flex items-center gap-1">
                          <Clock size={10} /> {formatDate(thread.sent_at || thread.created_at, locale)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground-secondary truncate mt-0.5">{thread.subject}</p>
                      <div className="mt-1.5">
                        <StatusBadge status={thread.status} locale={locale} />
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Thread Detail */}
        <div className="flex-1 bg-white rounded-2xl border border-glass-border overflow-hidden flex flex-col">
          {selected ? (
            <>
              {/* Thread Header */}
              <div className="px-6 py-4 border-b border-glass-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/15 to-primary-dark/15 border border-primary/10 flex items-center justify-center">
                    <span className="text-primary-dark font-bold text-xs">
                      {selected.investor ? getInitials(selected.investor.name) : '??'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{selected.investor?.name}</h3>
                    <p className="text-xs text-foreground-muted">{selected.investor?.company}</p>
                  </div>
                  <div className="ml-auto">
                    <StatusBadge status={selected.status} locale={locale} />
                  </div>
                </div>
                <h2 className="mt-3 text-sm font-medium text-foreground">{selected.subject}</h2>
              </div>

              {/* Thread Body — show all messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {selected.messages && selected.messages.length > 0 ? (
                  selected.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'rounded-xl p-4 text-sm leading-relaxed max-w-[80%]',
                        msg.direction === 'outbound'
                          ? 'bg-primary/5 border border-primary/10 ml-auto'
                          : 'bg-background-tertiary/50'
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.body}</p>
                      <span className="text-[10px] text-foreground-muted mt-2 block">
                        {formatDate(msg.sent_at, locale)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full text-sm text-foreground-muted">
                    {locale === 'en' ? 'No replies yet' : 'Henüz yanıt yok'}
                  </div>
                )}
              </div>

              {/* Reply */}
              <div className="px-6 py-4 border-t border-glass-border">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                    placeholder={t('replyPlaceholder')}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  />
                  <button 
                    onClick={handleReply}
                    disabled={!replyText.trim() || sendingReply}
                    className={cn('btn-primary px-4 py-2.5 flex items-center gap-2 text-sm', (!replyText.trim() || sendingReply) && 'opacity-50')}
                  >
                    <Mail size={16} /> {t('send')}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <InboxIcon size={40} className="mx-auto mb-3 text-foreground-muted/30" />
                <p className="text-sm text-foreground-muted">{locale === 'en' ? 'Select a thread' : 'Bir thread seçin'}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
