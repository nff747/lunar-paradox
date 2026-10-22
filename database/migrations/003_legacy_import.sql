-- The migration runner imports preserved legacy rows immediately before this
-- marker in the same transaction. The marker prevents deleted rows from being
-- resurrected by later migration runs. Original tables remain privately archived.
INSERT INTO lunar_schema_migrations(version) VALUES(3)
ON CONFLICT(version) DO NOTHING;
