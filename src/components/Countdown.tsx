import { site } from '../data/site';
import { useCountdown } from '../hooks/useCountdown';

const labels = ['Days', 'Hours', 'Mins', 'Secs'] as const;

export function Countdown() {
  const { days, hours, minutes, seconds, finished } = useCountdown(site.diwaliDate);
  const values = [days, hours, minutes, seconds];

  if (finished) {
    return (
      <p className="text-sm font-medium tracking-wide text-gold-soft">
        Happy Diwali! Wishing you a sparkling festival of lights.
      </p>
    );
  }

  return (
    <div className="flex items-stretch gap-2 sm:gap-3" aria-label="Countdown to Diwali 2026">
      {values.map((value, index) => (
        <div
          key={labels[index]}
          className="min-w-[58px] rounded-xl border border-gold/20 bg-midnight/55 px-3 py-2 text-center backdrop-blur sm:min-w-[68px]"
        >
          <span className="block font-display text-xl text-gold-soft sm:text-2xl">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-[0.16em] text-cream/50">
            {labels[index]}
          </span>
        </div>
      ))}
    </div>
  );
}
