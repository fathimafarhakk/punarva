import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SplashScreen from '../components/SplashScreen';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Countdown from '../components/Countdown';
import EventModal from '../components/EventModal';

const EVENTS = [
  { key: 'led',      num: '01', icon: 'bulb', title: 'LED Bulb Repair', desc: 'Learn to test, rebuild, and restore discarded LED bulbs and drivers.' },
  { key: 'tube',     num: '02', icon: 'tube', title: 'Tube Light Repair', desc: 'Reassemble and troubleshoot electronic chokes and energy-saving tube systems.' },
  { key: 'tiles',    num: '03', icon: 'vase', title: 'Mosaic Tile Art', desc: 'Upcycle broken ceramic tiles into stunning textured decorative vases.' },
  { key: 'umbrella', num: '04', icon: 'fish', title: 'Umbrella Sheet Bag', desc: 'Transform waste umbrella nylon fabric into durable waterproof fish bags.' },
  { key: 'saree',    num: '05', icon: 'bag',  title: 'Saree Carry Bag', desc: 'Stitch and craft discarded traditional sarees into eco-friendly carry bags.' },
  { key: 'fan',      num: '06', icon: 'fan',  title: 'BLDC Fan Conversion', desc: 'Convert energy-inefficient AC fans to modern, smart BLDC motors.' },
];

const SVG_ICONS = {
  bulb: <><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M9 17h6M10 20h4M8 10.5A4.5 4.5 0 1 1 16 10.5c0 2-1.2 3-2 4.2-.5.8-.6 1.3-.6 1.8H10.6c0-.5-.1-1-.6-1.8-.8-1.2-2-2.2-2-4.2Z"/><path d="M12 6v1.2M8.8 8l.9.7M15.2 8l-.9.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></>,
  tube: <><rect x="3" y="10.5" width="18" height="3.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M3 12.2h18M6 9v1.5M18 9v1.5M6 14.5V16M18 14.5V16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></>,
  vase: <><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M9.5 4h5l.7 3.6c1.6 1.7 2.3 3.6 2.3 5.9 0 4-2.6 6.5-5.5 6.5s-5.5-2.5-5.5-6.5c0-2.3.7-4.2 2.3-5.9L9.5 4Z"/><path d="M9 4h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><path d="M7.2 13.5c1.6 1 3 1 4.8 0s3.2-1 4.8 0" stroke="currentColor" strokeWidth="1.2" fill="none"/></>,
  fish: <><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M4 12c2.5-3.5 6-5.5 10-5.5 2.3 0 4.2.9 5.6 2L21 6.5c.4 1.7.4 3.3 0 5l1.6 2c-1.4 1.1-3.3 2-5.6 2-4 0-7.5-2-10-5.5Z"/><circle cx="9" cy="11.3" r=".9" fill="currentColor"/><path d="M4 12c-1 .6-2 1.6-2.6 2.8M4 12c-1-.6-2-1.6-2.6-2.8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></>,
  bag:  <><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l1 12.5H5L6 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></>,
  fan:  <><circle cx="12" cy="12" r="1.8" fill="currentColor"/><path fill="currentColor" d="M12 12c0-3.5-1.5-6-4-6.5-1.5-.3-2.5 1-2 2.5 1 3 3.5 4.5 6 4Z"/><path fill="currentColor" d="M12 12c3.5 0 6-1.5 6.5-4 .3-1.5-1-2.5-2.5-2-3 1-4.5 3.5-4 6Z"/><path fill="currentColor" d="M12 12c0 3.5 1.5 6 4 6.5 1.5.3 2.5-1 2-2.5-1-3-3.5-4.5-6-4Z"/><path fill="none" stroke="currentColor" strokeWidth="1.4" d="M12 12c-3.5 0-6 1.5-6.5 4-.3 1.5 1 2.5 2.5 2 3-1 4.5-3.5 4-6Z"/></>,
};

