-- Retrying an interrupted submission must not create another application.
-- Store only a hash of the random request token, never an applicant access key.
ALTER TABLE lunar_applications ADD COLUMN IF NOT EXISTS request_hash char(64);
CREATE UNIQUE INDEX IF NOT EXISTS lunar_applications_request_hash_idx ON lunar_applications(request_hash);
INSERT INTO lunar_schema_migrations(version) VALUES(4) ON CONFLICT(version) DO NOTHING;
