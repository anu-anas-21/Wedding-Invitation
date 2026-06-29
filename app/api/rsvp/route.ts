import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import { ATTENDANCE_OPTIONS, type AttendanceOption, type RsvpFormPayload } from '@/lib/types';

function isAttendance(value: string): value is AttendanceOption {
  return (ATTENDANCE_OPTIONS as readonly string[]).includes(value);
}

function validateBody(body: unknown): { data: RsvpFormPayload } | { error: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body.' };
  }

  const raw = body as Record<string, unknown>;
  const attendance = typeof raw.attendance === 'string' ? raw.attendance : '';

  if (!isAttendance(attendance)) {
    return { error: 'Please choose Will come or Will not come.' };
  }

  return { data: { attendance } };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const result = validateBody(body);

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('rsvps')
      .insert({ attendance: result.data.attendance })
      .select('id')
      .single();

    if (error || !data) {
      console.error('RSVP insert failed:', error?.message);
      return NextResponse.json(
        { error: 'Unable to save your response. Please try again later.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request. Please try again.' },
      { status: 400 },
    );
  }
}
