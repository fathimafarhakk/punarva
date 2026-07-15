import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const ICONS = {
  bulb: (
    <svg viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        d="M9 17h6M10 20h4M8 10.5A4.5 4.5 0 1 1 16 10.5c0 2-1.2 3-2 4.2-.5.8-.6 1.3-.6 1.8H10.6c0-.5-.1-1-.6-1.8-.8-1.2-2-2.2-2-4.2Z"/>
      <path d="M12 6v1.2M8.8 8l.9.7M15.2 8l-.9.7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  tube: (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="10.5" width="18" height="3.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 12.2h18M6 9v1.5M18 9v1.5M6 14.5V16M18 14.5V16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  vase: (
    <svg viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        d="M9.5 4h5l.7 3.6c1.6 1.7 2.3 3.6 2.3 5.9 0 4-2.6 6.5-5.5 6.5s-5.5-2.5-5.5-6.5c0-2.3.7-4.2 2.3-5.9L9.5 4Z"/>
      <path d="M9 4h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M7.2 13.5c1.6 1 3 1 4.8 0s3.2-1 4.8 0" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  fish: (
    <svg viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        d="M4 12c2.5-3.5 6-5.5 10-5.5 2.3 0 4.2.9 5.6 2L21 6.5c.4 1.7.4 3.3 0 5l1.6 2c-1.4 1.1-3.3 2-5.6 2-4 0-7.5-2-10-5.5Z"/>
      <circle cx="9" cy="11.3" r=".9" fill="currentColor"/>
      <path d="M4 12c-1 .6-2 1.6-2.6 2.8M4 12c-1-.6-2-1.6-2.6-2.8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  bag: (
    <svg viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"
        d="M6 8h12l1 12.5H5L6 8Z"/>
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  fan: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="1.8" fill="currentColor"/>
      <path fill="currentColor" d="M12 12c0-3.5-1.5-6-4-6.5-1.5-.3-2.5 1-2 2.5 1 3 3.5 4.5 6 4Z"/>
      <path fill="currentColor" d="M12 12c3.5 0 6-1.5 6.5-4 .3-1.5-1-2.5-2.5-2-3 1-4.5 3.5-4 6Z"/>
      <path fill="currentColor" d="M12 12c0 3.5 1.5 6 4 6.5 1.5.3 2.5-1 2-2.5-1-3-3.5-4.5-6-4Z"/>
      <path fill="none" stroke="currentColor" strokeWidth="1.4" d="M12 12c-3.5 0-6 1.5-6.5 4-.3 1.5 1 2.5 2.5 2 3-1 4.5-3.5 4-6Z"/>
    </svg>
  ),
};

const GUIDELINES = {
  led:      { title: 'LED Bulb Repair and Fixation', icon: 'bulb', items: ['Follow all safety instructions provided by the trainer.','Wear protective equipment during practical sessions.','Use only the tools and materials provided.','Handle electrical components with care.','Return all tools after completing the session.','Follow the trainer\'s demonstration before attempting repairs.','The trainer\'s decision regarding safety is final.'] },
  tube:     { title: 'Tube Light Repair and Fixation', icon: 'tube', items: ['Handle tube lights carefully to avoid damage.','Disconnect the power supply before repair.','Use safety equipment throughout the session.','Work only under the guidance of the trainer.','Keep the workspace clean and organized.','Dispose of damaged materials responsibly.','Follow all electrical safety precautions.'] },
  tiles:    { title: 'Broken Tile to Decorative Vase Making', icon: 'vase', items: ['Wear gloves while handling broken tiles.','Use cutting and adhesive materials carefully.','Follow the design demonstrated by the trainer.','Maintain a clean workspace.','Avoid unnecessary material wastage.','Complete the activity within the allotted time.','Handle finished products with care.'] },
  umbrella: { title: 'Umbrella Sheet to Fish Bag Making', icon: 'fish', items: ['Use reusable umbrella sheets only.','Measure materials accurately before cutting.','Handle scissors and stitching tools safely.','Follow the trainer\'s instructions step by step.','Ensure neat finishing of the bag.','Keep the workspace clean after completion.','Avoid wastage of reusable materials.'] },
  saree:    { title: 'Old Saree to Carry Bag Production', icon: 'bag', items: ['Use clean and reusable fabric materials.','Follow the cutting pattern correctly.','Operate sewing tools safely.','Minimize fabric wastage.','Ensure proper stitching and finishing.','Complete the product within the session.','Follow all trainer instructions.'] },
  fan:      { title: 'Conversion of Normal Fan to BLDC Fan', icon: 'fan', items: ['Disconnect the power supply before starting.','Perform all work under expert supervision.','Use only the components provided.','Follow electrical safety protocols.','Do not operate the fan before inspection.','Return all tools after the session.','Trainer approval is mandatory before testing.'] },
};

export default function EventModal({ eventKey, onClose }) {
  const data = GUIDELINES[eventKey];
  const closeRef = useRef(null);

  useEffect(() => {
    if (!data) return;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      className="modal"
      id="eventModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      style={{ display: 'flex' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content">
        <button className="close" id="modalClose" aria-label="Close" ref={closeRef} onClick={onClose}>
          &times;
        </button>
        <span className="modal-icon" id="modalIcon">
          <svg viewBox="0 0 24 24">{ICONS[data.icon]}</svg>
        </span>
        <h2 id="modalTitle">{data.title}</h2>
        <p className="modal-kicker">Guidelines</p>
        <ul id="modalGuidelines">
          {data.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
        <div className="modal-buttons">
          <Link to="/registration"><button className="btn btn-primary">Register Now</button></Link>
          <button className="btn btn-ghost" id="modalCloseBtn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
