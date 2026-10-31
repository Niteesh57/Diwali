import { useMemo, type CSSProperties } from 'react';

const COLORS = ['#f5c451', '#ff8a00', '#e23e57', '#7dd3fc', '#a7f3d0', '#ffe7ad'];

export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }).map((_, index) => ({
        id: index,
        left: Math.random() * 100,
        dx: `${(Math.random() - 0.5) * 240}px`,
        rot: `${Math.random() * 900 - 450}deg`,
        duration: `${1.8 + Math.random() * 1.6}s`,
        delay: `${Math.random() * 0.45}s`,
        color: COLORS[index % COLORS.length],
        width: 5 + Math.random() * 6,
        height: 8 + Math.random() * 8,
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={
            {
              left: `${piece.left}%`,
              background: piece.color,
              width: piece.width,
              height: piece.height,
              animationDelay: piece.delay,
              '--dx': piece.dx,
              '--rot': piece.rot,
              '--duration': piece.duration,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
