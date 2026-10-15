-- ============================================================================
-- LUNAR PARADOX — SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- 1. Inquiries Table (Client Commission & Lead Intake)
CREATE TABLE IF NOT EXISTS public.lunar_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wire_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL DEFAULT 'Anonymous Operative',
    contact VARCHAR(255) NOT NULL,
    sector VARCHAR(128) NOT NULL DEFAULT 'General Inquiry',
    budget VARCHAR(64) NOT NULL DEFAULT 'Undisclosed',
    scope TEXT DEFAULT '',
    status VARCHAR(64) NOT NULL DEFAULT 'Received - Cryptographically Logged',
    discord_notified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for rapid wire lookups
CREATE INDEX IF NOT EXISTS idx_lunar_inquiries_wire_id ON public.lunar_inquiries (wire_id);
CREATE INDEX IF NOT EXISTS idx_lunar_inquiries_created_at ON public.lunar_inquiries (created_at DESC);

-- 2. Passcodes Table (VIP & Early-Access Authentication)
CREATE TABLE IF NOT EXISTS public.lunar_passcodes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(64) UNIQUE NOT NULL,
    tier VARCHAR(128) NOT NULL,
    allowed_sectors TEXT[] NOT NULL DEFAULT ARRAY['studio', 'forge', 'labs', 'vault'],
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    max_uses INT DEFAULT 500,
    current_uses INT DEFAULT 0,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Seed Initial Passcodes
INSERT INTO public.lunar_passcodes (code, tier, allowed_sectors, is_active, max_uses)
VALUES 
    ('GENESIS-2026', 'Genesis Founding Member', ARRAY['studio', 'forge', 'labs', 'vault'], true, 100),
    ('PARADOX-VIP', 'VIP Partner', ARRAY['studio', 'forge', 'labs', 'vault'], true, 250),
    ('STUDIO-DIRECT', 'Enterprise Studio Client', ARRAY['studio', 'vault'], true, 50),
    ('FORGE-OPEN', 'Developer Vanguard', ARRAY['forge', 'docs'], true, 1000),
    ('LABS-RESEARCH', 'Frontier AI Beta Tester', ARRAY['labs', 'docs'], true, 500)
ON CONFLICT (code) DO NOTHING;

-- 3. Telemetry Table (Audit & Diagnostic Events)
CREATE TABLE IF NOT EXISTS public.lunar_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(64) NOT NULL,
    session_token VARCHAR(128),
    payload JSONB DEFAULT '{}'::jsonb,
    user_agent TEXT,
    ip_country VARCHAR(16),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Passcode Usage Atomic Increment RPC
CREATE OR REPLACE FUNCTION public.increment_passcode_usage(code_input TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE public.lunar_passcodes
    SET current_uses = current_uses + 1
    WHERE code = UPPER(TRIM(code_input)) AND is_active = TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.lunar_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lunar_passcodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lunar_telemetry ENABLE ROW LEVEL SECURITY;

-- lunar_inquiries: Public Anon can INSERT leads; only Authenticated can SELECT
CREATE POLICY "Allow public anon inserts on inquiries"
ON public.lunar_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Allow authenticated read on inquiries"
ON public.lunar_inquiries FOR SELECT
TO authenticated
USING (true);

-- lunar_passcodes: Public Anon can SELECT active codes
CREATE POLICY "Allow public anon read active passcodes"
ON public.lunar_passcodes FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- lunar_telemetry: Public Anon can INSERT telemetry
CREATE POLICY "Allow public anon insert telemetry"
ON public.lunar_telemetry FOR INSERT
TO anon, authenticated
WITH CHECK (true);
