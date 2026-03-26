import type { PlanLimits } from './types';

// ===== PLAN CONFIGURATION =====
export const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    viewableInvestors: 10,
    listAdditions: 5,
    emailsPerDay: 0,
    csvExport: false,
    aiEmail: false,
  },
  starter: {
    viewableInvestors: 'unlimited',
    listAdditions: 50,
    emailsPerDay: 10,
    csvExport: false,
    aiEmail: false,
  },
  pro: {
    viewableInvestors: 'unlimited',
    listAdditions: 'unlimited',
    emailsPerDay: 30,
    csvExport: true,
    aiEmail: true,
  },
};

// ===== PRICING =====
export const PRICING = {
  starter: { monthly: 29, currency: 'USD' },
  pro: { monthly: 59, yearly: 499, currency: 'USD' },
};

// ===== SECTORS =====
export const SECTORS = [
  { value: 'saas', labelTr: 'SaaS', labelEn: 'SaaS' },
  { value: 'fintech', labelTr: 'Fintech', labelEn: 'Fintech' },
  { value: 'ai', labelTr: 'Yapay Zeka', labelEn: 'AI' },
  { value: 'gaming', labelTr: 'Oyun', labelEn: 'Gaming' },
  { value: 'health', labelTr: 'Sağlık', labelEn: 'Health' },
  { value: 'ecommerce', labelTr: 'E-ticaret', labelEn: 'E-commerce' },
  { value: 'edtech', labelTr: 'Eğitim Teknolojisi', labelEn: 'EdTech' },
  { value: 'deeptech', labelTr: 'Derin Teknoloji', labelEn: 'Deep Tech' },
  { value: 'marketplace', labelTr: 'Pazar Yeri', labelEn: 'Marketplace' },
  { value: 'logistics', labelTr: 'Lojistik', labelEn: 'Logistics' },
  { value: 'food', labelTr: 'Yemek', labelEn: 'Food' },
  { value: 'travel', labelTr: 'Seyahat', labelEn: 'Travel' },
  { value: 'social', labelTr: 'Sosyal Medya', labelEn: 'Social' },
  { value: 'other', labelTr: 'Diğer', labelEn: 'Other' },
] as const;

// ===== INVESTOR TYPES =====
export const INVESTOR_TYPES = [
  { value: 'angel', labelTr: 'Melek Yatırımcı', labelEn: 'Angel Investor' },
  { value: 'vc', labelTr: 'Girişim Sermayesi', labelEn: 'Venture Capital' },
  { value: 'family_office', labelTr: 'Aile Ofisi', labelEn: 'Family Office' },
  { value: 'pe', labelTr: 'Özel Sermaye', labelEn: 'Private Equity' },
] as const;

// ===== STAGES =====
export const INVESTMENT_STAGES = [
  { value: 'pre_seed', labelTr: 'Pre-Seed', labelEn: 'Pre-Seed' },
  { value: 'seed', labelTr: 'Tohum', labelEn: 'Seed' },
  { value: 'series_a', labelTr: 'Seri A', labelEn: 'Series A' },
  { value: 'series_b', labelTr: 'Seri B', labelEn: 'Series B' },
] as const;

// ===== LOCATIONS =====
export const LOCATIONS = [
  { value: 'istanbul', labelTr: 'İstanbul', labelEn: 'Istanbul' },
  { value: 'ankara', labelTr: 'Ankara', labelEn: 'Ankara' },
  { value: 'izmir', labelTr: 'İzmir', labelEn: 'Izmir' },
  { value: 'other', labelTr: 'Diğer', labelEn: 'Other' },
] as const;

// ===== CRM STAGES =====
export const CRM_STAGES = [
  { value: 'new', labelTr: 'Yeni', labelEn: 'New', color: '#3B82F6' },
  { value: 'contacted', labelTr: 'İletişime Geçildi', labelEn: 'Contacted', color: '#F59E0B' },
  { value: 'replied', labelTr: 'Yanıt Verdi', labelEn: 'Replied', color: '#22C55E' },
  { value: 'meeting', labelTr: 'Görüşme', labelEn: 'Meeting', color: '#8B5CF6' },
  { value: 'closed', labelTr: 'Kapandı', labelEn: 'Closed', color: '#C9A84C' },
] as const;
