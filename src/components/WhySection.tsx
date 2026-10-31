import { useState } from 'react';
import { MessageCircle, ShieldCheck, Tag, Truck } from 'lucide-react';
import { site, waHref } from '../data/site';

const features = [
  {
    icon: Tag,
    title: '2026 list prices',
    body: 'Every product is priced exactly as in the 2026 price list — no hidden mark-ups at the counter.',
  },
  {
    icon: Truck,
    title: 'Home delivery',
    body: 'Local home delivery with careful packing. Delivery charges and slots confirmed on WhatsApp.',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine brands',
    body: 'Standard Fireworks, Coronation, Ajanta, Vanitha, Yes Bro and more — sourced from authorised stockists.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp checkout',
    body: 'Build the cart, add delivery details, and send the itemised order to us in one tap.',
  },
];

const gallery = [
  { src: '/images/gallery/sparklers.jpg', label: 'Sparklers & threads' },
  { src: '/images/gallery/flower-pots.jpg', label: 'Flower pots' },
  { src: '/images/gallery/shots.jpg', label: 'Shots & cakes' },
  { src: '/images/gallery/gift-boxes.jpg', label: 'Gift boxes' },
];

function GalleryTile({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  const [loaded, setLoaded] = useState(true);

  return (
    <figure className={`group relative overflow-hidden rounded-2xl border border-gold/15 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a1435] via-[#1d0c31] to-[#0d061d]" />
      {loaded && (
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          onError={() => setLoaded(false)}
          className="relative h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent px-3 py-2 text-xs font-medium text-cream/85">
        {label}
      </figcaption>
    </figure>
  );
}

export function WhySection() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      <div className="divider-gold mb-14" />
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-gold/70">Why order with us</p>
          <h2 className="mt-2 font-display text-3xl leading-tight text-cream sm:text-4xl">
            A festival shop, <span className="gold-text">now on your phone</span>
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/55">
            Same trusted counter, same 2026 rates — with a cart that remembers your picks and a
            checkout that lands directly in our WhatsApp inbox.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-gold/12 bg-midnight/40 p-4">
                <feature.icon size={18} className="text-gold" />
                <h3 className="mt-2.5 text-sm font-semibold text-cream">{feature.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-cream/45">{feature.body}</p>
              </div>
            ))}
          </div>

          <a
            href={waHref('Hi, I would like to check availability and delivery for my Diwali order.')}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost mt-6"
          >
            <MessageCircle size={15} /> Ask about delivery
          </a>
          <p className="mt-3 text-[11px] text-cream/30">{site.deliveryNote}</p>
        </div>

        <div className="grid h-full grid-cols-2 grid-rows-2 gap-3">
          <GalleryTile {...gallery[0]} className="col-span-2 row-span-1 aspect-[2/1] sm:aspect-[2/1]" />
          <GalleryTile {...gallery[1]} className="aspect-square" />
          <GalleryTile {...gallery[2]} className="aspect-square" />
          <GalleryTile {...gallery[3]} className="col-span-2 aspect-[2/1]" />
        </div>
      </div>
    </section>
  );
}
