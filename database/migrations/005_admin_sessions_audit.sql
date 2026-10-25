CREATE TABLE IF NOT EXISTS lunar_admin_sessions (
 session_hash char(64) PRIMARY KEY, csrf_hash char(64) NOT NULL,
 principal text NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
 expires_at timestamptz NOT NULL, last_seen_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS lunar_admin_audit (
 id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 created_at timestamptz NOT NULL DEFAULT now(), principal text NOT NULL,
 action text NOT NULL, target text NOT NULL DEFAULT '', outcome text NOT NULL
);
ALTER TABLE lunar_admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lunar_admin_audit ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON lunar_admin_sessions,lunar_admin_audit FROM PUBLIC;
DO $$ DECLARE role_name text; BEGIN FOREACH role_name IN ARRAY ARRAY['anon','authenticated'] LOOP
 IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname=role_name) THEN
 EXECUTE format('REVOKE ALL ON lunar_admin_sessions,lunar_admin_audit FROM %I',role_name);
 END IF; END LOOP; END $$;
INSERT INTO lunar_schema_migrations(version) VALUES(5) ON CONFLICT(version) DO NOTHING;
