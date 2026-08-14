import React from "react";

// Baton orchestration mark: one origin node fanning to three vault nodes.
export const Mark: React.FC<{ size?: number; id?: string }> = ({ size = 64, id = "bmk" }) => (
  <svg width={size} height={size} viewBox="0 0 512 512">
    <defs>
      <linearGradient id={id} x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0" stopColor="#2f7bff" />
        <stop offset="1" stopColor="#ff5a3c" />
      </linearGradient>
    </defs>
    <g fill="none" stroke={`url(#${id})`} strokeWidth={34} strokeLinecap="round">
      <path d="M256 372 L164 184" />
      <path d="M256 372 L256 150" />
      <path d="M256 372 L348 184" />
    </g>
    <circle cx="256" cy="384" r="42" fill="#2f7bff" />
    <circle cx="164" cy="176" r="28" fill="#4f8cff" />
    <circle cx="256" cy="142" r="28" fill="#9b6bd6" />
    <circle cx="348" cy="176" r="28" fill="#ff5a3c" />
  </svg>
);
