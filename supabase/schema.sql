-- ========================================================
-- SPEAKORY DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ========================================================

-- 1. Create the 'leads' table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL CHECK (type IN ('trial', 'contact')),
    parent_name TEXT NOT NULL,
    student_name TEXT,
    age_group TEXT,
    phone TEXT NOT NULL,
    email TEXT,
    goal TEXT,
    preferred_day TEXT,
    preferred_time TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for ordering by creation time (newest first)
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_type_idx ON public.leads (type);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policy: Public visitors (anon) can ONLY INSERT leads
-- Public visitors CANNOT read, update, or delete leads.
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
CREATE POLICY "Public can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 4. RLS Policy: Authenticated admin users can READ all leads
DROP POLICY IF EXISTS "Authenticated users can select leads" ON public.leads;
CREATE POLICY "Authenticated users can select leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- 5. RLS Policy: Authenticated admin users can UPDATE leads (status, notes)
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;
CREATE POLICY "Authenticated users can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 6. Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ========================================================
-- HOW TO CREATE YOUR FIRST ADMIN USER IN SUPABASE:
-- 1. Open your Supabase Dashboard
-- 2. Go to Authentication -> Users
-- 3. Click "Add user" -> "Create user"
-- 4. Enter your admin email and a strong password
-- 5. Use these credentials to log in at /admin/login
-- ========================================================
