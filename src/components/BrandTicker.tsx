import { brandLogos } from '../data/brandLogos';

const brands = [
  'Standard Fireworks',
  'Yuvaraj',
  'Coronation',
  'Cock',
  'Ajanta',
  'Vanitha',
  'Yes Bro',
  'Kunda',
  'Ravindra',
  'Rudra',
];

export function BrandTicker() {
  const track = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden border-y border-gold/12 bg-midnight/45 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-midnight to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-midnight to-transparent" />
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {track.map((brand, index) => {
          const logo = brandLogos[brand];
          return (
            <span
              key={`${brand}-${index}`}
              className="inline-flex items-center gap-2 font-display text-xs tracking-[0.28em] text-cream/45 whitespace-nowrap"
              aria-hidden={index >= brands.length}
            >
              {logo && (
                <img
                  src={logo}
                  alt={`${brand} logo`}
                  className="h-5 w-auto max-w-[60px] rounded bg-white/90 p-0.5 object-contain"
                />
              )}
              {brand.toUpperCase()}
              <span className="ml-8 text-gold/50">✦</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
