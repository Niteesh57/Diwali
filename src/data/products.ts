import raw from './products.json';
import type { CategoryKey } from './categories';

export type Collection = 'standard' | 'wide';

export type Product = {
  id: string;
  sno: number;
  name: string;
  category: CategoryKey;
  brand: string;
  collection: Collection;
  price: number | null;
  priceLabel?: string;
  unit?: string;
  designs?: string[];
  aliases?: string[];
  isNew2026?: boolean;
  outOfStock?: boolean;
};

export const products = raw as unknown as Product[];

export const productById = new Map(products.map((product) => [product.id, product]));

export const categoryCounts = products.reduce<Record<string, number>>((counts, product) => {
  counts[product.category] = (counts[product.category] ?? 0) + 1;
  return counts;
}, {});

export function searchProducts(query: string): Product[] {
  const term = query.trim().toLowerCase();
  if (!term) return products;
  return products.filter((product) => {
    const haystack = [
      product.name,
      product.brand,
      product.category,
      product.aliases?.join(' ') ?? '',
      String(product.sno),
    ]
      .join(' ')
      .toLowerCase();
    return term.split(/\s+/).every((word) => haystack.includes(word));
  });
}
