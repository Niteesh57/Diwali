import { Minus, Plus } from 'lucide-react';
import type { Product } from '../data/products';
import { lineKey, useCart } from '../lib/cart';
import { formatINR } from '../lib/format';
import { useToast } from '../lib/toast';
import { BrandThumb } from './BrandThumb';

export function ProductRow({
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

  const handleAdd = () => {
    if (product.designs?.length) {
      onOpen(product);
      return;
    }
    add(product.id);
    showToast(`${product.name} added to cart`);
  };

  return (
    <li className="flex items-center gap-3 border-b border-[#eadcc6] px-1 py-3 last:border-0 sm:px-2">
      <BrandThumb product={product} />

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => onOpen(product)}
          className="line-clamp-2 block max-w-full text-left text-[13px] font-semibold leading-snug text-[#2b1420] transition hover:text-[#a30d2d] sm:text-sm"
        >
          {product.name}
        </button>
        <p className="mt-0.5 truncate text-[10.5px] text-[#93795f]">
          {product.brand}
          {product.unit ? ` · per ${product.unit}` : ''}
          {product.designs?.length ? ` · ${product.designs.length} designs` : ''}
        </p>
        <p className="mt-0.5 text-sm font-bold text-[#a30d2d]">
          {product.price === null ? product.priceLabel : formatINR(product.price)}
          {product.price === null && (
            <span className="ml-1 text-[10px] font-normal text-[#93795f]">on request</span>
          )}
        </p>
      </div>

      <div className="shrink-0">
        {product.designs?.length ? (
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="rounded-full bg-[#a30d2d] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#8b0a26]"
          >
            Choose
          </button>
        ) : qty > 0 ? (
          <div className="flex items-center gap-1 rounded-full border border-[#a30d2d]/30 bg-white p-0.5 text-[#a30d2d]">
            <button
              type="button"
              onClick={() => decrement(lineKey(product.id))}
              className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-[#f7e9e3]"
              aria-label={`Decrease ${product.name}`}
            >
              <Minus size={12} />
            </button>
            <span className="min-w-4 text-center text-xs font-bold">{qty}</span>
            <button
              type="button"
              onClick={() => increment(lineKey(product.id))}
              className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-[#f7e9e3]"
              aria-label={`Increase ${product.name}`}
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-full bg-[#a30d2d] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#8b0a26]"
            aria-label={`Add ${product.name} to cart`}
          >
            <span className="sm:hidden">Add</span>
            <span className="hidden sm:inline">Add to cart</span>
          </button>
        )}
      </div>
    </li>
  );
}
