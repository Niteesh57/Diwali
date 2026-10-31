import { Clock, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { site, telHref, waHref } from '../data/site';

export function Footer() {
  return (
    <footer id="contact" className="border-t border-gold/12 bg-[#08041a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl text-cream">Diwali Crackers 2026</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-gold/70">Premium & Standard Fireworks</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/50">
            The complete 2026 price list for sparklers, flower pots, rockets, comets, shots and gift
            boxes. Build your cart and send the order straight to our WhatsApp.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">Talk to us</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/60">
            <li>
              <a href={telHref(site.phonePrimary)} className="flex items-center gap-2 transition hover:text-gold-soft">
                <Phone size={14} className="text-gold/70" /> +91 {site.phonePrimary}
              </a>
            </li>
            <li>
              <a href={telHref(site.phoneSecondary)} className="flex items-center gap-2 transition hover:text-gold-soft">
                <Phone size={14} className="text-gold/70" /> +91 {site.phoneSecondary}
              </a>
            </li>
            <li>
              <a
                href={waHref('Hi, I have a question about the 2026 cracker price list.')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 transition hover:text-gold-soft"
              >
                <MessageCircle size={14} className="text-gold/70" /> WhatsApp orders
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={14} className="mt-0.5 shrink-0 text-gold/70" />
              <span>Open daily · 9:00 am to 9:30 pm (season hours)</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">Delivery</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/60">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0 text-gold/70" />
              <span>{site.address}</span>
            </li>
            <li className="leading-relaxed text-cream/50">{site.deliveryNote}</li>
            <li className="flex items-start gap-2 text-cream/50">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-gold/70" />
              <span>{site.licence}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">Good to know</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/55">
            <li><a href="#shop" className="transition hover:text-gold-soft">Full 2026 price list</a></li>
            <li><a href="#exclusive" className="transition hover:text-gold-soft">Exclusive 5D glasses</a></li>
            <li><a href="#why" className="transition hover:text-gold-soft">Why order with us</a></li>
            <li className="pt-2 text-[11px] leading-relaxed text-cream/35">{site.safetyNote}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[11px] text-cream/30 sm:flex-row sm:px-6">
          <span>© 2026 {site.name}. Prices as per the 2026 price list, subject to availability.</span>
          <span>No online payment · orders confirmed on WhatsApp</span>
        </div>
      </div>
    </footer>
  );
}
