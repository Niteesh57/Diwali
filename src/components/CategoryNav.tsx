import { Search, X } from 'lucide-react';
import { categories } from '../data/categories';
import type { CategoryKey } from '../data/categories';
import { categoryCounts } from '../data/products';

export function CategoryNav({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  resultCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  category: CategoryKey | 'all';
  onCategoryChange: (value: CategoryKey | 'all') => void;
  resultCount: number;
}) {
  return (
    <div className="sticky top-16 z-40 border-y border-[#e7d7c0] bg-[#fff9ee] px-4 py-2.5 sm:px-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 sm:flex-row sm:items-center">
        <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#e2d2bb] bg-white px-3 py-2">
          <Search size={15} className="shrink-0 text-[#a30d2d]" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search crackers by name or brand…"
            aria-label="Search the price list"
            className="w-full bg-transparent text-sm text-[#2b1420] placeholder:text-[#a08a72] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
              className="text-[#a08a72] transition hover:text-[#a30d2d]"
            >
              <X size={14} />
            </button>
          )}
        </label>

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as CategoryKey | 'all')}
          aria-label="Filter by category"
          className="rounded-lg border border-[#e2d2bb] bg-white px-3 py-2 text-sm text-[#2b1420] focus:outline-none"
        >
          <option value="all">All categories</option>
          {categories.map((item) => {
            const count = item.key === 'custom' ? 'Add' : (categoryCounts[item.key] ?? 0);
            return (
              <option key={item.key} value={item.key}>
                {item.label} ({count})
              </option>
            );
          })}
        </select>

        <span className="text-[11px] text-[#93795f] sm:min-w-16 sm:text-right">{resultCount} items</span>
      </div>
    </div>
  );
}
