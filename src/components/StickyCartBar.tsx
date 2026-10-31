import { ArrowRight, ShoppingBag } from 'lucide-react';
import { cartSummary, useCart } from '../lib/cart';
import { formatINR } from '../lib/format';

export function StickyCartBar({ onOpenCart }: { onOpenCart: () => void }) {
  const lines = useCart((state) => state.lines);
  const { itemCount, subtotal } = cartSummary(lines);

  if (itemCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-[#120827]/95 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={onOpenCart}
        className="flex w-full items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#ffd97a] to-[#e89a1f] px-4 py-2.5 text-[#2a1704]"
      >
        <span className="flex items-center gap-2 text-xs font-semibold">
          <ShoppingBag size={15} />
          {itemCount} item{itemCount === 1 ? '' : 's'}
        </span>
        <span className="flex items-center gap-2 text-sm font-bold">
          {formatINR(subtotal)}
          <ArrowRight size={16} />
        </span>
      </button>
    </div>
  );
}
