// ===== USER =====
export interface User {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  website?: string;
  stripe_customer_id?: string;
  plan: 'free' | 'starter' | 'pro';
  plan_expires_at?: string;
  locale: 'tr' | 'en';
  created_at: string;
}

// ===== INVESTOR =====
export type InvestorType = 'angel' | 'vc' | 'family_office' | 'pe';
export type InvestmentStage = 'pre_seed' | 'seed' | 'series_a' | 'series_b';
export type Sector =
  | 'saas' | 'fintech' | 'ai' | 'gaming' | 'health'
  | 'ecommerce' | 'edtech' | 'deeptech' | 'marketplace'
  | 'logistics' | 'food' | 'travel' | 'social' | 'other';

export interface Investor {
  id: string;
  name: string;
  title?: string;
  company?: string;
  email?: string;
  email_verified: boolean;
  linkedin_url?: string;
  website?: string;
  location_city?: string;
  location_country: string;
  investor_type: InvestorType[];
  sectors: Sector[];
  stages: InvestmentStage[];
  min_ticket?: number;
  max_ticket?: number;
  portfolio?: string[];
  bio?: string;
  locale: 'tr' | 'en';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ===== CRM =====
export type CRMStage = 'new' | 'contacted' | 'replied' | 'meeting' | 'closed';

export interface InvestorListItem {
  id: string;
  user_id: string;
  investor_id: string;
  investor?: Investor; // joined data
  crm_stage: CRMStage;
  notes?: string;
  added_at: string;
  last_contacted?: string;
}

// ===== EMAIL =====
export type EmailStatus = 'sent' | 'delivered' | 'opened' | 'replied';
export type EmailDirection = 'outbound' | 'inbound';

export interface EmailThread {
  id: string;
  user_id: string;
  investor_id: string;
  investor?: Investor; // joined data
  subject: string;
  status: EmailStatus;
  reply_to_address: string;
  sent_at?: string;
  replied_at?: string;
  created_at: string;
  messages?: EmailMessage[];
}

export interface EmailMessage {
  id: string;
  thread_id: string;
  direction: EmailDirection;
  body: string;
  sent_at: string;
}

// ===== SUBSCRIPTION =====
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due';

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  plan: 'starter' | 'pro';
  status: SubscriptionStatus;
  current_period_end: string;
  created_at: string;
}

// ===== PLAN LIMITS =====
export interface PlanLimits {
  viewableInvestors: number | 'unlimited';
  listAdditions: number | 'unlimited';
  emailsPerDay: number;
  csvExport: boolean;
  aiEmail: boolean;
}