export default function HomePage() {
  const [activeEvent, setActiveEvent] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grain" />
      <SplashScreen />
      <Header />

      <main id="top" className="fade-up-content">
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="hero-bg" aria-hidden="true">
            <svg className="hero-blob" viewBox="0 0 600 600">
              <path fill="currentColor" d="M431 62c60 40 96 116 92 190-4 74-49 146-113 186-64 40-149 48-213 12-64-36-108-108-116-186-8-78 20-162 82-206 62-44 208-36 268 4z"/>
            </svg>
          </div>
          <div className="hero-inner">
            <motion.p 
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
            >
              Swachhata Action Plan &nbsp;·&nbsp; State-Level Camp
            </motion.p>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
            >
              Punarva <span>2K26</span>
            </motion.h1>
            <motion.p 
              className="hero-tagline"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            >
              Learn it. Fix it. Reuse it. Recycle it.
            </motion.p>
            <motion.p 
              className="hero-desc"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
            >
              State-Level Hands-On Upcycling &amp; Recycling Training Camp
            </motion.p>
            <motion.div 
              className="hero-chips"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            >
              <span className="chip">
                <svg className="ic" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="8" cy="14" r="1.1" fill="currentColor"/><circle cx="12" cy="14" r="1.1" fill="currentColor"/><circle cx="16" cy="14" r="1.1" fill="currentColor"/></svg>
                24–26 July 2026
              </span>
              <span className="chip">
                <svg className="ic" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" d="M12 21s7-7.2 7-12.5A7 7 0 0 0 5 8.5C5 13.8 12 21 12 21Z"/><circle cx="12" cy="8.5" r="2.6" fill="currentColor"/></svg>
                EMEA College, Kondotty
              </span>
              <span className="chip">
                <svg className="ic" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M5 19c-1-7 2-13 14-14 1 12-6 15-14 14Z"/><path d="M6 18c4-5 8-8 12-13" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
                Swachhata Action Plan
              </span>
            </motion.div>
            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
            >
              <Link className="btn btn-primary" to="/registration">Register Now</Link>
              <a className="btn btn-ghost" href="#camp">See camp details ↓</a>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
          >
            <Countdown />
          </motion.div>
        </section>

        {/* ===== ABOUT ===== */}
        <motion.section 
          className="about-section" 
          id="about"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="section-head">
            <p className="eyebrow eyebrow-dark">About the Camp</p>
            <h2>Two units, one commitment to a cleaner Kerala</h2>
          </div>
          <motion.div 
            className="about-grid"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.article 
              className="about-card torn-top"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85 } }
              }}
            >
              <span className="about-icon">
                <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M9.5 3.5 6 9.8m0 0-2.6-1M6 9.8l3 1.9M17.6 6.2l3.9 5.5m0 0-3 .7m3-.7-1.6 2.9M13 20.5H6.4a1 1 0 0 1-.9-1.5l2-3.5m5.5 5-2.2-2.6m2.2 2.6 2.4-2.4M17.3 20.5h1.5a2 2 0 0 0 1.7-3l-1.7-3"/></svg>
              </span>
              <h3>About Punarva</h3>
              <p>The NSS Units <strong>102 &amp; 115</strong> of <strong>EMEA College of Arts and Science, Kondotty</strong> present <strong>"PUNARVA 2K26"</strong> — a State-Level Recycling and Upcycling Hands-on Training Camp organised under the Swachhata Action Plan.</p>
              <p>The camp gives NSS volunteers practical training in recycling, upcycling, repair and sustainable waste management — building technical skill, environmental responsibility, creativity and a spirit of community service.</p>
            </motion.article>
            <motion.article 
              className="about-card torn-top"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 85 } }
              }}
            >
              <span className="about-icon">
                <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" d="m12 3 2.4 1.7 2.9-.2 1 2.7 2.5 1.5-.7 2.9.7 2.9-2.5 1.5-1 2.7-2.9-.2L12 20l-2.4-1.7-2.9.2-1-2.7-2.5-1.5.7-2.9-.7-2.9 2.5-1.5 1-2.7 2.9.2L12 3Z"/><circle cx="12" cy="11" r="2.4" fill="currentColor"/></svg>
              </span>
              <h3>About NSS EMEA</h3>
              <p>NSS EMEA College of Arts &amp; Science, Kondotty is a socially committed unit promoting community service, environmental conservation, youth leadership and social awareness.</p>
              <p>Through innovative programmes and outreach initiatives, it nurtures responsible citizenship, sustainable development and a lasting spirit of service among students.</p>
            </motion.article>
          </motion.div>
        </motion.section>

        {/* ===== CAMP DETAILS ===== */}
        <motion.section 
          className="camp-section" 
          id="camp"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="section-head light">
            <p className="eyebrow">Camp Details</p>
            <h2>What, where &amp; when</h2>
            <p className="section-sub">Everything you need to plan your trip to Kondotty.</p>
          </div>
          <motion.div 
            className="camp-grid"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div 
              className="camp-card"
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
              }}
            >
              <span className="camp-icon"><svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/><circle cx="8" cy="14" r="1.1" fill="currentColor"/><circle cx="12" cy="14" r="1.1" fill="currentColor"/><circle cx="16" cy="14" r="1.1" fill="currentColor"/></svg></span>
              <h4>Camp Dates</h4>
              <p>24 – 26 July 2026<br /><span className="muted">Friday to Sunday</span></p>
            </motion.div>
            <motion.div 
              className="camp-card"
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
              }}
            >
              <span className="camp-icon"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" d="M12 21s7-7.2 7-12.5A7 7 0 0 0 5 8.5C5 13.8 12 21 12 21Z"/><circle cx="12" cy="8.5" r="2.6" fill="currentColor"/></svg></span>
              <h4>Venue</h4>
              <p>EMEA College of Arts and Science<br /><span className="muted">Kondotty, Malappuram</span></p>
            </motion.div>
            <motion.div 
              className="camp-card"
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
              }}
            >
              <span className="camp-icon"><svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" d="M5 19c-1-7 2-13 14-14 1 12-6 15-14 14Z"/><path d="M6 18c4-5 8-8 12-13" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg></span>
              <h4>Theme</h4>
              <p>Under the<br /><span className="muted">Swachhata Action Plan</span></p>
            </motion.div>
          </motion.div>
          <p className="camp-desc">NSS volunteers from across Kerala come together to learn practical skills in recycling, repair, upcycling and sustainable waste management — while contributing towards building a greener future.</p>
        </motion.section>

        {/* ===== ACTIVITIES ===== */}
        <motion.section 
          className="events-section" 
          id="activities"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="section-head">
            <p className="eyebrow eyebrow-dark">Camp Activities</p>
            <h2>Learn · Repair · Reuse · Recycle</h2>
            <p className="section-sub">Six hands-on sessions, all on 24 July 2026 · tap a card for the guidelines.</p>
          </div>
          <motion.div 
            className="event-grid"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            {EVENTS.map(ev => (
              <motion.button 
                key={ev.key} 
                className="event-card" 
                onClick={() => setActiveEvent(ev.key)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
                }}
              >
                <span className="event-num">{ev.num}</span>
                <span className="event-icon">
                  <svg viewBox="0 0 24 24">{SVG_ICONS[ev.icon]}</svg>
                </span>
                <h3>{ev.title}</h3>
                <p className="event-desc">{ev.desc}</p>
                <div className="event-footer">
                  <span className="event-time">
                    <svg className="ic" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.3" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                    Fri · 9:00 AM
                  </span>
                  <span className="event-action">Guidelines →</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </motion.section>

        {/* ===== REGISTER CTA ===== */}
        <motion.section 
          className="register-band"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="register-inner">
            <span className="register-icon">
              <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M9.5 3.5 6 9.8m0 0-2.6-1M6 9.8l3 1.9M17.6 6.2l3.9 5.5m0 0-3 .7m3-.7-1.6 2.9M13 20.5H6.4a1 1 0 0 1-.9-1.5l2-3.5m5.5 5-2.2-2.6m2.2 2.6 2.4-2.4M17.3 20.5h1.5a2 2 0 0 0 1.7-3l-1.7-3"/></svg>
            </span>
            <h2>Seats are limited — reserve yours today</h2>
            <p>Bring your NSS ID and enthusiasm. Everything else, we'll teach you.</p>
            <Link className="btn btn-primary btn-lg" to="/registration">Register Now</Link>
          </div>
        </motion.section>

        {/* ===== ORGANIZERS ===== */}
        <motion.section 
          className="organizers" 
          id="organizers"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="section-head">
            <p className="eyebrow eyebrow-dark">Partners</p>
            <h2>Organized &amp; Supported By</h2>
          </div>
          <motion.div 
            className="org-grid"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.12 } }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div 
              className="org-card"
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
              }}
            >
              <img src="/nss-logo.png" alt="NSS Logo" className="org-seal-img" style={{ height: '50px', objectFit: 'contain', marginBottom: '16px' }} />
              <h4>Organized By</h4>
              <p>National Service Scheme (NSS)<br />EMEA College Units 102 &amp; 115</p>
            </motion.div>
            <motion.div 
              className="org-card"
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
              }}
            >
              <img src="/emea-logo.jpeg" alt="EMEA College Logo" className="org-seal-img" style={{ height: '50px', objectFit: 'contain', marginBottom: '16px', borderRadius: '6px' }} />
              <h4>Host Institution</h4>
              <p>EMEA College of Arts &amp; Science<br />Affiliated with University of Calicut</p>
            </motion.div>
            <motion.div 
              className="org-card"
              variants={{
                hidden: { opacity: 0, y: 15 },
                show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90 } }
              }}
            >
              <img src="/logo.png" alt="PUNARVA Logo" className="org-seal-img" style={{ height: '50px', objectFit: 'contain', marginBottom: '16px' }} />
              <h4>State-Level Camp</h4>
              <p>PUNARVA 2K26<br />Under the Swachhata Action Plan (SAP)</p>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      <Footer />

      {/* ===== EVENT MODAL ===== */}
      {activeEvent && (
        <EventModal eventKey={activeEvent} onClose={() => setActiveEvent(null)} />
      )}
    </motion.div>
  );
}
