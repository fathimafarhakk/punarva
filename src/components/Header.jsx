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
    <header className={`site-header fade-up-content${scrolled ? ' scrolled' : ''}`} id="siteHeader">
      <div className="nav-wrap">
        <Link className="brand" to="/" aria-label="PUNARVA 2K26 Home">
          <img src="/logo.png" alt="PUNARVA 2K26" className="nav-logo" />
          <span className="brand-name">PUNARVA</span>
        </Link>

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
  );
}
