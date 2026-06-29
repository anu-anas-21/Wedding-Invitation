import { buildWeddingIcs } from '@/lib/calendar';

export async function GET() {
  const ics = buildWeddingIcs();

  return new Response(ics, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="musfi-wedding-save-the-date.ics"',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
