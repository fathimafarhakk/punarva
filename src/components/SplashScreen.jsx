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
        <svg className="splash-emblem" viewBox="0 0 300 220" aria-hidden="true">
          <circle className="ripple ripple-1" cx="150" cy="190" r="30" />
          <circle className="ripple ripple-2" cx="150" cy="190" r="30" />
          <circle className="ripple ripple-3" cx="150" cy="190" r="30" />
          <line className="horizon" x1="45" y1="190" x2="255" y2="190" />
          <path
            className="sun-arc"
            d="M 95 190 A 55 55 0 0 1 205 190"
            fill="none"
          />
        </svg>

        {/* <img src="/logo.png" alt="PUNARVA Logo" className="splash-logo" /> */}

        <h1 className="splash-word">Punarva</h1>

        <p className="splash-label">NSS State Camp &middot; 2K26</p>

        <div className="splash-dots" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}