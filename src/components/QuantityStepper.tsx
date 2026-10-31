import { Minus, Plus } from 'lucide-react';

export function QuantityStepper({
  qty,
  onDecrement,
  onIncrement,
  compact = false,
}: {
  qty: number;
  onDecrement: () => void;
  onIncrement: () => void;
  compact?: boolean;
}) {
  const size = compact ? 'h-7 w-7' : 'h-8 w-8';

  return (
    <div
      className={`inline-flex items-center rounded-full border border-gold/35 bg-midnight/70 ${
        compact ? 'gap-0.5 p-0.5' : 'gap-1 p-1'
      }`}
    >
      <button
        type="button"
        onClick={onDecrement}
        className={`${size} grid place-items-center rounded-full text-gold-soft transition hover:bg-gold/15`}
        aria-label="Decrease quantity"
      >
        <Minus size={compact ? 12 : 14} />
      </button>
      <span className={`min-w-5 text-center font-semibold text-cream ${compact ? 'text-xs' : 'text-sm'}`}>
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrement}
        className={`${size} grid place-items-center rounded-full text-gold-soft transition hover:bg-gold/15`}
        aria-label="Increase quantity"
      >
        <Plus size={compact ? 12 : 14} />
      </button>
    </div>
  );
}
