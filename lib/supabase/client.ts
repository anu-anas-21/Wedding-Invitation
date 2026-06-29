import { createBrowserClient as createBrowserSupabaseClient } from '@supabase/ssr';

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  return url;
}

function getAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
  return key;
}

/** Browser client for admin login (anon key + cookies). */
export function createBrowserClient() {
  return createBrowserSupabaseClient(getSupabaseUrl(), getAnonKey());
}
