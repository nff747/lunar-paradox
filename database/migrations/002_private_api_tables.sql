-- All access to these records goes through the authenticated/validated API.
-- Supabase's public API must not expose application PII, access hashes or drafts.
DO $$
DECLARE
  table_name text;
  role_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'lunar_schema_migrations', 'lunar_applications', 'lunar_pricing',
    'lunar_estimates', 'lunar_company_content', 'lunar_briefs', 'lunar_api_limits',
    'lunar_sessions', 'lunar_settings'
  ] LOOP
    IF to_regclass('public.' || table_name) IS NULL THEN CONTINUE; END IF;
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', table_name);
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM PUBLIC', table_name);
    FOREACH role_name IN ARRAY ARRAY['anon', 'authenticated'] LOOP
      IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = role_name) THEN
        EXECUTE format('REVOKE ALL ON TABLE public.%I FROM %I', table_name, role_name);
      END IF;
    END LOOP;
  END LOOP;
END $$;

INSERT INTO lunar_schema_migrations (version) VALUES (2)
ON CONFLICT (version) DO NOTHING;
