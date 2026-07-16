import { Link } from 'react-router-dom';

export default function LaunchPage() {
  return (
    <>
      <div className="grain" />
      <section className="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '80px 6%' }}>
        <div className="hero-logo-wrap" style={{ marginBottom: '32px' }}>
          <img src="/logo.png" alt="PUNARVA Logo" style={{ width: '160px', margin: '0 auto' }} />
        </div>

        <p className="eyebrow">NSS State Camp · EMEA College, Kondotty</p>
        <h1 className="hero-title" style={{ marginBottom: '16px' }}>
          Punarva <span>2K26</span>
        </h1>
        <p className="hero-tagline">Learn it. Fix it. Reuse it. Recycle it.</p>
        <p className="hero-desc" style={{ margin: '24px auto', maxWidth: '640px' }}>
          A State-Level Recycling &amp; Upcycling Hands-on Training Camp under the Swachhata Action Plan. Organized in collaboration with the Regional Directorate of NSS, Thiruvananthapuram &amp; State NSS Cell, Kerala · 24–26 July 2026 at EMEA College, Kondotty.
        </p>

        <div className="hero-actions" style={{ marginTop: '32px' }}>
          <Link className="btn btn-primary btn-lg" to="/">Explore the Camp</Link>
          <Link className="btn btn-ghost btn-lg" to="/registration">Register Now</Link>
        </div>

        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '48px', alignItems: 'center', opacity: 0.7 }}>
          <img src="/emea-logo.jpeg" alt="EMEA College" style={{ height: '48px', borderRadius: '8px' }} />
          <img src="/nss-logo.png"   alt="NSS Logo"      style={{ height: '48px' }} />
        </div>
      </section>
    </>
  );
}
