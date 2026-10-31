import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

const PALETTE = ['#f5c451', '#ffd97a', '#ff8a00', '#e23e57', '#ff6bd6', '#7dd3fc', '#a7f3d0'];

export function FireworksCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    let last = performance.now();
    let nextLaunch = 600;
    let visible = true;
    let alive = true;
    const particles: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const burst = (x: number, y: number) => {
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const count = width < 640 ? 30 : 48;
      for (let i = 0; i < count; i += 1) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
        const speed = 0.7 + Math.random() * 2.5;
        const maxLife = 900 + Math.random() * 950;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          color,
          size: Math.random() * 1.7 + 0.6,
        });
      }
    };

    const frame = (time: number) => {
      const dt = Math.min(time - last, 48);
      last = time;
      if (!visible) {
        raf = requestAnimationFrame(frame);
        return;
      }

      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.16)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        particle.life -= dt;
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        particle.vy += 0.0018 * dt;
        particle.vx *= 0.997;
        particle.vy *= 0.997;
        particle.x += particle.vx * dt * 0.06;
        particle.y += particle.vy * dt * 0.06;
        ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      nextLaunch -= dt;
      if (nextLaunch <= 0) {
        burst(width * (0.12 + Math.random() * 0.76), height * (0.12 + Math.random() * 0.42));
        if (Math.random() > 0.65) {
          setTimeout(() => {
            if (alive) {
              burst(width * (0.2 + Math.random() * 0.6), height * (0.1 + Math.random() * 0.36));
            }
          }, 280);
        }
        nextLaunch = 1100 + Math.random() * 1700;
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    burst(width * 0.5, height * 0.32);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);
    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      particles.length = 0;
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
