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
  const [collegeFilter, setCollegeFilter] = useState('');
  const [unitFilter,    setUnitFilter]    = useState('');
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

  // ── Unique Filters List ────────────────────────────────────
  const uniqueColleges = Array.from(new Set(registrations.map(r => r.college).filter(Boolean))).sort();
  const uniqueUnits = Array.from(new Set(registrations.map(r => r.unit_number).filter(Boolean))).sort();

  // ── Filtering Logic ────────────────────────────────────────
  useEffect(() => {
    const q = search.toLowerCase().trim();
    let result = registrations;

    if (q) {
      result = result.filter(r =>
        (r.full_name   || '').toLowerCase().includes(q) ||
        (r.college     || '').toLowerCase().includes(q) ||
        (r.email       || '').toLowerCase().includes(q) ||
        (r.phone       || '').toLowerCase().includes(q)
      );
    }

    if (collegeFilter) {
      result = result.filter(r => r.college === collegeFilter);
    }

    if (unitFilter) {
      result = result.filter(r => String(r.unit_number) === unitFilter);
    }

    setFiltered(result);
  }, [search, collegeFilter, unitFilter, registrations]);

  // ── Stats ──────────────────────────────────────────────────
  const totalRegistrations = registrations.length;
  const totalColleges      = new Set(registrations.map(r => r.college).filter(Boolean)).size;
  const totalUnits         = new Set(registrations.map(r => r.unit_number).filter(Boolean)).size;
  const today              = new Date().toISOString().split('T')[0];
  const todayCount         = registrations.filter(r => r.created_at?.startsWith(today)).length;

  // ── CSV Download ───────────────────────────────────────────
  const downloadCSV = () => {
    if (!registrations.length) return alert('No data to download.');
    const headers = ['#', 'Full Name', 'College', 'Email', 'Phone', 'Unit No.', 'Registered At'];
    const rows = registrations.map((s, i) => [
      i + 1,
      s.full_name ?? '',
      s.college ?? '',
      s.email ?? '',
      s.phone ?? '',
      s.unit_number ?? '',
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

      {/* MAIN CONTAINER */}
      <main className="dashboard-grid">
        {/* LEFT COLUMN: FILTERS & STATS */}
        <aside className="dashboard-sidebar">
          {/* SEARCH & FILTERS CARD */}
          <div className="sidebar-card">
            <h2>Search &amp; Filter</h2>
            
            <div className="filter-group">
              <label>Search Query</label>
              <input
                type="text"
                id="searchInput"
                placeholder="Name, College or Email"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>College</label>
              <select
                value={collegeFilter}
                onChange={e => setCollegeFilter(e.target.value)}
              >
                <option value="">All Colleges</option>
                {uniqueColleges.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>NSS Unit</label>
              <select
                value={unitFilter}
                onChange={e => setUnitFilter(e.target.value)}
              >
                <option value="">All NSS Units</option>
                {uniqueUnits.map(u => (
                  <option key={u} value={String(u)}>Unit {u}</option>
                ))}
              </select>
            </div>

            <button id="downloadBtn" onClick={downloadCSV} className="action-btn-primary">
              Download CSV Report
            </button>
          </div>

          {/* STATS STACK */}
          <div className="stats-stack">
            {[
              { label: 'Total Registrations', id: 'totalRegistrations', value: totalRegistrations, border: 'var(--moss)' },
              { label: 'Total Colleges',       id: 'totalColleges',       value: totalColleges, border: 'var(--gold)' },
              { label: 'Total NSS Units',      id: 'totalUnits',          value: totalUnits, border: 'var(--moss)' },
              { label: "Today's Registrations",id: 'todayRegistrations',  value: todayCount, border: 'var(--gold)' },
            ].map(s => (
              <div className="stat-card-compact" key={s.id} style={{ borderLeft: `4px solid ${s.border}` }}>
                <h3>{s.label}</h3>
                <span id={s.id}>{s.value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* RIGHT COLUMN: REGISTRANT TABLE CARD */}
        <section className="dashboard-content">
          <div className="table-card">
            <div className="table-card-header">
              <h2>Registrant Database</h2>
              <span className="badge">
                Showing {filtered.length} of {registrations.length}
              </span>
            </div>

            {error && (
              <div id="errorBanner" className="error-banner">{error}</div>
            )}

            <div className="table-wrapper">
              <table id="registrationTable">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>College</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Unit No.</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="table-placeholder">
                        Loading registrations…
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="table-placeholder">
                        No registrations found.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((s, i) => (
                      <tr key={s.id ?? i}>
                        <td>{i + 1}</td>
                        <td className="font-semibold">{escapeHtml(s.full_name)}</td>
                        <td>{escapeHtml(s.college)}</td>
                        <td>{escapeHtml(s.email)}</td>
                        <td className="font-mono">{escapeHtml(s.phone)}</td>
                        <td>{escapeHtml(s.unit_number)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
