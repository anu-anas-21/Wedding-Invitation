update rsvps set attendance = 'Will Attend' where attendance = 'Attending';
update rsvps set attendance = 'Unable to Attend' where attendance = 'Not Attending';

alter table rsvps drop constraint if exists rsvps_attendance_check;

alter table rsvps add constraint rsvps_attendance_check
  check (attendance in ('Will Attend', 'Unable to Attend'));
