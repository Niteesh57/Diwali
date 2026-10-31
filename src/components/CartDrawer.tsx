import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Trash2, X } from 'lucide-react';
import { productById } from '../data/products';
import { cartSummary, lineTotal, useCart } from '../lib/cart';
import { formatINR } from '../lib/format';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { ProductArt } from './ProductArt';
import { QuantityStepper } from './QuantityStepper';

export function CartDrawer({
  open,
  onClose,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const lines = useCart((state) => state.lines);
  const increment = useCart((state) => state.increment);
  const decrement = useCart((state) => state.decrement);
  const remove = useCart((state) => state.remove);
  const clear = useCart((state) => state.clear);
  const { itemCount, subtotal, tbcCount } = cartSummary(lines);
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex justify-end bg-black/65 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="flex h-full w-full max-w-md flex-col border-l border-gold/20 bg-[#100726]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gold/12 px-5 py-4">
              <div>
                <h2 className="font-display text-lg text-cream">Your order</h2>
                <p className="text-[11px] text-cream/45">
                  {itemCount} item{itemCount === 1 ? '' : 's'} selected
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-cream/12 text-cream/60 transition hover:text-cream"
                aria-label="Close cart"
              >
                <X size={17} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/20 bg-gold/8 text-gold">
                  <ShoppingBag size={26} />
                </span>
                <h3 className="font-display text-xl text-cream">Your cart is empty</h3>
                <p className="max-w-[16rem] text-sm text-cream/45">
                  Add sparklers, flower pots and shots from the 2026 price list to build your order.
                </p>
                <button type="button" className="btn btn-ghost mt-1" onClick={onClose}>
                  Browse crackers
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
                  {lines.map((line) => {
                    const product = productById.get(line.productId);
                    if (!product) return null;
                    const total = lineTotal(line);
                    return (
                      <div
                        key={line.key}
                        className="flex gap-3 rounded-xl border border-gold/12 bg-midnight/45 p-2.5"
                      >
                        <ProductArt
                          product={product}
                          animated={false}
                          className="h-16 w-20 shrink-0 rounded-lg"
                        />
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-cream">{product.name}</p>
                              <p className="text-[10px] text-cream/40">
                                {product.brand}
                                {line.design ? ` · ${line.design}` : ''}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(line.key)}
                              className="shrink-0 text-cream/35 transition hover:text-ember"
                              aria-label={`Remove ${product.name}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between gap-2">
                            <QuantityStepper
                              qty={line.qty}
                              compact
                              onDecrement={() => decrement(line.key)}
                              onIncrement={() => increment(line.key)}
                            />
                            <span className="text-sm font-semibold text-gold-soft">
                              {total === null ? 'TBC' : formatINR(total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={clear}
                    className="mt-1 text-[11px] text-cream/35 underline-offset-4 transition hover:text-ember hover:underline"
                  >
                    Clear cart
                  </button>
                </div>

                <div className="border-t border-gold/12 bg-midnight/60 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cream/60">Subtotal</span>
                    <span className="font-display text-2xl text-gold">{formatINR(subtotal)}</span>
                  </div>
                  {tbcCount > 0 && (
                    <p className="mt-1 text-[11px] text-saffron/90">
                      {tbcCount} item{tbcCount === 1 ? '' : 's'} priced on request — we will confirm on WhatsApp.
                    </p>
                  )}
                  <p className="mt-1 text-[11px] text-cream/35">
                    Delivery charges and availability confirmed on WhatsApp.
                  </p>
                  <button type="button" onClick={onCheckout} className="btn btn-gold mt-3 w-full">
                    Proceed to checkout
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
