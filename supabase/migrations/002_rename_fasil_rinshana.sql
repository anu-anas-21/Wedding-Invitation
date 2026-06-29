-- Rename couple option: Fasil & Fathima → Fasil & Rinshana
update rsvps set couple = 'Fasil & Rinshana' where couple = 'Fasil & Fathima';

alter table rsvps drop constraint if exists rsvps_couple_check;

alter table rsvps add constraint rsvps_couple_check
  check (couple in ('Musfir & Fasna', 'Fasil & Rinshana', 'Both Couples'));
