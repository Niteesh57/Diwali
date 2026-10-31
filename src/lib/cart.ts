import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { productById } from '../data/products';

export type CartLine = {
  key: string;
  productId: string;
  design?: string;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (productId: string, design?: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
};

export const lineKey = (productId: string, design?: string) =>
  design ? `${productId}::${design}` : productId;

const clampQty = (qty: number) => Math.max(1, Math.min(99, Math.floor(qty)));

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (productId, design, qty = 1) =>
        set((state) => {
          const key = lineKey(productId, design);
          const existing = state.lines.find((line) => line.key === key);
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.key === key ? { ...line, qty: clampQty(line.qty + qty) } : line,
              ),
            };
          }
          return { lines: [...state.lines, { key, productId, design, qty: clampQty(qty) }] };
        }),
      setQty: (key, qty) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.key === key ? { ...line, qty: clampQty(qty) } : line,
          ),
        })),
      increment: (key) =>
        set((state) => ({
          lines: state.lines.map((line) =>
            line.key === key ? { ...line, qty: clampQty(line.qty + 1) } : line,
          ),
        })),
      decrement: (key) =>
        set((state) => ({
          lines: state.lines
            .map((line) =>
              line.key === key ? { ...line, qty: clampQty(line.qty - 1) } : line,
            )
            .filter((line) => line.qty > 0),
        })),
      remove: (key) =>
        set((state) => ({ lines: state.lines.filter((line) => line.key !== key) })),
      clear: () => set({ lines: [] }),
    }),
    {
      name: 'diwali-cart-v1',
      partialize: (state) => ({ lines: state.lines }),
    },
  ),
);

export const linePrice = (line: CartLine) => {
  const product = productById.get(line.productId);
  return product?.price ?? null;
};

export const lineTotal = (line: CartLine) => {
  const price = linePrice(line);
  return price === null ? null : price * line.qty;
};

export function cartSummary(lines: CartLine[]) {
  let itemCount = 0;
  let subtotal = 0;
  let tbcCount = 0;

  for (const line of lines) {
    itemCount += line.qty;
    const total = lineTotal(line);
    if (total === null) tbcCount += line.qty;
    else subtotal += total;
  }

  return { itemCount, subtotal, tbcCount };
}
