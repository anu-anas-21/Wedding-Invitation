import { NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';
import {
  COUPLE_OPTIONS,
  ATTENDANCE_OPTIONS,
  type CoupleOption,
  type AttendanceOption,
  type RsvpFormPayload,
} from '@/lib/types';

function isCouple(value: string): value is CoupleOption {
  return (COUPLE_OPTIONS as readonly string[]).includes(value);
}

function isAttendance(value: string): value is AttendanceOption {
  return (ATTENDANCE_OPTIONS as readonly string[]).includes(value);
}

function validateBody(body: unknown): { data: RsvpFormPayload } | { error: string } {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid request body.' };
  }

  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  const contact = typeof raw.contact === 'string' ? raw.contact.trim() : '';
  const couple = typeof raw.couple === 'string' ? raw.couple : '';
  const attendance = typeof raw.attendance === 'string' ? raw.attendance : '';
  const guest_count =
    typeof raw.guest_count === 'string' ? raw.guest_count : String(raw.guest_count ?? '0');
  const wishes = typeof raw.wishes === 'string' ? raw.wishes.trim() : undefined;

  if (!name) return { error: 'Name is required.' };
  if (!contact) return { error: 'Contact is required.' };
  if (!isCouple(couple)) return { error: 'Please select a valid wedding option.' };
  if (!isAttendance(attendance)) return { error: 'Please select a valid attendance option.' };

  return {
    data: {
      name,
      contact,
      couple,
      attendance,
      guest_count,
      wishes: wishes || undefined,
    },
  };
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
      .insert({
        name: result.data.name,
        contact: result.data.contact,
        couple: result.data.couple,
        attendance: result.data.attendance,
        guest_count: result.data.guest_count,
        wishes: result.data.wishes ?? null,
      })
      .select('id')
      .single();

    if (error || !data) {
      console.error('RSVP insert failed:', error?.message);
      return NextResponse.json(
        { error: 'Unable to save your RSVP. Please try again later.' },
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
