import { ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../data/products';
import type { Product } from '../data/products';
import { formatINR } from '../lib/format';
import { ProductArt } from './ProductArt';

const glasses = products.find((product) => product.id === 'ex-145');

export function ExclusiveBanner({ onOpen }: { onOpen: (product: Product) => void }) {
  if (!glasses) return null;

  return (
    <section id="exclusive" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-[#3a1435] via-[#1d0c31] to-[#0d061d] p-6 sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-ember/10 blur-3xl" />

        <div className="relative grid items-center gap-6 sm:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
              <Sparkles size={12} /> Only available with us
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-cream sm:text-4xl">
              5D Pataka Glasses
              <span className="gold-text block">see the sky in a new dimension</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/55">
              Our exclusive 2026 add-on — pick Love, Smiley or Butterfly lenses and watch every
              burst turn into a 3D spectacle.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {glasses.designs?.map((design) => (
                <span key={design} className="chip !cursor-default">
                  {design}
                </span>
              ))}
              <span className="ml-1 font-display text-xl text-gold">
                {glasses.price !== null ? `${formatINR(glasses.price)} each` : glasses.priceLabel}
              </span>
            </div>
            <button type="button" className="btn btn-gold mt-5" onClick={() => onOpen(glasses)}>
              Pick your design
              <ArrowRight size={16} />
            </button>
          </div>

          <ProductArt product={glasses} className="aspect-[5/4] w-full max-w-sm justify-self-center rounded-2xl border border-gold/15" />
        </div>
      </div>
    </section>
  );
}
