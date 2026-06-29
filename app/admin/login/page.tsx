import AdminLoginForm from '@/components/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <div className="login-page">
      <div className="login-card glass corner-frame">
        <h1 className="login-title">Admin Sign In</h1>
        <AdminLoginForm />
      </div>
    </div>
  );
}
