import { useState, type FormEvent } from 'react';
import { Minus, Plus, Sparkles, Trash2 } from 'lucide-react';
import { lineTotal, useCart } from '../lib/cart';
import { formatINR } from '../lib/format';
import { useToast } from '../lib/toast';

export function CustomItemForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const addCustom = useCart((state) => state.addCustom);
  const lines = useCart((state) => state.lines);
  const increment = useCart((state) => state.increment);
  const decrement = useCart((state) => state.decrement);
  const remove = useCart((state) => state.remove);
  const showToast = useToast((state) => state.show);

  const customLines = lines.filter((line) => Boolean(line.customName));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    const parsedPrice = parseFloat(price);

    if (!trimmed) {
      setError('Please enter the cracker or item name');
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Please enter a valid price greater than 0');
      return;
    }

    addCustom(trimmed, parsedPrice, qty);
    showToast(`Added "${trimmed}" (${formatINR(parsedPrice)}) to cart`);
    setName('');
    setPrice('');
    setQty(1);
    setError(null);
  };

  return (
    <div className="rounded-xl border border-[#eadcc6] bg-[#fffdf9] p-4 sm:p-6 shadow-sm">
      <div className="flex items-center gap-2 text-[#a30d2d]">
        <Sparkles size={18} />
        <h4 className="font-display text-base font-bold text-[#2b1420]">
          Add Any Unlisted Cracker or Item
        </h4>
      </div>
      <p className="mt-1 text-xs text-[#93795f]">
        Looking for an item not found in the catalogue above? Enter the item name and price below to add it directly to your order.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-[1.5fr_1fr_auto_auto]">
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#93795f]">
            Item Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(null);
            }}
            placeholder="e.g. Special Peacock Cracker, 5000 Wala"
            className="mt-1 w-full rounded-lg border border-[#e2d2bb] bg-white px-3 py-2 text-sm text-[#2b1420] placeholder:text-[#b49e85] focus:border-[#a30d2d] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#93795f]">
            Price (₹) *
          </label>
          <input
            type="number"
            min="1"
            step="any"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (error) setError(null);
            }}
            placeholder="e.g. 350"
            className="mt-1 w-full rounded-lg border border-[#e2d2bb] bg-white px-3 py-2 text-sm text-[#2b1420] placeholder:text-[#b49e85] focus:border-[#a30d2d] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#93795f]">
            Qty
          </label>
          <div className="mt-1 flex items-center rounded-lg border border-[#e2d2bb] bg-white p-1">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-7 w-7 place-items-center rounded text-[#a30d2d] hover:bg-[#f7e9e3]"
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="min-w-6 text-center text-xs font-bold text-[#2b1420]">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="grid h-7 w-7 place-items-center rounded text-[#a30d2d] hover:bg-[#f7e9e3]"
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="flex h-[38px] w-full items-center justify-center gap-1.5 rounded-lg bg-[#a30d2d] px-4 text-xs font-bold text-white transition hover:bg-[#8b0a26] sm:w-auto"
          >
            <Plus size={15} />
            <span>Add to Cart</span>
          </button>
        </div>
      </form>

      {error && <p className="mt-2 text-xs font-medium text-red-600">{error}</p>}

      {customLines.length > 0 && (
        <div className="mt-6 border-t border-[#eadcc6] pt-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-[#93795f]">
            Custom Items in Your Cart ({customLines.length})
          </h5>
          <ul className="mt-2 divide-y divide-[#eadcc6]">
            {customLines.map((line) => {
              const total = lineTotal(line);
              return (
                <li key={line.key} className="flex items-center justify-between gap-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-[#2b1420]">
                      {line.customName}
                    </p>
                    <p className="text-xs text-[#93795f]">
                      {formatINR(line.customPrice ?? 0)} each
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 rounded-full border border-[#a30d2d]/30 bg-white p-0.5 text-[#a30d2d]">
                      <button
                        type="button"
                        onClick={() => decrement(line.key)}
                        className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-[#f7e9e3]"
                        aria-label={`Decrease ${line.customName}`}
                      >
                        <Minus size={11} />
                      </button>
                      <span className="min-w-4 text-center text-xs font-bold">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => increment(line.key)}
                        className="grid h-6 w-6 place-items-center rounded-full transition hover:bg-[#f7e9e3]"
                        aria-label={`Increase ${line.customName}`}
                      >
                        <Plus size={11} />
                      </button>
                    </div>

                    <span className="min-w-16 text-right text-xs font-bold text-[#a30d2d]">
                      {total !== null ? formatINR(total) : ''}
                    </span>

                    <button
                      type="button"
                      onClick={() => remove(line.key)}
                      className="text-[#a08a72] transition hover:text-red-600"
                      aria-label={`Remove ${line.customName}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
