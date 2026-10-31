import { SearchX } from 'lucide-react';
import type { Product } from '../data/products';
import { ProductCard } from './ProductCard';

export function ProductGrid({
  products,
  onOpen,
}: {
  products: Product[];
  onOpen: (product: Product) => void;
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-gold/15 bg-midnight/40 px-6 py-20 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/10 text-gold">
          <SearchX size={26} />
        </span>
        <h3 className="font-display text-xl text-cream">No crackers match that search</h3>
        <p className="max-w-sm text-sm text-cream/50">
          Try a different spelling, a brand name, or clear the filters to see the full 2026 price list.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onOpen={onOpen} />
      ))}
    </div>
  );
}
