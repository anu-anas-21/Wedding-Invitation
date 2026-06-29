-- =============================================================================
-- Musfi Wedding — full database setup (paste into Supabase SQL Editor)
-- Dashboard → SQL Editor → New query → Run
-- =============================================================================

-- Fresh table (safe if you have not created anything yet)
drop table if exists rsvps;

create table rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  attendance text not null check (attendance in ('Will come', 'Will not come'))
);

-- Row-level security
alter table rsvps enable row level security;

-- Admin (logged-in) can read all RSVPs
create policy "admin read"
  on rsvps
  for select
  using (auth.role() = 'authenticated');

-- Public site can submit RSVP (insert only)
create policy "public insert"
  on rsvps
  for insert
  with check (true);

-- Optional: index for admin dashboard sorting
create index rsvps_created_at_idx on rsvps (created_at desc);
