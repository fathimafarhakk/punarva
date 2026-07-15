import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

export default function AdminLoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('admin-login-body');
    return () => {
      document.body.classList.remove('admin-login-body');
    };
  }, []);

  const ADMIN_EMAIL    = 'admin@punarva.com';
  const ADMIN_PASSWORD = 'punarva123';

  const handleSubmit = e => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    if (cleanEmail === ADMIN_EMAIL && cleanPassword === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid Email or Password');
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
              placeholder="Enter admin email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              required
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
            />
          </div>

          <button type="submit" className="login-btn">Login to Dashboard</button>
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
