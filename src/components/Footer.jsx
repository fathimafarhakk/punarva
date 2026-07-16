import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        {/* BRAND COLUMN */}
        <div className="footer-col brand-col">
          <div className="footer-brand-meta" style={{ marginTop: 0 }}>
            <h3>PUNARVA 2K26</h3>
            <p className="footer-tag">State-Level NSS Camp</p>
            <p className="footer-desc">
              Empowering youth through hands-on technical skills, sustainable upcycling, and eco-friendly responsibility.
            </p>
          </div>
        </div>

        {/* NAVIGATION COLUMN */}
        <div className="footer-col links-col">
          <h4>Navigation</h4>
          <nav className="footer-nav-list">
            <Link to="/#about">About the Camp</Link>
            <Link to="/#camp">Dates &amp; Venue</Link>
            <Link to="/#activities">Camp Activities</Link>
            <Link to="/#organizers">Organizers</Link>
            <a href="/brochure.pdf" download="PUNARVA_2026_Brochure.pdf">Download Brochure</a>
            <Link to="/registration">Register Now</Link>
          </nav>
        </div>

        {/* ORGANIZERS COLUMN */}
        <div className="footer-col contact-col">
          <h4>Organized By</h4>
          <p className="footer-org-text">
            <strong>National Service Scheme (NSS)</strong><br />
            EMEA College of Arts and Science, Kondotty<br />
            NSS Units 102 &amp; 115
          </p>
          <div className="sap-badge">
            Swachhata Action Plan
          </div>
        </div>

      </div>

      {/* COPYRIGHT & CREDITS BOTTOM BAR */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} PUNARVA EMEA. All rights reserved.
          </p>
          <p className="credits-text">
            Crafted with heart by{' '}
            <a
              href="https://www.linkedin.com/in/fathima-farha-kk-a76940370/"
              target="_blank"
              rel="noopener noreferrer"
              className="credit-link"
            >
              Fathima Farha KK
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
