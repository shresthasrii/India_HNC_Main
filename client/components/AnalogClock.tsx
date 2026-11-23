import React, { useState, useEffect } from "react";

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate IST (UTC+5:30)
  const istTime = new Date(time.getTime() + 5.5 * 60 * 60 * 1000);
  const hours = istTime.getHours() % 12;
  const minutes = istTime.getMinutes();
  const seconds = istTime.getSeconds();

  const hourDeg = (hours * 30) + (minutes * 0.5);
  const minDeg = (minutes * 6) + (seconds * 0.1);
  const secDeg = seconds * 6;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        className="drop-shadow-sm"
      >
        {/* Clock face */}
        <circle cx="30" cy="30" r="28" fill="#ffffff" stroke="#0B5CAB" strokeWidth="1.5" />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 30 + 22 * Math.cos(angle);
          const y1 = 30 + 22 * Math.sin(angle);
          const x2 = 30 + 25 * Math.cos(angle);
          const y2 = 30 + 25 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#0B5CAB"
              strokeWidth="1.2"
            />
          );
        })}

        {/* Hour hand */}
        <line
          x1="30"
          y1="30"
          x2={30 + 12 * Math.sin((hourDeg * Math.PI) / 180)}
          y2={30 - 12 * Math.cos((hourDeg * Math.PI) / 180)}
          stroke="#0B5CAB"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Minute hand */}
        <line
          x1="30"
          y1="30"
          x2={30 + 16 * Math.sin((minDeg * Math.PI) / 180)}
          y2={30 - 16 * Math.cos((minDeg * Math.PI) / 180)}
          stroke="#1A9B0A"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Second hand */}
        <line
          x1="30"
          y1="30"
          x2={30 + 18 * Math.sin((secDeg * Math.PI) / 180)}
          y2={30 - 18 * Math.cos((secDeg * Math.PI) / 180)}
          stroke="#FF671F"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Center dot */}
        <circle cx="30" cy="30" r="2" fill="#0B5CAB" />
      </svg>
      <div className="text-xs font-semibold text-foreground/70">IST</div>
    </div>
  );
}
