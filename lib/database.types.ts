export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rsvps: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          contact: string;
          couple: string;
          attendance: string;
          guest_count: string;
          wishes: string | null;
          notified: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          contact: string;
          couple: string;
          attendance: string;
          guest_count?: string;
          wishes?: string | null;
          notified?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          contact?: string;
          couple?: string;
          attendance?: string;
          guest_count?: string;
          wishes?: string | null;
          notified?: boolean;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
