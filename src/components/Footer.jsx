import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer fade-up-content">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-seal small">
            <img src="/logo.png" alt="PUNARVA Logo" style={{ height: '100%', width: '100%', objectFit: 'contain' }} />
          </span>
          <div>
            <strong>PUNARVA 2K26</strong>
            <p>NSS State Camp · EMEA College, Kondotty</p>
          </div>
        </div>
        <nav className="footer-links">
          <a href="/#about">About</a>
          <a href="/#camp">Camp Details</a>
          <a href="/#activities">Activities</a>
          <a href="/#organizers">Organizers</a>
          <Link to="/registration">Register</Link>
        </nav>
      </div>
      <p className="footer-note">
        Under the Swachhata Action Plan · National Service Scheme, EMEA College of Arts and Science,
        Kondotty · Crafted by{' '}
        <a
          href="https://www.linkedin.com/in/fathima-farha-kk-a76940370/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', color: '#10b981' }}
        >
          Fathima Farha KK
        </a>
      </p>
    </footer>
  );
}
