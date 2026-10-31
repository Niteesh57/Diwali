import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

export function SparklerTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let raf = 0;
    const sparks: Spark[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const emit = (x: number, y: number, amount: number, power = 1) => {
      for (let i = 0; i < amount; i += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 * power;
        const maxLife = 380 + Math.random() * 520;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          size: Math.random() * 1.5 + 0.5,
          hue: 38 + Math.random() * 18,
        });
      }
      if (sparks.length > 260) sparks.splice(0, sparks.length - 260);
    };

    let lastEmit = 0;
    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastEmit < 16) return;
      lastEmit = now;
      emit(event.clientX, event.clientY, 2);
    };
    const onDown = (event: PointerEvent) => emit(event.clientX, event.clientY, 18, 2.4);

    const frame = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const spark = sparks[i];
        spark.life -= 16;
        if (spark.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        spark.vy += 0.012;
        spark.vx *= 0.985;
        spark.vy *= 0.985;
        spark.x += spark.vx;
        spark.y += spark.vy;
        ctx.globalAlpha = Math.max(0, spark.life / spark.maxLife) * 0.9;
        ctx.fillStyle = `hsl(${spark.hue} 100% 68%)`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 hidden h-full w-full md:block"
      aria-hidden="true"
    />
  );
}
