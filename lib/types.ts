export const ATTENDANCE_OPTIONS = ['Will come', 'Will not come'] as const;

export type AttendanceOption = (typeof ATTENDANCE_OPTIONS)[number];

export interface RsvpRow {
  id: string;
  created_at: string;
  attendance: AttendanceOption;
}

export interface RsvpFormPayload {
  attendance: AttendanceOption;
}

export interface RsvpApiSuccess {
  success: true;
  id: string;
}

export interface RsvpApiError {
  error: string;
}
