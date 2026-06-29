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
          attendance: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          attendance: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          attendance?: string;
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
