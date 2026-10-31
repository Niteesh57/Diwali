import { Search, SlidersHorizontal, X } from 'lucide-react';
import { categories } from '../data/categories';
import type { CategoryKey } from '../data/categories';
import type { Collection } from '../data/products';
import { brands, categoryCounts, products } from '../data/products';

export type CollectionFilter = Collection | 'all';
export type SortKey = 'recommended' | 'price-asc' | 'price-desc' | 'sno';

const collectionTabs: { key: CollectionFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'standard', label: 'Standard' },
  { key: 'wide', label: 'Wide range' },
];

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'recommended', label: 'Recommended' },
  { key: 'price-asc', label: 'Price: low to high' },
  { key: 'price-desc', label: 'Price: high to low' },
  { key: 'sno', label: 'Price list order' },
];

export function CategoryNav({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  brand,
  onBrandChange,
  collection,
  onCollectionChange,
  sort,
  onSortChange,
  resultCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  category: CategoryKey | 'all';
  onCategoryChange: (value: CategoryKey | 'all') => void;
  brand: string;
  onBrandChange: (value: string) => void;
  collection: CollectionFilter;
  onCollectionChange: (value: CollectionFilter) => void;
  sort: SortKey;
  onSortChange: (value: SortKey) => void;
  resultCount: number;
}) {
  return (
    <div className="sticky top-16 z-40 border-y border-gold/12 bg-midnight/80 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex rounded-full border border-gold/20 bg-midnight/60 p-0.5">
            {collectionTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => onCollectionChange(tab.key)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                  collection === tab.key
                    ? 'bg-gradient-to-r from-[#ffd97a] to-[#e89a1f] text-[#2a1704]'
                    : 'text-cream/55 hover:text-cream'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <label className="flex min-w-[190px] flex-1 items-center gap-2 rounded-full border border-gold/20 bg-midnight/60 px-3 py-1.5 sm:max-w-xs">
            <Search size={14} className="shrink-0 text-cream/40" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search product, brand or shot count…"
              aria-label="Search the price list"
              className="w-full bg-transparent text-xs text-cream placeholder:text-cream/35 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search"
                className="text-cream/40 transition hover:text-gold"
              >
                <X size={13} />
              </button>
            )}
          </label>

          <label className="flex items-center gap-2 rounded-full border border-gold/20 bg-midnight/60 px-3 py-1.5">
            <SlidersHorizontal size={13} className="text-cream/40" />
            <select
              value={brand}
              onChange={(event) => onBrandChange(event.target.value)}
              aria-label="Filter by brand"
              className="bg-transparent text-xs text-cream/80 focus:outline-none"
            >
              <option value="all">All brands</option>
              {brands.map((item) => (
                <option key={item} value={item} className="bg-midnight text-cream">
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="hidden items-center gap-2 rounded-full border border-gold/20 bg-midnight/60 px-3 py-1.5 sm:flex">
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value as SortKey)}
              aria-label="Sort products"
              className="bg-transparent text-xs text-cream/80 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key} className="bg-midnight text-cream">
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <span className="ml-auto hidden text-[11px] text-cream/40 sm:block">
            {resultCount} of {products.length} items
          </span>
        </div>

        <div className="no-scrollbar mt-2.5 flex gap-1.5 overflow-x-auto pb-0.5">
          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className={`chip ${category === 'all' ? 'chip-active' : ''}`}
          >
            All categories
            <span className="text-[10px] opacity-60">{products.length}</span>
          </button>
          {categories.map((item) => {
            const count = categoryCounts[item.key] ?? 0;
            if (!count) return null;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => onCategoryChange(item.key)}
                className={`chip ${category === item.key ? 'chip-active' : ''}`}
              >
                {item.label}
                <span className="text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
