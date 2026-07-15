import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {menuOpen && <div className="nav-backdrop" onClick={closeMenu}></div>}

      <header className={`site-header fade-up-content${scrolled ? ' scrolled' : ''}`} id="siteHeader">
        <div className="nav-wrap">
        <div className="header-logos">
          <img src="/emea-logo.jpeg" alt="EMEA College Logo" className="header-logo emea" />
          <img src="/nss-logo.png" alt="NSS Logo" className="header-logo nss" />
          <div className="logo-divider"></div>
          <Link className="brand" to="/" aria-label="PUNARVA 2K26 Home" onClick={closeMenu}>
            <img src="/logo.png" alt="PUNARVA 2K26 Logo" className="brand-seal-img" />
            <div className="brand-text">
              <strong>PUNARVA</strong>
              <em>2K26</em>
            </div>
          </Link>
        </div>

        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Toggle menu"
          aria-expanded={String(menuOpen)}
          onClick={() => setMenuOpen(o => !o)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <a href="/#about" onClick={closeMenu}>About</a>
          <a href="/#camp" onClick={closeMenu}>Camp Details</a>
          <a href="/#activities" onClick={closeMenu}>Activities</a>
          <a href="/#organizers" onClick={closeMenu}>Organizers</a>
          <Link className="nav-cta" to="/registration" onClick={closeMenu}>Register Now</Link>
        </nav>
      </div>
    </header>
    </>
  );
}
