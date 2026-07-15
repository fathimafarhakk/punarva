import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LaunchPage from './pages/LaunchPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;
    
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (active) {
        setAuthenticated(!!session);
        setLoading(false);
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (active) {
        setAuthenticated(!!session);
        if (event === 'SIGNED_OUT' || !session) {
          setLoading(false);
        }
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div style={{
        background: '#f3ead9',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Space Grotesk, sans-serif',
        color: '#00275a',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Verifying Session...
      </div>
    );
  }

  return authenticated ? children : <Navigate to="/admin" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launch" element={<LaunchPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
