import { FormEvent, useState } from 'react';
import { requestOtp, verifyOtp, loginWithPassword } from '@/services/auth';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Login() {
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL ?? '';
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [targetEmail, setTargetEmail] = useState<string | null>(adminEmail || null);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const infoText = message ?? (step === 'verify' && loginMethod === 'otp' && targetEmail ? `OTP sent to ${targetEmail}. Please check your inbox.` : null);

  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await requestOtp();
      if (res.success) {
        setStep('verify');
        const resolvedEmail = res.data?.email || adminEmail || null;
        setTargetEmail(resolvedEmail);
        setMessage(
          resolvedEmail
            ? `OTP sent to ${resolvedEmail}. Please check your inbox.`
            : 'OTP sent. Please check your inbox.'
        );
      } else {
        setMessage(res.message || 'Failed to send OTP');
        setTargetEmail(null);
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || err?.message || 'Failed to send OTP');
      setTargetEmail(null);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await verifyOtp(code);
      if (res.success && res.data?.token) {
        localStorage.setItem('admin_token', res.data.token);
        const to = location.state?.from?.pathname || '/careers';
        navigate(to, { replace: true });
      } else {
        setMessage(res.message || 'Invalid code');
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || err?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      // Use configured email if targetEmail is not set (though for password login we might want an input field, 
      // but based on design usually admin email is fixed or user inputs it. 
      // The provided design shows Email input. I will add it.)
      const emailToUse = targetEmail || adminEmail;
      const res = await loginWithPassword(password, emailToUse);
      if (res.success && res.data?.token) {
        localStorage.setItem('admin_token', res.data.token);
        const to = location.state?.from?.pathname || '/careers';
        navigate(to, { replace: true });
      } else {
        setMessage(res.message || 'Invalid credentials');
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '80px auto', padding: 24, border: '1px solid #e5e7eb', borderRadius: 8 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Inspectors Admin Login</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, borderBottom: '1px solid #e5e7eb', paddingBottom: 12 }}>
        <button
          onClick={() => { setLoginMethod('password'); setMessage(null); }}
          style={{
            flex: 1,
            padding: '8px 16px',
            background: loginMethod === 'password' ? '#111827' : 'transparent',
            color: loginMethod === 'password' ? 'white' : '#374151',
            borderRadius: 6,
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          Email & Password
        </button>
        <button
          onClick={() => { setLoginMethod('otp'); setMessage(null); setStep('request'); }}
          style={{
            flex: 1,
            padding: '8px 16px',
            background: loginMethod === 'otp' ? '#111827' : 'transparent',
            color: loginMethod === 'otp' ? 'white' : '#374151',
            borderRadius: 6,
            border: loginMethod === 'otp' ? 'none' : '1px solid #e5e7eb',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer'
          }}
        >
          OTP Login
        </button>
      </div>

      {infoText && <div style={{ marginBottom: 12, color: '#111827' }}>{infoText}</div>}

      {loginMethod === 'password' && (
        <form onSubmit={handlePasswordLogin}>
          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 }}>Email</label>
          <input
            value={targetEmail || ''}
            onChange={(e) => setTargetEmail(e.target.value)}
            required
            type="email"
            placeholder="admin@inspectors.com"
            style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 16 }}
          />

          <label style={{ display: 'block', marginBottom: 6, fontWeight: 500, fontSize: 14 }}>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
            style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 24 }}
          />

          <button disabled={loading} type="submit" style={{ width: '100%', padding: 12, background: '#111827', color: 'white', borderRadius: 6, fontWeight: 600 }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      )}

      {loginMethod === 'otp' && (
        <>
          {step === 'request' ? (
            <form onSubmit={handleRequestOtp}>
              <button disabled={loading} type="submit" style={{ width: '100%', padding: 12, background: '#111827', color: 'white', borderRadius: 6, fontWeight: 600 }}>
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <label style={{ display: 'block', marginBottom: 8 }}>Enter OTP</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="6-digit code"
                style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 12 }}
              />
              <button disabled={loading} type="submit" style={{ width: '100%', padding: 12, background: '#111827', color: 'white', borderRadius: 6, fontWeight: 600 }}>
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
              <button type="button" onClick={() => setStep('request')} style={{ width: '100%', padding: 10, background: 'transparent', color: '#111827', borderRadius: 6, marginTop: 8, border: '1px solid #d1d5db' }}>
                Resend OTP
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
