import { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import type { Product } from '../data/products';
import { categoryLabel } from '../data/categories';
import { lineKey, useCart } from '../lib/cart';
import { formatINR } from '../lib/format';
import { useToast } from '../lib/toast';
import { ProductArt } from './ProductArt';
import { QuantityStepper } from './QuantityStepper';

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  const qty = useCart((state) =>
    state.lines.reduce((sum, line) => (line.productId === product.id ? sum + line.qty : sum), 0),
  );
  const add = useCart((state) => state.add);
  const increment = useCart((state) => state.increment);
  const decrement = useCart((state) => state.decrement);
  const showToast = useToast((state) => state.show);
  const [justAdded, setJustAdded] = useState(false);
  const accent = product.category;

  const handleAdd = () => {
    if (product.designs?.length) {
      onOpen(product);
      return;
    }
    add(product.id);
    setJustAdded(true);
    showToast(`${product.name} added to cart`);
    window.setTimeout(() => setJustAdded(false), 1300);
  };

  return (
    <article className="card-surface group flex flex-col overflow-hidden rounded-2xl">
      <div className="relative">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="block w-full text-left"
          aria-label={`View ${product.name}`}
        >
          <ProductArt product={product} className="aspect-[5/4] w-full" />
        </button>
        <span className="pointer-events-none absolute left-2.5 top-2.5 rounded-full border border-gold/25 bg-midnight/75 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold-soft/90 backdrop-blur">
          {product.brand}
        </span>
        {product.isNew2026 && (
          <span className="pointer-events-none absolute right-2.5 top-2.5 rounded-full bg-gradient-to-r from-[#ffd97a] to-[#e89a1f] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#2a1704]">
            New 2026
          </span>
        )}
        <span className="pointer-events-none absolute bottom-2 right-2.5 text-[10px] font-medium tracking-wider text-cream/35">
          #{product.sno}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3.5">
        <div className="flex-1">
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="block text-left"
          >
            <h3 className="line-clamp-2 min-h-[2.6rem] text-[0.95rem] font-semibold leading-snug text-cream transition group-hover:text-gold-soft">
              {product.name}
            </h3>
          </button>
          <p className="mt-1 text-[11px] text-cream/40">
            {categoryLabel(accent)}
            {product.unit ? ` · per ${product.unit}` : ''}
          </p>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div>
            <span className="block font-display text-lg leading-none text-gold-soft">
              {product.price === null ? product.priceLabel : formatINR(product.price)}
            </span>
            {product.price === null && (
              <span className="text-[10px] text-cream/40">price confirmed on call</span>
            )}
          </div>

          {product.designs?.length ? (
            <button type="button" onClick={() => onOpen(product)} className="btn btn-ghost !px-3 !py-1.5 !text-xs">
              Choose design
            </button>
          ) : qty > 0 ? (
            <QuantityStepper
              qty={qty}
              compact
              onDecrement={() => decrement(lineKey(product.id))}
              onIncrement={() => increment(lineKey(product.id))}
            />
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              className={`btn ${justAdded ? 'btn-outline' : 'btn-gold'} !px-3 !py-1.5 !text-xs`}
              aria-label={`Add ${product.name} to cart`}
            >
              {justAdded ? (
                <>
                  <Check size={13} /> Added
                </>
              ) : (
                <>
                  <Plus size={13} /> Add
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
