CREATE TABLE public.private_access_grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  user_id uuid UNIQUE,
  active boolean NOT NULL DEFAULT true,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT private_access_grants_email_format CHECK (email = lower(email) AND position('@' IN email) > 1)
);
GRANT ALL ON public.private_access_grants TO service_role;
ALTER TABLE public.private_access_grants ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.private_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  provider text NOT NULL,
  external_url text NOT NULL,
  title_en text NOT NULL,
  title_es text NOT NULL,
  description_en text NOT NULL DEFAULT '',
  description_es text NOT NULL DEFAULT '',
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT private_documents_category_allowed CHECK (category IN ('professional', 'academic', 'work_samples', 'restricted_projects')),
  CONSTRAINT private_documents_provider_allowed CHECK (provider IN ('onedrive', 'google_drive')),
  CONSTRAINT private_documents_https_only CHECK (external_url LIKE 'https://%')
);
GRANT ALL ON public.private_documents TO service_role;
ALTER TABLE public.private_documents ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.private_download_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text NOT NULL UNIQUE,
  user_id uuid NOT NULL,
  document_id uuid NOT NULL REFERENCES public.private_documents(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.private_download_tickets TO service_role;
ALTER TABLE public.private_download_tickets ENABLE ROW LEVEL SECURITY;

CREATE INDEX private_download_tickets_expiry_idx ON public.private_download_tickets (expires_at);
CREATE INDEX private_documents_category_order_idx ON public.private_documents (category, sort_order);