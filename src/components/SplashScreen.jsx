import { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasShownSplash = sessionStorage.getItem('splashShown') === 'true';

    if (hasShownSplash) {
      document.documentElement.classList.add('no-splash', 'visible-content');
      setVisible(false);
      return;
    }

    document.documentElement.classList.remove('no-splash', 'visible-content');

    let timer1, timer2, timer3;

    timer1 = setTimeout(() => {
      setFadeOut(true);
      sessionStorage.setItem('splashShown', 'true');
      document.documentElement.classList.add('no-splash');

      timer2 = setTimeout(() => {
        document.documentElement.classList.add('visible-content');
      }, 150);

      timer3 = setTimeout(() => {
        setVisible(false);
      }, 800);
    }, 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`splash-screen${fadeOut ? ' fade-out' : ''}`} id="splashScreen">
      <div className="splash-inner">
        <img src="/logo.png" alt="PUNARVA Logo" className="splash-logo" />
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'rgba(16,185,129,.7)',
          marginTop: '20px',
        }}>
          NSS State Camp 2K26
        </p>
      </div>
    </div>
  );
}
