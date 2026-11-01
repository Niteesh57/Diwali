import { SearchX } from 'lucide-react';
import { categories } from '../data/categories';
import type { Product } from '../data/products';
import { ProductRow } from './ProductRow';

export function ProductGrid({
  products,
  onOpen,
}: {
  products: Product[];
  onOpen: (product: Product) => void;
}) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e7d7c0] bg-[#fff9ee] px-6 py-16 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f7e9e3] text-[#a30d2d]">
          <SearchX size={26} />
        </span>
        <h3 className="font-display text-xl text-[#2b1420]">No crackers match that search</h3>
        <p className="max-w-sm text-sm text-[#93795f]">
          Try a different spelling, a brand name, or set the category back to “All categories”.
        </p>
      </div>
    );
  }

  const groups = categories
    .map((category) => ({
      ...category,
      items: products.filter((product) => product.category === category.key),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="rounded-2xl border border-[#e7d7c0] bg-[#fff9ee] p-3 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)] sm:p-5">
      {groups.map((group) => (
        <section key={group.key} className="mt-5 first:mt-0">
          <h3 className="flex items-center justify-between rounded-lg bg-[#a30d2d] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
            <span>{group.label}</span>
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">{group.items.length}</span>
          </h3>
          <ul className="mt-1">
            {group.items.map((product) => (
              <ProductRow key={product.id} product={product} onOpen={onOpen} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
