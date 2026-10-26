CREATE TABLE IF NOT EXISTS lunar_operations (
 id uuid PRIMARY KEY, revision integer NOT NULL DEFAULT 0 CHECK(revision>=0),
 document jsonb NOT NULL CHECK(jsonb_typeof(document)='object'),
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lunar_operations_parent ON lunar_operations ((document->>'parentId'));
CREATE TABLE IF NOT EXISTS lunar_product_reviews (
 id uuid PRIMARY KEY, product_id text NOT NULL, author text NOT NULL, email text NOT NULL,
 quote text NOT NULL, version text NOT NULL DEFAULT '', consent boolean NOT NULL CHECK(consent),
 status text NOT NULL DEFAULT 'pending' CHECK(status IN('pending','published','rejected')),
 submission_hash char(64) NOT NULL UNIQUE, created_at timestamptz NOT NULL DEFAULT now(),
 moderated_by text, moderated_at timestamptz
);
CREATE INDEX IF NOT EXISTS lunar_reviews_public ON lunar_product_reviews(product_id,created_at) WHERE status='published';
ALTER TABLE lunar_operations ENABLE ROW LEVEL SECURITY;
ALTER TABLE lunar_product_reviews ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON lunar_operations,lunar_product_reviews FROM PUBLIC;
DO $$ DECLARE role_name text; BEGIN FOREACH role_name IN ARRAY ARRAY['anon','authenticated'] LOOP
 IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname=role_name) THEN
 EXECUTE format('REVOKE ALL ON lunar_operations,lunar_product_reviews FROM %I',role_name);
 END IF; END LOOP; END $$;
INSERT INTO lunar_schema_migrations(version) VALUES(6) ON CONFLICT(version) DO NOTHING;
