create extension if not exists pgcrypto;

create table if not exists public.regions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  country_code text not null default 'NL' check (country_code = 'NL'),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.facilities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  source_key text
);

create table if not exists public.parks (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  location_name text not null,
  region_id uuid not null references public.regions(id),
  country_code text not null default 'NL' check (country_code = 'NL'),
  description text,
  highlights jsonb not null default '[]'::jsonb,
  visual_placeholder_key text,
  source_url text not null,
  landal_park_code text,
  last_imported_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.park_facilities (
  park_id uuid not null references public.parks(id) on delete cascade,
  facility_id uuid not null references public.facilities(id) on delete cascade,
  primary key (park_id, facility_id)
);

create table if not exists public.price_snapshots (
  id uuid primary key default gen_random_uuid(),
  park_id uuid not null references public.parks(id) on delete cascade,
  arrival_date date not null,
  departure_date date not null,
  adult_count integer not null check (adult_count >= 1),
  child_count integer not null default 0 check (child_count >= 0),
  currency text not null default 'EUR' check (currency = 'EUR'),
  price_amount numeric(10, 2) check (price_amount >= 0),
  price_label text,
  source_captured_at timestamptz not null,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  check (departure_date > arrival_date)
);

create table if not exists public.affiliate_link_templates (
  id uuid primary key default gen_random_uuid(),
  park_id uuid not null references public.parks(id) on delete cascade,
  base_url text not null,
  tracking_template text,
  status text not null default 'placeholder' check (status in ('placeholder', 'active', 'disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.outbound_clicks (
  id uuid primary key default gen_random_uuid(),
  park_id uuid not null references public.parks(id) on delete cascade,
  destination_url_key text not null,
  page_path text not null,
  consent_state text not null check (consent_state in ('unknown', 'accepted', 'rejected')),
  tracking_scope text not null check (tracking_scope in ('anonymous_functional', 'full_consent')),
  utm_context jsonb not null default '{}'::jsonb,
  clicked_at timestamptz not null default now()
);

create table if not exists public.import_runs (
  id uuid primary key default gen_random_uuid(),
  source_type text not null check (source_type in ('api_feed', 'scraper', 'mock')),
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null check (status in ('pending', 'running', 'success', 'failed', 'blocked')),
  message text,
  records_imported integer not null default 0 check (records_imported >= 0)
);

create table if not exists public.scraping_compliance_reviews (
  id uuid primary key default gen_random_uuid(),
  target_domain text not null,
  robots_checked_at timestamptz,
  terms_checked_at timestamptz,
  rate_limit_policy text,
  approved_for_run boolean not null default false,
  approved_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists parks_region_id_idx on public.parks(region_id);
create index if not exists parks_country_code_idx on public.parks(country_code);
create index if not exists park_facilities_facility_id_idx on public.park_facilities(facility_id);
create index if not exists price_snapshots_lookup_idx on public.price_snapshots(park_id, arrival_date, departure_date, adult_count, child_count);
create index if not exists price_snapshots_source_captured_at_idx on public.price_snapshots(source_captured_at desc);
create index if not exists outbound_clicks_clicked_at_idx on public.outbound_clicks(clicked_at desc);
create index if not exists import_runs_started_at_idx on public.import_runs(started_at desc);
create index if not exists scraping_compliance_reviews_target_domain_idx on public.scraping_compliance_reviews(target_domain);

alter table public.regions enable row level security;
alter table public.facilities enable row level security;
alter table public.parks enable row level security;
alter table public.park_facilities enable row level security;
alter table public.price_snapshots enable row level security;
alter table public.affiliate_link_templates enable row level security;
alter table public.outbound_clicks enable row level security;
alter table public.import_runs enable row level security;
alter table public.scraping_compliance_reviews enable row level security;
