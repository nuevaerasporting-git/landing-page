-- Sponsors shown in the public landing and managed from the admin panel.
-- Public reads go through public_sponsors; writes use the service role on the server.

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 80),
  logo_path text not null check (
    logo_path ~ '^sponsors/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp|avif)$'
  ),
  logo_alt text not null check (char_length(trim(logo_alt)) between 1 and 120),
  website_url text check (
    website_url is null or website_url ~ '^https?://'
  ),
  sort_order integer not null default 0 check (sort_order between 0 and 9999),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists sponsors_name_key
  on public.sponsors (lower(trim(name)));

create index if not exists sponsors_active_order_idx
  on public.sponsors (is_active, sort_order, name);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists sponsors_set_updated_at on public.sponsors;
create trigger sponsors_set_updated_at
  before update on public.sponsors
  for each row execute function public.set_updated_at();

alter table public.sponsors enable row level security;
revoke all on table public.sponsors from anon, authenticated;
grant all on table public.sponsors to service_role;

create or replace view public.public_sponsors
with (security_barrier = true) as
select id, name, logo_path, logo_alt, website_url, sort_order
from public.sponsors
where is_active = true;

revoke all on table public.public_sponsors from public, anon, authenticated;
grant select on table public.public_sponsors to anon;
