/** Builds an .ics file for the wedding — opens in Apple Calendar, Google Calendar, Outlook, etc. */
export function buildWeddingIcs(): string {
  const uid = 'musfi-wedding-20260723@musfi-wedding';
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Musfi Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    'DTSTART;VALUE=DATE:20260723',
    'DTEND;VALUE=DATE:20260724',
    'SUMMARY:Musfir & Fasna · Fasil & Rinshana — Wedding',
    'DESCRIPTION:Double wedding celebration of Musfir & Fasna and Fasil & Rinshana. Thursday\\, 23 July 2026.',
    'LOCATION:Al Jazeera Convention Centre\\, Kerala\\, India',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return `${lines.join('\r\n')}\r\n`;
}
