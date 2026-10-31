import { useEffect, useState } from 'react';
import { MessageCircle, Search, ShoppingBag } from 'lucide-react';
import { site, waHref } from '../data/site';
import { useCart, cartSummary } from '../lib/cart';

export function Header({
  query,
  onQueryChange,
  onOpenCart,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onOpenCart: () => void;
}) {
  const lines = useCart((state) => state.lines);
  const { itemCount } = cartSummary(lines);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'glass shadow-[0_18px_40px_-30px_rgba(0,0,0,0.9)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-gold/35 bg-gold/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3c2.2 3.4 4 5.1 4 8a4 4 0 1 1-8 0c0-2.9 1.8-4.6 4-8Z"
                fill="url(#header-flame)"
                className="animate-flicker"
              />
              <path d="M4 17c2 2.4 4.8 3.6 8 3.6s6-1.2 8-3.6" stroke="#f5c451" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
              <defs>
                <linearGradient id="header-flame" x1="12" y1="3" x2="12" y2="15" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff6c9" />
                  <stop offset="0.55" stopColor="#ffc247" />
                  <stop offset="1" stopColor="#ff7a00" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm tracking-wide text-cream sm:text-base">
              Diwali Crackers
            </span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-gold/70">2026</span>
          </span>
        </a>

        <nav className="ml-4 hidden items-center gap-5 text-xs font-medium text-cream/60 lg:flex">
          <a href="#shop" className="transition hover:text-gold-soft">Price list</a>
          <a href="#exclusive" className="transition hover:text-gold-soft">Exclusive</a>
          <a href="#why" className="transition hover:text-gold-soft">Why us</a>
          <a href="#contact" className="transition hover:text-gold-soft">Contact</a>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <label className="hidden items-center gap-2 rounded-full border border-gold/20 bg-midnight/50 px-3 py-1.5 md:flex">
            <Search size={14} className="text-cream/40" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search crackers…"
              aria-label="Search crackers"
              className="w-36 bg-transparent text-xs text-cream placeholder:text-cream/35 focus:outline-none lg:w-48"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                className="text-[10px] uppercase tracking-wide text-cream/40 hover:text-gold"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </label>

          <a
            href={waHref('Hi, I would like to order Diwali crackers from the 2026 price list.')}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost hidden !px-3 !py-2 !text-xs sm:inline-flex"
          >
            <MessageCircle size={14} />
            <span className="hidden lg:inline">Order on WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={onOpenCart}
            className="btn btn-gold relative !px-3 !py-2 !text-xs"
            aria-label={`Open cart, ${itemCount} items`}
          >
            <ShoppingBag size={15} />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span
                key={itemCount}
                className="animate-pop ml-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#2a1704] px-1 text-[10px] font-bold text-gold-soft"
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
