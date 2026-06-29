create table rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  contact text not null,
  couple text not null check (couple in ('Musfir & Fasna', 'Fasil & Fathima', 'Both Couples')),
  attendance text not null check (attendance in ('Attending', 'Not Attending')),
  guest_count text not null default '0',
  wishes text,
  notified boolean default false
);

-- enable row-level security
alter table rsvps enable row level security;

-- only authenticated users (admin) can read all rows
create policy "admin read" on rsvps for select using (auth.role() = 'authenticated');

-- anyone can insert (the public RSVP form)
create policy "public insert" on rsvps for insert with check (true);
