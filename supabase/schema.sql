-- =============================================
-- INVESTR — Supabase Database Schema
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PROFILES (extends auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  website TEXT,
  bio TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro')),
  plan_period TEXT DEFAULT 'monthly' CHECK (plan_period IN ('monthly', 'yearly')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  locale TEXT DEFAULT 'tr' CHECK (locale IN ('tr', 'en')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, company_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'company_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- 2. INVESTORS
-- =============================================
CREATE TABLE IF NOT EXISTS public.investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  title TEXT,
  company TEXT,
  email TEXT,
  email_verified BOOLEAN DEFAULT FALSE,
  linkedin_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  location_city TEXT,
  location_country TEXT DEFAULT 'TR',
  investor_type TEXT[] DEFAULT '{}',
  sectors TEXT[] DEFAULT '{}',
  stages TEXT[] DEFAULT '{}',
  min_ticket INTEGER,
  max_ticket INTEGER,
  portfolio TEXT[] DEFAULT '{}',
  bio TEXT,
  photo_url TEXT,
  locale TEXT DEFAULT 'tr',
  is_active BOOLEAN DEFAULT TRUE,
  -- Opt-out system (GDPR)
  opted_out BOOLEAN DEFAULT FALSE,
  opted_out_at TIMESTAMPTZ,
  opted_out_token TEXT UNIQUE DEFAULT uuid_generate_v4()::TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast filtering
CREATE INDEX IF NOT EXISTS idx_investors_type ON public.investors USING GIN (investor_type);
CREATE INDEX IF NOT EXISTS idx_investors_sectors ON public.investors USING GIN (sectors);
CREATE INDEX IF NOT EXISTS idx_investors_stages ON public.investors USING GIN (stages);
CREATE INDEX IF NOT EXISTS idx_investors_city ON public.investors (location_city);
CREATE INDEX IF NOT EXISTS idx_investors_active ON public.investors (is_active);

-- =============================================
-- 3. INVESTOR LIST (user's saved investors + CRM)
-- =============================================
CREATE TABLE IF NOT EXISTS public.investor_list (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  crm_stage TEXT DEFAULT 'new' CHECK (crm_stage IN ('new', 'contacted', 'replied', 'meeting', 'closed')),
  notes TEXT,
  last_contacted TIMESTAMPTZ,
  added_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, investor_id)
);

CREATE INDEX IF NOT EXISTS idx_investor_list_user ON public.investor_list (user_id);
CREATE INDEX IF NOT EXISTS idx_investor_list_stage ON public.investor_list (crm_stage);

-- =============================================
-- 4. EMAILS (outreach tracking)
-- =============================================
CREATE TABLE IF NOT EXISTS public.emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('draft', 'sent', 'delivered', 'opened', 'replied', 'bounced')),
  resend_id TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  opened_at TIMESTAMPTZ,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_emails_user ON public.emails (user_id);
CREATE INDEX IF NOT EXISTS idx_emails_investor ON public.emails (investor_id);
CREATE INDEX IF NOT EXISTS idx_emails_status ON public.emails (status);

-- =============================================
-- 5. EMAIL REPLIES (inbox)
-- =============================================
CREATE TABLE IF NOT EXISTS public.email_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_id UUID NOT NULL REFERENCES public.emails(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL REFERENCES public.investors(id) ON DELETE CASCADE,
  from_email TEXT NOT NULL,
  subject TEXT,
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  received_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_replies_user ON public.email_replies (user_id);
CREATE INDEX IF NOT EXISTS idx_email_replies_read ON public.email_replies (is_read);

-- =============================================
-- 6. DAILY EMAIL USAGE (rate limiting)
-- =============================================
CREATE TABLE IF NOT EXISTS public.daily_email_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  count INTEGER DEFAULT 0,
  UNIQUE(user_id, date)
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_email_usage ENABLE ROW LEVEL SECURITY;

-- PROFILES: Users can only read/update their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- INVESTORS: All authenticated users can read investors
CREATE POLICY "Authenticated users can view investors"
  ON public.investors FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

-- INVESTOR LIST: Users can only manage their own list
CREATE POLICY "Users can view own list"
  ON public.investor_list FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to own list"
  ON public.investor_list FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own list"
  ON public.investor_list FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete from own list"
  ON public.investor_list FOR DELETE
  USING (auth.uid() = user_id);

-- EMAILS: Users can only manage their own emails
CREATE POLICY "Users can view own emails"
  ON public.emails FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can send emails"
  ON public.emails FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- EMAIL REPLIES: Users can only view their own replies
CREATE POLICY "Users can view own replies"
  ON public.email_replies FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own replies"
  ON public.email_replies FOR UPDATE
  USING (auth.uid() = user_id);

-- DAILY EMAIL USAGE: Users can manage their own usage
CREATE POLICY "Users can view own usage"
  ON public.daily_email_usage FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own usage"
  ON public.daily_email_usage FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own usage"
  ON public.daily_email_usage FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE OR REPLACE TRIGGER update_investors_updated_at
  BEFORE UPDATE ON public.investors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
