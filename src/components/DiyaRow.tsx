const diyas = [
  { delay: '0s', size: 1 },
  { delay: '0.4s', size: 0.86 },
  { delay: '0.8s', size: 1.08 },
  { delay: '1.2s', size: 0.9 },
  { delay: '0.2s', size: 1 },
];

function Diya({ delay, size }: { delay: string; size: number }) {
  return (
    <div
      className="animate-float"
      style={{ animationDelay: delay, transform: `scale(${size})` }}
      aria-hidden="true"
    >
      <svg width="62" height="58" viewBox="0 0 62 58" fill="none">
        <ellipse cx="31" cy="49" rx="24" ry="6" fill="url(#diya-glow)" opacity="0.5" />
        <path
          d="M8 38c0 8 10 13 23 13s23-5 23-13c0-2-1-3-3-3H11c-2 0-3 1-3 3Z"
          fill="url(#diya-bowl)"
          stroke="#8a5a1c"
          strokeWidth="1"
        />
        <path d="M8 38h46c-4 4-13 6-23 6s-19-2-23-6Z" fill="#2a1206" opacity="0.45" />
        <g className="animate-flicker" style={{ animationDelay: delay }}>
          <path
            d="M31 16c4 6 7 9 7 14a7 7 0 1 1-14 0c0-5 3-8 7-14Z"
            fill="url(#diya-flame)"
          />
          <path d="M31 23c2 3 3 5 3 7a3 3 0 1 1-6 0c0-2 1-4 3-7Z" fill="#fffbe8" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

export function DiyaRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-end justify-center gap-3 sm:gap-6 ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="diya-bowl" x1="8" y1="35" x2="54" y2="51" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c9762a" />
            <stop offset="1" stopColor="#6b3410" />
          </linearGradient>
          <linearGradient id="diya-flame" x1="31" y1="16" x2="31" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fff6c9" />
            <stop offset="0.5" stopColor="#ffc247" />
            <stop offset="1" stopColor="#ff7a00" />
          </linearGradient>
          <radialGradient id="diya-glow" cx="0.5" cy="0.5" r="0.5">
            <stop stopColor="#ffb43a" />
            <stop offset="1" stopColor="#ffb43a" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {diyas.map((diya, index) => (
        <Diya key={index} delay={diya.delay} size={diya.size} />
      ))}
    </div>
  );
}
