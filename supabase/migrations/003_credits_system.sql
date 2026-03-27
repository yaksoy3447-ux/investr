-- Migration 003: Implementing the Credit & Reveal System

-- 1) Add 'credits' column to 'users' table
ALTER TABLE users ADD COLUMN credits INTEGER DEFAULT 0 NOT NULL;

-- 2) Create the 'unlocked_investors' table to track which user has revealed which investor
CREATE TABLE IF NOT EXISTS unlocked_investors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    investor_id UUID REFERENCES investors(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, investor_id)
);

-- 3) Enable RLS for unlocked_investors
ALTER TABLE unlocked_investors ENABLE ROW LEVEL SECURITY;

-- 4) Policies for unlocked_investors
-- Users can see their own unlocked investors
CREATE POLICY "Users can view their own unlocked investors"
    ON unlocked_investors FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own reveals (if they have credits, enforced via backend or DB trigger)
CREATE POLICY "Users can insert an unlocked investor"
    ON unlocked_investors FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- 5) Set starting credits for FREE sign-ups (Optional, let's say 3 free credits to test)
-- We can add a trigger on NEW user creation later, or do it from JS backend.
