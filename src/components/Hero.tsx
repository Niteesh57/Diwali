import { useState } from 'react';
import { ChevronDown, MessageCircle, Sparkles, Truck } from 'lucide-react';
import { site, waHref } from '../data/site';
import { Countdown } from './Countdown';
import { DiyaRow } from './DiyaRow';
import { FireworksCanvas } from './FireworksCanvas';

const stats = [
  { value: '145', label: 'products listed' },
  { value: '12+', label: 'top brands' },
  { value: '8 Nov', label: 'Deepavali 2026' },
];

export function Hero() {
  const [photoVisible, setPhotoVisible] = useState(true);

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <FireworksCanvas className="h-full w-full opacity-90" />
        {photoVisible && (
          <img
            src="/images/hero/diwali-night.jpg"
            alt=""
            aria-hidden="true"
            onError={() => setPhotoVisible(false)}
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/40 via-midnight/55 to-midnight" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-4 pb-16 pt-14 sm:px-6 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-gold-soft">
            <Sparkles size={13} />
            {site.season} · price list out
          </span>

          <h1
            className="animate-rise mt-6 font-display text-[2.6rem] leading-[1.05] text-cream sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            Light up Deepavali with
            <span className="gold-text block">crackers worth the sky</span>
          </h1>

          <p
            className="animate-rise mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base"
            style={{ animationDelay: '160ms' }}
          >
            The complete 2026 fireworks price list — standard and premium brands, honest prices,
            and a WhatsApp checkout that takes your order straight to our counter.
          </p>

          <div
            className="animate-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '240ms' }}
          >
            <a href="#shop" className="btn btn-gold w-full sm:w-auto">
              Browse the 2026 catalogue
              <ChevronDown size={16} />
            </a>
            <a
              href={waHref('Hi, I would like to order Diwali crackers from the 2026 price list.')}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline w-full sm:w-auto"
            >
              <MessageCircle size={16} />
              Order on WhatsApp
            </a>
          </div>

          <div className="animate-rise mt-9 flex flex-col items-center gap-5" style={{ animationDelay: '320ms' }}>
            <Countdown />
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-cream/45">
              {stats.map((stat) => (
                <span key={stat.label} className="flex items-center gap-1.5">
                  <span className="font-display text-sm text-gold-soft">{stat.value}</span>
                  {stat.label}
                </span>
              ))}
              <span className="flex items-center gap-1.5">
                <Truck size={13} className="text-gold/70" /> home delivery
              </span>
            </div>
          </div>
        </div>

        <DiyaRow className="mt-14 opacity-95" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-midnight to-transparent" />
    </section>
  );
}
