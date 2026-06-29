import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';

export const ADMIN_COOKIE_NAME = 'admin-auth';

export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();
  return { email, password };
}

export function isValidAdminCredentials(email?: string | null, password?: string | null) {
  const expected = getAdminCredentials();
  return Boolean(
    expected.email &&
      expected.password &&
      email?.trim() === expected.email &&
      password === expected.password,
  );
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === 'true';
}

export function isAdminAuthenticatedFromRequest(request: NextRequest) {
  return request.cookies.get(ADMIN_COOKIE_NAME)?.value === 'true';
}
