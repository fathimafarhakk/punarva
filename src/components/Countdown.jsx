import { useState, useEffect } from 'react';

const pad = n => String(n).padStart(2, '0');
const CAMP_DATE = new Date('July 24, 2026 21:00:00').getTime();

export default function Countdown() {
  const [time, setTime] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const tick = () => {
      const dist = CAMP_DATE - Date.now();
      if (dist <= 0) {
        setTime({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }
      setTime({
        days:    pad(Math.floor(dist / (1000 * 60 * 60 * 24))),
        hours:   pad(Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: pad(Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: pad(Math.floor((dist % (1000 * 60)) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="countdown-strip">
      <p className="countdown-label">Camp begins in</p>
      <div id="timer" className="timer">
        <div className="timer-cell"><span id="days">{time.days}</span><p>Days</p></div>
        <div className="timer-cell"><span id="hours">{time.hours}</span><p>Hours</p></div>
        <div className="timer-cell"><span id="minutes">{time.minutes}</span><p>Minutes</p></div>
        <div className="timer-cell"><span id="seconds">{time.seconds}</span><p>Seconds</p></div>
      </div>
    </div>
  );
}
