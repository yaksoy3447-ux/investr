-- ========================================
-- Investr — Initial Database Schema
-- PRD §6 — Tüm tablolar + RLS
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== 1. USERS =====
CREATE TABLE IF NOT EXISTS users (
  id                  uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id             uuid UNIQUE,                              -- Supabase Auth UID
  email               text UNIQUE NOT NULL,
  full_name           text,
  company_name        text,
  website             text,
  avatar_url          text,
  stripe_customer_id  text,
  plan                text DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro')),
  plan_expires_at     timestamptz,
  locale              text DEFAULT 'tr' CHECK (locale IN ('tr', 'en')),
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- RLS: kullanıcı sadece kendi profilini görebilir/düzenleyebilir
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth_id = auth.uid());


-- ===== 2. INVESTORS =====
CREATE TABLE IF NOT EXISTS investors (
  id               uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             text NOT NULL,
  title            text,
  company          text,
  email            text,                                        -- Gizli, kullanıcıya gösterilmez
  email_verified   boolean DEFAULT false,
  linkedin_url     text,
  website          text,
  location_city    text,
  location_country text DEFAULT 'TR',
  investor_type    text[] DEFAULT '{}',
  sectors          text[] DEFAULT '{}',
  stages           text[] DEFAULT '{}',
  min_ticket       integer,
  max_ticket       integer,
  portfolio        text[] DEFAULT '{}',
  bio              text,
  locale           text DEFAULT 'tr',
  is_active        boolean DEFAULT true,
  created_at       timestamptz DEFAULT now(),
  updated_at       timestamptz DEFAULT now()
);

-- RLS: authenticated kullanıcılar okuyabilir, yazma yok
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view investors"
  ON investors FOR SELECT
  TO authenticated
  USING (true);


-- ===== 3. INVESTOR_LISTS (CRM) =====
CREATE TABLE IF NOT EXISTS investor_lists (
  id              uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         uuid NOT NULL,
  investor_id     uuid REFERENCES investors(id) ON DELETE CASCADE,
  crm_stage       text DEFAULT 'new' CHECK (crm_stage IN ('new', 'contacted', 'replied', 'meeting', 'closed')),
  notes           text,
  added_at        timestamptz DEFAULT now(),
  last_contacted  timestamptz,
  UNIQUE(user_id, investor_id)
);

-- RLS: kullanıcı sadece kendi listesini görebilir
ALTER TABLE investor_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own list"
  ON investor_lists FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert to own list"
  ON investor_lists FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own list"
  ON investor_lists FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete from own list"
  ON investor_lists FOR DELETE
  USING (user_id = auth.uid());


-- ===== 4. EMAIL_THREADS =====
CREATE TABLE IF NOT EXISTS email_threads (
  id                uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           uuid NOT NULL,
  investor_id       uuid REFERENCES investors(id) ON DELETE CASCADE,
  subject           text,
  status            text DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'replied')),
  reply_to_address  text,
  sent_at           timestamptz,
  replied_at        timestamptz,
  created_at        timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE email_threads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own threads"
  ON email_threads FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create threads"
  ON email_threads FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own threads"
  ON email_threads FOR UPDATE
  USING (user_id = auth.uid());


-- ===== 5. EMAIL_MESSAGES =====
CREATE TABLE IF NOT EXISTS email_messages (
  id         uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id  uuid REFERENCES email_threads(id) ON DELETE CASCADE,
  direction  text CHECK (direction IN ('outbound', 'inbound')),
  body       text,
  sent_at    timestamptz DEFAULT now()
);

-- RLS: thread sahibi mesajları görebilir
ALTER TABLE email_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages of own threads"
  ON email_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM email_threads
      WHERE email_threads.id = email_messages.thread_id
      AND email_threads.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to own threads"
  ON email_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM email_threads
      WHERE email_threads.id = email_messages.thread_id
      AND email_threads.user_id = auth.uid()
    )
  );


-- ===== 6. SUBSCRIPTIONS =====
CREATE TABLE IF NOT EXISTS subscriptions (
  id                     uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                uuid NOT NULL,
  stripe_subscription_id text UNIQUE,
  stripe_customer_id     text,
  plan                   text CHECK (plan IN ('starter', 'pro')),
  status                 text CHECK (status IN ('active', 'canceled', 'past_due')),
  current_period_end     timestamptz,
  created_at             timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (user_id = auth.uid());


-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_investors_type ON investors USING GIN (investor_type);
CREATE INDEX IF NOT EXISTS idx_investors_sectors ON investors USING GIN (sectors);
CREATE INDEX IF NOT EXISTS idx_investors_stages ON investors USING GIN (stages);
CREATE INDEX IF NOT EXISTS idx_investors_city ON investors (location_city);
CREATE INDEX IF NOT EXISTS idx_investor_lists_user ON investor_lists (user_id);
CREATE INDEX IF NOT EXISTS idx_email_threads_user ON email_threads (user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions (user_id);
