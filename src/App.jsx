import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LaunchPage from './pages/LaunchPage';
import HomePage from './pages/HomePage';
import RegistrationPage from './pages/RegistrationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

function ProtectedRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
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
