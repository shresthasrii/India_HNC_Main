import React from "react";

function Chakra({ x, y, r = 42, color = "#0B5CAB", opacity = 0.08 }) {
  const spokes = Array.from({ length: 24 });
  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <circle cx={0} cy={0} r={r} fill="none" stroke={color} strokeWidth={1.5} />
      <circle cx={0} cy={0} r={r * 0.15} fill={color} />
      {spokes.map((_, i) => (
        <line
          key={i}
          x1={0}
          y1={0}
          x2={0}
          y2={-r}
          stroke={color}
          strokeWidth={1}
          transform={`rotate(${(360 / spokes.length) * i})`}
        />
      ))}
    </g>
  );
}

export default function IndiaBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Tricolor soft gradients */}
      <div className="absolute -top-1/3 -left-1/4 h-[120vmax] w-[120vmax] rounded-full bg-[radial-gradient(closest-side,_rgba(255,103,31,0.18),_transparent_70%)]" />
      <div className="absolute -bottom-1/3 -right-1/4 h-[120vmax] w-[120vmax] rounded-full bg-[radial-gradient(closest-side,_rgba(19,136,8,0.18),_transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_rgba(255,255,255,0.08)_40%,_transparent_70%)]" />

      {/* Subtle paisley-like pattern using SVG */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="paisley" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M30,80 C30,50 80,30 110,60 C140,90 120,140 80,140 C55,140 35,125 30,105" fill="none" stroke="#FF671F" strokeOpacity="0.06" strokeWidth="2" />
            <path d="M130,80 C130,110 80,130 50,100 C20,70 40,20 80,20 C105,20 125,35 130,55" fill="none" stroke="#138808" strokeOpacity="0.06" strokeWidth="2" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#paisley)" />

        {/* Ashoka chakra motifs */}
        <Chakra x={220} y={220} r={50} />
        <Chakra x={880} y={180} r={42} />
        <Chakra x={760} y={520} r={56} />
        <Chakra x={360} y={620} r={44} />
      </svg>
    </div>
  );
}
