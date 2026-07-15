import { useEffect, useRef } from 'react';

export default function StatusModal({ isSuccess, title, message, onClose, onBack }) {
  const btnRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    btnRef.current?.focus();
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      className="modal"
      id="statusModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="statusTitle"
      style={{ display: 'flex' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-content status-modal-content">
        <button className="close" id="statusClose" aria-label="Close" onClick={onClose}>&times;</button>

        <span className={`modal-icon status-modal-icon${isSuccess ? ' success' : ' error'}`} id="statusIcon">
          {isSuccess ? (
            <svg viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </span>

        <h2 id="statusTitle">{title}</h2>
        <p id="statusMessage" className="status-message">{message}</p>

        <div className="modal-buttons status-buttons">
          {isSuccess ? (
            <button className="btn btn-primary" id="statusBtn" ref={btnRef} onClick={onBack}>
              Back to Home
            </button>
          ) : (
            <button className="btn btn-primary" id="statusBtn" ref={btnRef} onClick={onClose}>
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
