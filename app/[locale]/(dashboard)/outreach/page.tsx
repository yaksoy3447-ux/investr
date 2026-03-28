'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Send, User, FileText, Sparkles, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCRM } from '@/components/providers/CRMProvider';
import { usePlan } from '@/components/providers/PlanProvider';
import { createEmailThread, getMonthlyEmailCount } from '@/lib/db/emails';
import { createClient } from '@/lib/supabase/client';
import { Link } from '@/i18n/routing';

export default function OutreachPage() {
  const t = useTranslations('dashboard.outreach');
  const locale = useLocale();
  
  const { items: crmItems } = useCRM();
  const { limits, unlockedInvestorIds, credits } = usePlan();
  const [selectedInvestor, setSelectedInvestor] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const invId = params.get('investor');
      if (invId) {
        setSelectedInvestor(invId);
      }
    }
  }, []);

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [monthlyUsed, setMonthlyUsed] = useState(0);
  const monthlyLimit = limits.maxEmailsPerMonth;
  const canSend = limits.canSendEmail;

  // Load this month's email count
  useEffect(() => {
    if (canSend) getMonthlyEmailCount().then(setMonthlyUsed);
  }, [canSend]);

  const handleSend = async () => {
    if (!selectedInvestor || !subject || !body) return;
    setSending(true);
    
    const result = await createEmailThread(selectedInvestor, subject, body);
    
    setSending(false);
    
    if (!result.error) {
      setSent(true);
      setMonthlyUsed(prev => prev + 1);
      setTimeout(() => {
        setSent(false);
        setSubject('');
        setBody('');
        setSelectedInvestor('');
      }, 2000);
    }
  };

  const generateWithAI = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsGenerating(false);
        return;
      }

      const promptText = body.trim().length > 0 
        ? body.trim() 
        : "Bizim girişimimiz GetInvestr. Risk sermayesi ve melek yatırımcıları, yenilikçi kaliteli girişimcilerle buluşturan teknolojik bir köprüyüz. Bizim bu yatırımcıyla 15 dakika tanışmasını iste.";

      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, userId: user.id }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.subject && data.body) {
          setSubject(data.subject);
          setBody(data.body);
        }
      } else {
        console.error("AI Generation failed");
      }
    } catch (e) {
      console.error(e);
    }
    
    setIsGenerating(false);
  };

  if (!canSend) {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
            <Lock size={28} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {locale === 'en' ? 'Email Outreach is a Paid Feature' : 'Email Gönderimi Ücretli Bir Özelliktir'}
          </h2>
          <p className="text-foreground-muted text-sm max-w-md mb-6">
            {locale === 'en'
              ? 'Upgrade to Starter or higher to send personalized emails to investors directly through GetInvestr.'
              : 'Yatırımcılara doğrudan GetInvestr üzerinden kişiselleştirilmiş email göndermek için Başlangıç veya üst plana geçin.'}
          </p>
          <Link
            href="/pricing"
            className="btn-primary px-6 py-2.5 text-sm font-semibold"
          >
            {locale === 'en' ? 'Upgrade Plan' : 'Planı Yükselt'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-foreground">
            {t('title')}
          </h1>
          <p className="text-foreground-secondary text-sm mt-1">{t('subtitle')}</p>
        </div>

        {/* Monthly limit */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-background-tertiary border border-glass-border">
          <div className="text-right">
            <p className="text-xs text-foreground-muted">{locale === 'en' ? 'Monthly usage' : 'Aylık kullanım'}</p>
            <p className="text-sm font-semibold text-foreground">
              {monthlyUsed} / {monthlyLimit}
            </p>
          </div>
          <div className="w-12 h-12 relative">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#F3F4F6" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.5" fill="none"
                stroke="#B8941F"
                strokeWidth="3"
                strokeDasharray={`${(monthlyUsed / monthlyLimit) * 97.4} 97.4`}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-foreground">
              {monthlyLimit - monthlyUsed}
            </span>
          </div>
        </div>
      </div>

      {/* Compose Email */}
      <div className="bg-white rounded-2xl border border-glass-border p-6">
        <h2 className="font-semibold text-foreground mb-5 flex items-center gap-2">
          <Send size={18} className="text-primary" /> {locale === 'en' ? 'New Email' : 'Yeni Email'}
        </h2>

        <div className="space-y-4">
          {/* Investor select */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">{t('investorLabel')}</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <select
                value={selectedInvestor}
                onChange={(e) => setSelectedInvestor(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none"
              >
                <option value="">{t('selectInvestor')}</option>
                {crmItems.map((item) => {
                  const isUnlocked = unlockedInvestorIds.includes(item.investor_id);
                  return (
                    <option key={item.investor_id} value={item.investor_id} disabled={!isUnlocked}>
                       {item.investor?.name} — {item.investor?.company} {!isUnlocked ? ' (Locked)' : ''}
                    </option>
                  );
                })}
                {crmItems.length === 0 && (
                  <option disabled>{locale === 'en' ? 'Add investors to CRM first' : 'Önce CRM\'e yatırımcı ekleyin'}</option>
                )}
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">{t('subjectLabel')}</label>
            <div className="relative">
              <FileText size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t('subjectPlaceholder')}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          {/* Body */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-foreground">{t('contentLabel')}</label>
              <button 
                onClick={generateWithAI}
                disabled={isGenerating}
                className={cn(
                  "flex items-center gap-1.5 text-xs font-medium transition-all",
                  isGenerating ? "text-primary/50 cursor-wait" : "text-primary-dark hover:underline"
                )}
              >
                <Sparkles size={12} className={isGenerating ? "animate-pulse" : ""} /> 
                {isGenerating 
                  ? (locale === 'en' ? 'Generating...' : 'Oluşturuluyor...') 
                  : (body.trim().length > 0 ? (locale === 'en' ? 'Refine with AI' : 'AI ile Güzelleştir') : (locale === 'en' ? 'Generate with AI' : 'AI ile Oluştur'))}
              </button>
            </div>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={locale === 'en' ? 'Dear [Investor Name],\n\nI am [Your Name], founder of [Company]...' : 'Merhaba [Yatırımcı Adı],\n\nBen [Adınız], [Şirket] kurucusuyum...'}
              className="w-full px-4 py-3 rounded-xl border border-glass-border bg-white text-sm placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none font-mono"
            />
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-info/5 border border-info/10">
            <AlertCircle size={16} className="text-info flex-shrink-0 mt-0.5" />
            <p className="text-xs text-foreground-secondary leading-relaxed">
              {locale === 'en'
                ? 'Email will be sent through the platform. The investor\'s email address will not be shown to you. You can track your sent messages in the Sent Messages section. Replies will be sent to your registered email address.'
                : 'Email, platform üzerinden gönderilecektir. Yatırımcının email adresi size gösterilmez. Gönderdiğiniz mesajları Giden Kutusu bölümünden takip edebilirsiniz. Yanıtlar kayıtlı email adresinize gelecektir.'}
            </p>
          </div>

          {/* Send button */}
          <div className="flex justify-end">
            <button
              onClick={handleSend}
              disabled={!selectedInvestor || !subject || !body || sending}
              className={cn(
                'btn-primary flex items-center gap-2 text-sm px-6 py-2.5',
                (!selectedInvestor || !subject || !body || sending) && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Send size={16} />
              {sending ? (locale === 'en' ? 'Sending...' : 'Gönderiliyor...') : sent ? (<><CheckCircle size={16} /> {locale === 'en' ? 'Sent!' : 'Gönderildi!'}</>) : (locale === 'en' ? 'Send' : 'Gönder')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
