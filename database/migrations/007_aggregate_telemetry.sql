CREATE TABLE IF NOT EXISTS lunar_tool_funnel_metrics (
  day date NOT NULL DEFAULT CURRENT_DATE,
  tool_id text NOT NULL,
  step text NOT NULL CHECK (step IN ('view', 'start', 'complete', 'export', 'error')),
  count bigint NOT NULL DEFAULT 1,
  PRIMARY KEY (day, tool_id, step)
);

CREATE TABLE IF NOT EXISTS lunar_tool_feedback (
  day date NOT NULL DEFAULT CURRENT_DATE,
  tool_id text NOT NULL,
  helpful_count integer NOT NULL DEFAULT 0,
  unhelpful_count integer NOT NULL DEFAULT 0,
  PRIMARY KEY (day, tool_id)
);

ALTER TABLE lunar_tool_funnel_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE lunar_tool_feedback ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON lunar_tool_funnel_metrics, lunar_tool_feedback FROM PUBLIC;

DO $$ DECLARE role_name text; BEGIN FOREACH role_name IN ARRAY ARRAY['anon','authenticated'] LOOP
  IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname=role_name) THEN
    EXECUTE format('REVOKE ALL ON lunar_tool_funnel_metrics, lunar_tool_feedback FROM %I', role_name);
  END IF; END LOOP; END $$;

INSERT INTO lunar_schema_migrations(version) VALUES(7) ON CONFLICT(version) DO NOTHING;
