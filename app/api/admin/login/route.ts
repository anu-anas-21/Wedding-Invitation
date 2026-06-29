import { NextResponse } from 'next/server';
import { getAdminCookieOptions, isValidAdminCredentials } from '@/lib/admin-auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!isValidAdminCredentials(email, password)) {
      return NextResponse.json({ success: false, error: 'Invalid email or password.' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin-auth', 'true', getAdminCookieOptions());
    return response;
  } catch {
    return NextResponse.json({ success: false, error: 'Unable to sign in right now.' }, { status: 500 });
  }
}
