export const COUPLE_OPTIONS = [
  'Musfir & Fasna',
  'Fasil & Rinshana',
  'Both Couples',
] as const;

export const ATTENDANCE_OPTIONS = ['Will Attend', 'Unable to Attend'] as const;

export type CoupleOption = (typeof COUPLE_OPTIONS)[number];
export type AttendanceOption = (typeof ATTENDANCE_OPTIONS)[number];

export interface RsvpRow {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  couple: CoupleOption;
  attendance: AttendanceOption;
  guest_count: string;
  wishes: string | null;
  notified: boolean;
}

export interface RsvpFormPayload {
  name: string;
  contact: string;
  couple: CoupleOption;
  attendance: AttendanceOption;
  guest_count: string;
  wishes?: string;
}

export interface RsvpApiSuccess {
  success: true;
  id: string;
}

export interface RsvpApiError {
  error: string;
}
