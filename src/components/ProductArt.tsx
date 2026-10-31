import { useId, type ReactElement } from 'react';
import type { CategoryKey } from '../data/categories';
import { categoryMap } from '../data/categories';
import type { Product } from '../data/products';

type SceneProps = { accent: string };

function SceneSparkles({ accent }: SceneProps) {
  return (
    <g transform="rotate(-16 100 84)">
      <line x1="56" y1="128" x2="128" y2="54" stroke="#8a7a63" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="56" y1="128" x2="128" y2="54" stroke="#e3d5bb" strokeWidth="1.2" strokeDasharray="1 4" />
      <g className="animate-pulse-glow">
        <circle cx="131" cy="51" r="3.4" fill="#fff8dc" />
        {Array.from({ length: 8 }).map((_, index) => {
          const angle = (Math.PI * 2 * index) / 8;
          const inner = 7;
          const outer = index % 2 === 0 ? 21 : 15;
          return (
            <line
              key={index}
              x1={131 + Math.cos(angle) * inner}
              y1={51 + Math.sin(angle) * inner}
              x2={131 + Math.cos(angle) * outer}
              y2={51 + Math.sin(angle) * outer}
              stroke={accent}
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </g>
  );
}

function SceneSpinner({ accent }: SceneProps) {
  return (
    <g>
      <g className="animate-spin-slow">
        <circle cx="100" cy="82" r="32" fill="none" stroke={accent} strokeWidth="2.4" strokeDasharray="7 9" />
        {Array.from({ length: 6 }).map((_, index) => (
          <line
            key={index}
            x1="100"
            y1="82"
            x2="100"
            y2="53"
            stroke={accent}
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.8"
            transform={`rotate(${index * 60} 100 82)`}
          />
        ))}
        <circle cx="100" cy="82" r="7" fill={accent} />
      </g>
      <path d="M52 82a48 48 0 0 1 96 0" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="2 9" opacity="0.55" />
      <circle cx="140" cy="54" r="2" fill={accent} className="animate-twinkle" />
      <circle cx="62" cy="112" r="2.4" fill={accent} className="animate-twinkle" style={{ animationDelay: '0.9s' }} />
    </g>
  );
}

function SceneFlowerPot({ accent }: SceneProps) {
  return (
    <g>
      <path d="M76 105h48l-7 33H83l-7-33Z" fill="#6b3410" stroke="#c9762a" strokeWidth="1.6" />
      <rect x="71" y="98" width="58" height="9" rx="4.5" fill="#c9762a" />
      {[-38, -20, 0, 20, 38].map((spread, index) => (
        <g key={spread}>
          <path
            d={`M100 96 C ${100 + spread * 0.4} 70, ${100 + spread * 0.8} 48, ${100 + spread} 30`}
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            opacity={0.85}
          />
          <circle cx={100 + spread} cy="30" r={index % 2 === 0 ? 3.2 : 2.2} fill="#fff4d2" className="animate-twinkle" style={{ animationDelay: `${index * 0.25}s` }} />
        </g>
      ))}
      <ellipse cx="100" cy="140" rx="30" ry="4" fill={accent} opacity="0.18" />
    </g>
  );
}

function ScenePencil({ accent }: SceneProps) {
  return (
    <g transform="rotate(28 100 82)">
      <rect x="89" y="46" width="22" height="70" rx="7" fill="#f7ead0" stroke="#c9a86a" strokeWidth="1.4" />
      <rect x="89" y="46" width="22" height="12" rx="6" fill={accent} />
      <path d="M92 116h16l-8 16-8-16Z" fill="#e9dcbf" />
      {['#ff6b6b', '#7dd3fc', '#a7f3d0'].map((color, index) => (
        <circle key={color} cx={100} cy={70 + index * 14} r="5" fill={color} opacity="0.9" />
      ))}
      <circle cx="100" cy="40" r="3" fill="#ffe7ad" className="animate-flicker" />
    </g>
  );
}

function SceneBomb({ accent }: SceneProps) {
  return (
    <g>
      <path d="M124 56c10-14 24-10 26 2" fill="none" stroke="#bda37a" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="151" cy="56" r="3" fill="#fff6c9" className="animate-twinkle" />
      <circle cx="100" cy="94" r="33" fill="#241a34" stroke={accent} strokeWidth="2" />
      <circle cx="88" cy="82" r="9" fill="#ffffff" opacity="0.12" />
      <circle cx="100" cy="94" r="33" fill="none" stroke="#000" strokeWidth="1" opacity="0.4" />
      <path d="M100 61v10" stroke="#6b5a7e" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
}

function SceneFancy({ accent }: SceneProps) {
  return (
    <g className="animate-float">
      <path d="M100 92C74 64 52 70 54 88c2 20 30 22 46 4Z" fill={accent} opacity="0.55" stroke={accent} strokeWidth="1.6" />
      <path d="M100 92c26-28 48-22 46-4-2 20-30 22-46 4Z" fill={accent} opacity="0.35" stroke={accent} strokeWidth="1.6" />
      <ellipse cx="100" cy="90" rx="5" ry="17" fill="#2a1020" stroke={accent} strokeWidth="1.4" />
      <path d="M98 74c-6-8-12-10-16-8M102 74c6-8 12-10 16-8" fill="none" stroke={accent} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="82" cy="80" r="2" fill="#fff4d2" className="animate-twinkle" />
      <circle cx="118" cy="80" r="2" fill="#fff4d2" className="animate-twinkle" style={{ animationDelay: '0.7s' }} />
    </g>
  );
}

function SceneGiftBox({ accent }: SceneProps) {
  return (
    <g>
      <rect x="70" y="80" width="60" height="42" rx="5" fill="#3a1a20" stroke={accent} strokeWidth="1.8" />
      <rect x="63" y="66" width="74" height="17" rx="4" fill="#4a2028" stroke={accent} strokeWidth="1.8" />
      <rect x="94" y="66" width="12" height="56" fill={accent} opacity="0.9" />
      <path d="M100 66c-12-2-20-8-16-14 4-6 14 0 16 8 2-8 12-14 16-8 4 6-4 12-16 14Z" fill={accent} />
      <circle cx="84" cy="100" r="2" fill="#fff4d2" className="animate-twinkle" />
      <circle cx="116" cy="108" r="2" fill="#fff4d2" className="animate-twinkle" style={{ animationDelay: '0.6s' }} />
    </g>
  );
}

function SceneWala({ accent }: SceneProps) {
  return (
    <g>
      {[72, 100, 128].map((x, row) => (
        <g key={x}>
          <path d={`M${x} 32 C ${x - 6} 60, ${x + 6} 92, ${x} 130`} fill="none" stroke="#a8845a" strokeWidth="1.2" />
          {Array.from({ length: 6 }).map((_, index) => (
            <rect
              key={index}
              x={x - 6}
              y={42 + index * 14}
              width="12"
              height="8"
              rx="2"
              fill={accent}
              opacity={0.35 + row * 0.18}
              transform={`rotate(${index % 2 === 0 ? -8 : 8} ${x} ${46 + index * 14})`}
            />
          ))}
        </g>
      ))}
      <circle cx="100" cy="28" r="4" fill="#fff4d2" className="animate-pulse-glow" />
      <path d="M92 28h16M100 20v16" stroke={accent} strokeWidth="1.5" opacity="0.8" />
    </g>
  );
}

function SceneComet({ accent }: SceneProps) {
  return (
    <g>
      <path d="M128 40 62 118" stroke={accent} strokeWidth="10" strokeLinecap="round" opacity="0.12" />
      <path d="M128 40 58 120" stroke="#ffd97a" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" opacity="0.8" />
      <circle cx="130" cy="38" r="16" fill={accent} opacity="0.9" />
      <circle cx="130" cy="38" r="26" fill={accent} opacity="0.16" />
      <circle cx="124" cy="32" r="4" fill="#fff8dc" opacity="0.9" />
      <circle cx="60" cy="96" r="2" fill="#fff4d2" className="animate-twinkle" />
      <circle cx="74" cy="122" r="1.8" fill="#fff4d2" className="animate-twinkle" style={{ animationDelay: '0.5s' }} />
    </g>
  );
}

function SceneShots({ accent }: SceneProps) {
  const tubes = [-36, -18, 0, 18, 36];
  return (
    <g>
      {tubes.map((offset, index) => (
        <g key={offset}>
          <rect
            x={100 + offset - 7}
            y={106 + Math.abs(offset) * 0.18}
            width="14"
            height="28"
            rx="3"
            fill="#2c1736"
            stroke={accent}
            strokeWidth="1.4"
          />
          <circle
            cx={100 + offset}
            cy={94 + Math.abs(offset) * 0.1}
            r={index === 2 ? 9 : 6}
            fill="none"
            stroke={accent}
            strokeWidth="1.5"
            opacity="0.85"
          />
        </g>
      ))}
      <path d="M46 148h108" stroke={accent} strokeWidth="2" opacity="0.25" strokeLinecap="round" />
      <circle cx="100" cy="72" r="3" fill="#fff8dc" className="animate-twinkle" />
      <circle cx="64" cy="86" r="2.2" fill={accent} className="animate-twinkle" style={{ animationDelay: '0.4s' }} />
      <circle cx="138" cy="82" r="2.2" fill={accent} className="animate-twinkle" style={{ animationDelay: '0.9s' }} />
    </g>
  );
}

function ScenePeacock({ accent }: SceneProps) {
  return (
    <g>
      {[-54, -36, -18, 0, 18, 36, 54].map((angle, index) => (
        <g key={angle} transform={`rotate(${angle} 100 118)`}>
          <ellipse
            cx="100"
            cy="72"
            rx="13"
            ry="38"
            fill={index % 2 === 0 ? accent : '#3b8f7a'}
            opacity={0.28 + (index % 3) * 0.12}
            stroke={accent}
            strokeWidth="1.1"
          />
          <circle cx="100" cy="42" r="4.5" fill={index % 2 === 0 ? '#f5c451' : '#7dd3fc'} opacity="0.9" />
        </g>
      ))}
      <circle cx="100" cy="118" r="13" fill="#1f6b5a" stroke={accent} strokeWidth="1.6" />
      <circle cx="100" cy="112" r="4" fill={accent} />
    </g>
  );
}

function SceneRocket({ accent }: SceneProps) {
  return (
    <g transform="rotate(-24 100 84)">
      <path d="M100 30c12 14 18 30 18 46H82c0-16 6-32 18-46Z" fill="#f2e6cc" stroke={accent} strokeWidth="1.8" />
      <circle cx="100" cy="62" r="7" fill="#24314a" stroke={accent} strokeWidth="1.4" />
      <path d="M82 70 64 94l18-4V70ZM118 70l18 24-18-4V70Z" fill={accent} opacity="0.85" />
      <path d="M92 98h16l-8 22-8-22Z" fill="#ff8a00" />
      <path d="M96 118h8l-4 14-4-14Z" fill="#ffd97a" className="animate-flicker" />
      <circle cx="70" cy="118" r="3" fill="#cbd5e1" opacity="0.35" />
      <circle cx="60" cy="130" r="4" fill="#cbd5e1" opacity="0.22" />
    </g>
  );
}

function SceneLadi({ accent }: SceneProps) {
  return (
    <g>
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 5 }).map((__, col) => (
          <rect
            key={`${row}-${col}`}
            x={64 + col * 15}
            y={54 + row * 19}
            width="11"
            height="14"
            rx="2"
            fill={row % 2 === 0 ? accent : '#b45309'}
            opacity={0.45 + (row + col) * 0.05}
            transform={`rotate(${(row + col) % 2 === 0 ? -4 : 4} ${69.5 + col * 15} ${61 + row * 19})`}
          />
        )),
      )}
      <path d="M129 56c14-14 24-8 26 4" fill="none" stroke="#d9c39a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="156" cy="60" r="3" fill="#fff6c9" className="animate-twinkle" />
    </g>
  );
}

function SceneRollCap({ accent }: SceneProps) {
  return (
    <g>
      <circle cx="128" cy="60" r="17" fill="none" stroke={accent} strokeWidth="3" />
      <circle cx="128" cy="60" r="9" fill="none" stroke={accent} strokeWidth="1.4" opacity="0.6" />
      <path d="M66 94h40v-14h-14l-4-14H72l-6 14Z" fill="#2f2440" stroke={accent} strokeWidth="1.6" />
      <rect x="66" y="94" width="22" height="22" rx="5" fill="#3a2b52" stroke={accent} strokeWidth="1.4" />
      <path d="M100 92h14" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <circle cx="86" cy="106" r="2" fill="#fff4d2" className="animate-twinkle" />
    </g>
  );
}

function SceneVanitha({ accent }: SceneProps) {
  return (
    <g>
      <g className="animate-float">
        {Array.from({ length: 8 }).map((_, index) => (
          <ellipse
            key={index}
            cx="100"
            cy="76"
            rx="9"
            ry="26"
            fill={index % 2 === 0 ? accent : '#7dd3fc'}
            opacity="0.35"
            stroke={accent}
            strokeWidth="1"
            transform={`rotate(${index * 45} 100 100)`}
          />
        ))}
        <circle cx="100" cy="100" r="12" fill="#2a1020" stroke={accent} strokeWidth="1.6" />
        <circle cx="100" cy="100" r="4" fill="#fff4d2" className="animate-pulse-glow" />
      </g>
      <path d="M78 134h44" stroke={accent} strokeWidth="2" opacity="0.35" strokeLinecap="round" />
    </g>
  );
}

function SceneToyGun({ accent }: SceneProps) {
  return (
    <g>
      <path d="M60 84h58v-16h-20l-6-16H66l-6 16Z" fill="#2b3a55" stroke={accent} strokeWidth="1.6" />
      <rect x="58" y="84" width="24" height="26" rx="6" fill="#354866" stroke={accent} strokeWidth="1.4" />
      <path d="M118 76h18" stroke={accent} strokeWidth="4" strokeLinecap="round" />
      <circle cx="78" cy="96" r="3" fill={accent} />
      <path d="M134 96c12-2 18 8 12 16" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="3 5" />
      <circle cx="150" cy="120" r="2.4" fill="#fff4d2" className="animate-twinkle" />
    </g>
  );
}

function SceneExclusive({ accent }: SceneProps) {
  return (
    <g>
      <rect x="42" y="62" width="50" height="34" rx="12" fill="#ff6b6b" opacity="0.45" stroke={accent} strokeWidth="2" />
      <rect x="108" y="62" width="50" height="34" rx="12" fill="#7dd3fc" opacity="0.45" stroke={accent} strokeWidth="2" />
      <path d="M92 74c4-6 12-6 16 0" fill="none" stroke={accent} strokeWidth="2.4" />
      <path d="M42 70 26 62M158 70l16-8" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M100 34l4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" fill="#fff4d2" className="animate-pulse-glow" />
      <circle cx="64" cy="118" r="2" fill={accent} className="animate-twinkle" />
      <circle cx="136" cy="118" r="2" fill={accent} className="animate-twinkle" style={{ animationDelay: '0.6s' }} />
    </g>
  );
}

function renderScene(category: CategoryKey, accent: string): ReactElement {
  const props = { accent };
  switch (category) {
    case 'sparkles':
      return <SceneSparkles {...props} />;
    case 'spinners':
      return <SceneSpinner {...props} />;
    case 'flower-pots':
      return <SceneFlowerPot {...props} />;
    case 'pencils':
      return <ScenePencil {...props} />;
    case 'bombs':
      return <SceneBomb {...props} />;
    case 'fancy':
      return <SceneFancy {...props} />;
    case 'gift-boxes':
      return <SceneGiftBox {...props} />;
    case 'walas':
      return <SceneWala {...props} />;
    case 'comets':
      return <SceneComet {...props} />;
    case 'shots':
      return <SceneShots {...props} />;
    case 'peacocks':
      return <ScenePeacock {...props} />;
    case 'rockets':
      return <SceneRocket {...props} />;
    case 'ladi':
      return <SceneLadi {...props} />;
    case 'roll-caps':
      return <SceneRollCap {...props} />;
    case 'vanitha':
      return <SceneVanitha {...props} />;
    case 'toy-guns':
      return <SceneToyGun {...props} />;
    case 'exclusive':
      return <SceneExclusive {...props} />;
    default:
      return <SceneSparkles {...props} />;
  }
}

export function ProductArt({
  product,
  className = '',
  animated = true,
}: {
  product: Product;
  className?: string;
  animated?: boolean;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const accent = categoryMap.get(product.category)?.accent ?? '#f5c451';
  const tilt = ((product.sno % 7) - 3) * 0.6;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a1338" />
            <stop offset="55%" stopColor="#170b2b" />
            <stop offset="100%" stopColor="#0d061d" />
          </linearGradient>
          <radialGradient id={`glow${uid}`} cx="50%" cy="52%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.34" />
            <stop offset="70%" stopColor={accent} stopOpacity="0.06" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="200" height="160" fill={`url(#bg${uid})`} />
        <circle cx="100" cy="84" r="74" fill={`url(#glow${uid})`} />
        <g opacity="0.5">
          <circle cx="28" cy="30" r="1.4" fill="#fff4d2" className={animated ? 'animate-twinkle' : ''} />
          <circle cx="172" cy="42" r="1.2" fill="#fff4d2" className={animated ? 'animate-twinkle' : ''} style={{ animationDelay: '0.7s' }} />
          <circle cx="158" cy="122" r="1.6" fill="#fff4d2" className={animated ? 'animate-twinkle' : ''} style={{ animationDelay: '1.3s' }} />
          <circle cx="40" cy="124" r="1.1" fill="#fff4d2" className={animated ? 'animate-twinkle' : ''} style={{ animationDelay: '1.9s' }} />
        </g>
        <g transform={`rotate(${tilt} 100 80)`}>{renderScene(product.category, accent)}</g>
      </svg>
    </div>
  );
}
