import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Plus, X } from 'lucide-react';
import type { Product } from '../data/products';
import { categoryLabel } from '../data/categories';
import { site } from '../data/site';
import { useCart } from '../lib/cart';
import { formatINR } from '../lib/format';
import { useToast } from '../lib/toast';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { ProductArt } from './ProductArt';
import { QuantityStepper } from './QuantityStepper';

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const [design, setDesign] = useState<string | undefined>(undefined);
  const add = useCart((state) => state.add);
  const showToast = useToast((state) => state.show);
  useLockBodyScroll(Boolean(product));

  useEffect(() => {
    if (!product) return;
    setQty(1);
    setDesign(product.designs?.[0]);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [product, onClose]);

  const handleAdd = () => {
    if (!product) return;
    add(product.id, design, qty);
    showToast(`${product.name}${design ? ` — ${design}` : ''} added to cart`);
    onClose();
  };

  const askHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I would like to know more about ${product?.name ?? 'this item'} from the 2026 price list.`,
  )}`;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} details`}
            className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-gold/25 bg-[#120827] shadow-2xl sm:rounded-3xl"
            initial={{ y: 40, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-cream/15 bg-midnight/70 text-cream/70 transition hover:text-cream"
              aria-label="Close quick view"
            >
              <X size={17} />
            </button>

            <div className="grid gap-0 sm:grid-cols-[1.05fr_1fr]">
              <ProductArt product={product} className="aspect-[5/4] w-full sm:aspect-auto sm:h-full sm:min-h-[320px]" />

              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold/70">
                    {product.brand} · #{product.sno}
                  </p>
                  <h2 className="mt-1 font-display text-2xl leading-tight text-cream">{product.name}</h2>
                  <p className="mt-1 text-xs text-cream/45">
                    {categoryLabel(product.category)}
                    {product.unit ? ` · per ${product.unit}` : ''}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl text-gold">
                    {product.price === null ? product.priceLabel : formatINR(product.price)}
                  </span>
                  {product.price === null && (
                    <span className="text-xs text-cream/45">final price confirmed on WhatsApp</span>
                  )}
                </div>

                {product.designs?.length ? (
                  <div>
                    <p className="mb-2 text-xs font-medium text-cream/60">Choose a design</p>
                    <div className="flex flex-wrap gap-2">
                      {product.designs.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setDesign(option)}
                          className={`chip ${design === option ? 'chip-active' : ''}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/12 bg-midnight/40 px-3 py-2.5">
                  <span className="text-xs text-cream/55">Quantity</span>
                  <QuantityStepper
                    qty={qty}
                    onDecrement={() => setQty((value) => Math.max(1, value - 1))}
                    onIncrement={() => setQty((value) => Math.min(99, value + 1))}
                  />
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <button type="button" onClick={handleAdd} className="btn btn-gold w-full">
                    <Plus size={16} /> Add to cart
                    {product.price !== null && qty > 1 ? ` · ${formatINR(product.price * qty)}` : ''}
                  </button>
                  <a href={askHref} target="_blank" rel="noreferrer" className="btn btn-ghost w-full">
                    <MessageCircle size={16} /> Ask about this item
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
