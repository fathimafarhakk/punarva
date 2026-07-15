import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import '../styles/admin.css';

export default function AdminLoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('admin-login-body');
    return () => {
      document.body.classList.remove('admin-login-body');
    };
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    
    setError('');
    setLoading(true);

    try {
      // 1. Attempt login via Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (authError) {
        throw authError;
      }

      // Successful Supabase Auth
      sessionStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid Email or Password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/logo.png" alt="PUNARVA Logo" />
        </div>

        <h1>PUNARVA 2K26</h1>
        <h3>Administrator Portal</h3>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        {error && <p id="error" className="error-message">{error}</p>}

        <div className="login-footer">
          <strong>PUNARVA 2K26</strong><br />
          National Service Scheme<br />
          EMEA College of Arts &amp; Science, Kondotty
        </div>
      </div>
    </div>
  );
}
