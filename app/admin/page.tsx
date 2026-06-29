import { redirect } from 'next/navigation';
import AdminTable from '@/components/AdminTable';
import AdminLogoutButton from '@/components/AdminLogoutButton';
import type { RsvpRow } from '@/lib/types';
import { isAdminAuthenticated } from '@/lib/admin-auth';

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect('/admin/login');
  }

  let rows: RsvpRow[] = [];

  try {
    const { createServiceClient } = await import('@/lib/supabase/server');
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch RSVPs:', error.message);
    } else {
      rows = (data ?? []) as RsvpRow[];
    }
  } catch (error) {
    console.warn('Supabase admin data is unavailable:', error);
  }

  return (
    <div className="admin-page">
      <div className="container">
        <header className="admin-header">
          <h1 className="admin-title">RSVP Dashboard</h1>
          <AdminLogoutButton />
        </header>
        <AdminTable rows={rows} />
      </div>
    </div>
  );
}
