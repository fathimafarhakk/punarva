import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import '../styles/dashboard.css';

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default function AdminDashboardPage() {
  const [registrations, setRegistrations] = useState([]);
  const [filtered,      setFiltered]      = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState('');
  const [search,        setSearch]        = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.add('admin-dashboard-body');
    return () => {
      document.body.classList.remove('admin-dashboard-body');
    };
  }, []);

  // ── Load data ──────────────────────────────────────────────
  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data, error: err } = await supabase
        .from('punarva')
        .select('*')
        .order('created_at', { ascending: false });
      if (err) throw err;
      setRegistrations(data || []);
      setFiltered(data || []);
    } catch (err) {
      setError('Failed to load data: ' + (err.message || 'Check your Supabase anon key and RLS policies.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // ── Search ─────────────────────────────────────────────────
  useEffect(() => {
    const q = search.toLowerCase().trim();
    setFiltered(
      q
        ? registrations.filter(r =>
            (r.full_name   || '').toLowerCase().includes(q) ||
            (r.college     || '').toLowerCase().includes(q) ||
            (r.event_name  || '').toLowerCase().includes(q) ||
            (r.email       || '').toLowerCase().includes(q)
          )
        : registrations
    );
  }, [search, registrations]);

  // ── Stats ──────────────────────────────────────────────────
  const totalRegistrations = registrations.length;
  const totalColleges      = new Set(registrations.map(r => r.college).filter(Boolean)).size;
  const totalEvents        = new Set(registrations.map(r => r.event_name).filter(Boolean)).size;
  const today              = new Date().toISOString().split('T')[0];
  const todayCount         = registrations.filter(r => r.created_at?.startsWith(today)).length;

  // ── CSV Download ───────────────────────────────────────────
  const downloadCSV = () => {
    if (!registrations.length) return alert('No data to download.');
    const headers = ['#', 'Full Name', 'College', 'Email', 'Phone', 'Event', 'Unit No.', 'Registered At'];
    const rows = registrations.map((s, i) => [
      i + 1, s.full_name ?? '', s.college ?? '', s.email ?? '',
      s.phone ?? '', s.event_name ?? '', s.unit_number ?? '',
      s.created_at ? new Date(s.created_at).toLocaleString() : '',
    ].map(v => `"${String(v).replace(/"/g, '""')}"`));
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const a   = Object.assign(document.createElement('a'), {
      href:     URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })),
      download: `punarva_registrations_${today}.csv`,
    });
    a.click();
  };

  // ── Logout ─────────────────────────────────────────────────
  const logout = async () => {
    sessionStorage.removeItem('adminLoggedIn');
    await supabase.auth.signOut();
    navigate('/admin');
  };

  // ── Render ─────────────────────────────────────────────────
  return (
    <>
      {/* HEADER */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/logo.png" alt="PUNARVA Logo" className="dashboard-logo" />
          <div>
            <h1>PUNARVA 2K26</h1>
            <p>Administrator Dashboard</p>
          </div>
        </div>
        <button id="logoutBtn" className="logout-btn" onClick={logout}>Logout</button>
      </header>

      {/* MAIN */}
      <main className="dashboard-main">

        {/* STATS */}
        <section className="stats-grid">
          {[
            { label: 'Total Registrations', id: 'totalRegistrations', value: totalRegistrations },
            { label: 'Total Colleges',       id: 'totalColleges',       value: totalColleges },
            { label: 'Total Events',         id: 'totalEvents',         value: totalEvents },
            { label: "Today's Registrations",id: 'todayRegistrations',  value: todayCount },
          ].map(s => (
            <div className="stat-card" key={s.id}>
              <h3>{s.label}</h3>
              <span id={s.id}>{s.value}</span>
            </div>
          ))}
        </section>

        {/* TOOLBAR */}
        <section className="toolbar">
          <input
            type="text"
            id="searchInput"
            placeholder="Search by Name, College or Event"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button id="downloadBtn" onClick={downloadCSV}>Download CSV</button>
        </section>

        {/* ERROR */}
        {error && (
          <div id="errorBanner" className="error-banner">{error}</div>
        )}

        {/* TABLE */}
        <section className="table-section">
          <table id="registrationTable">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>College</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event</th>
                <th>Unit No.</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
                    Loading registrations…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
                    No registrations found.
                  </td>
                </tr>
              ) : (
                filtered.map((s, i) => (
                  <tr key={s.id ?? i}>
                    <td>{i + 1}</td>
                    <td>{escapeHtml(s.full_name)}</td>
                    <td>{escapeHtml(s.college)}</td>
                    <td>{escapeHtml(s.email)}</td>
                    <td>{escapeHtml(s.phone)}</td>
                    <td>{escapeHtml(s.event_name)}</td>
                    <td>{escapeHtml(s.unit_number)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
