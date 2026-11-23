import React from "react";

export default function ChakraIcon({ size = 32, color = "#0B5CAB", className = "" }: { size?: number; color?: string; className?: string }) {
  const spokes = Array.from({ length: 24 });
  const r = size / 2 - 1.5;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden
      focusable="false"
    >
      <g transform={`translate(${size / 2} ${size / 2})`}>
        <circle cx={0} cy={0} r={r} fill="none" stroke={color} strokeWidth={1.5} />
        <circle cx={0} cy={0} r={r * 0.16} fill={color} />
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
    </svg>
  );
}
