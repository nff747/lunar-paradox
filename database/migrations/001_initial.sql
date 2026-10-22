CREATE TABLE IF NOT EXISTS lunar_schema_migrations (
  version integer PRIMARY KEY,
  applied_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lunar_applications (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'declined')),
  access_hash char(64) NOT NULL,
  document jsonb NOT NULL,
  note text NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS lunar_applications_created_idx
  ON lunar_applications (created_at DESC);

CREATE TABLE IF NOT EXISTS lunar_pricing (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  document jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS lunar_estimates (
  id uuid PRIMARY KEY,
  application_id uuid NOT NULL REFERENCES lunar_applications(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  document jsonb NOT NULL
);
CREATE INDEX IF NOT EXISTS lunar_estimates_application_idx
  ON lunar_estimates (application_id, created_at DESC);

CREATE TABLE IF NOT EXISTS lunar_company_content (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton),
  revision integer NOT NULL,
  document jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS lunar_briefs (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  document jsonb NOT NULL
);
CREATE INDEX IF NOT EXISTS lunar_briefs_created_idx
  ON lunar_briefs (created_at DESC);

CREATE TABLE IF NOT EXISTS lunar_api_limits (
  route text NOT NULL,
  subject_hash char(64) NOT NULL,
  window_started timestamptz NOT NULL,
  hits integer NOT NULL CHECK (hits > 0),
  PRIMARY KEY (route, subject_hash)
);

INSERT INTO lunar_schema_migrations (version) VALUES (1)
ON CONFLICT (version) DO NOTHING;
