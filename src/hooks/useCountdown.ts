import { useEffect, useState } from 'react';

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

function remaining(target: string): Countdown {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    finished: false,
  };
}

export function useCountdown(target: string) {
  const [countdown, setCountdown] = useState(() => remaining(target));

  useEffect(() => {
    const id = setInterval(() => setCountdown(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return countdown;
}
