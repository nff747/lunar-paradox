# Supabase database certificate authority

`supabase-prod-ca-2021.crt` is the public Supabase Root 2021 CA, downloaded over verified HTTPS from:
https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt

The download template is published by Supabase's dashboard source:
https://github.com/supabase/supabase/blob/master/apps/studio/hooks/custom-content/custom-content.json

Supabase SSL guidance:
https://supabase.com/docs/guides/platform/ssl-enforcement

SHA-256 fingerprint: `80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA`

Expires 26 April 2031. This is a public CA certificate, not a password or private key. The connection code uses it only for Supabase hostnames and retains certificate-chain and hostname verification. Do not replace it with a downloaded certificate from an untrusted source or disable `rejectUnauthorized` to hide connection failures.
