import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Copy, MessageCircle, X } from 'lucide-react';
import { productById } from '../data/products';
import { site } from '../data/site';
import { cartSummary, lineTotal, useCart } from '../lib/cart';
import { formatINR } from '../lib/format';
import { useToast } from '../lib/toast';
import {
  buildOrderMessage,
  emptyCustomer,
  openWhatsApp,
  whatsappUrl,
  type Customer,
} from '../lib/whatsapp';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import { Confetti } from './Confetti';

type Errors = Partial<Record<keyof Customer, string>>;

const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) return digits.slice(1);
  return digits;
};

const today = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10);
};

function validate(customer: Customer): Errors {
  const errors: Errors = {};
  if (customer.name.trim().length < 2) errors.name = 'Please enter your name';
  if (!/^[6-9]\d{9}$/.test(normalizePhone(customer.phone))) {
    errors.phone = 'Enter a valid 10-digit mobile number';
  }
  if (customer.altPhone.trim() && !/^[6-9]\d{9}$/.test(normalizePhone(customer.altPhone))) {
    errors.altPhone = 'Enter a valid 10-digit number or leave blank';
  }
  if (!customer.city.trim()) errors.city = 'Enter your city or delivery area';
  if (!/^\d{6}$/.test(customer.pincode.trim())) errors.pincode = 'Enter a 6-digit pincode';
  if (customer.deliveryDate && customer.deliveryDate < today()) {
    errors.deliveryDate = 'Choose today or a later date';
  }
  return errors;
}

export function CheckoutDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const lines = useCart((state) => state.lines);
  const clear = useCart((state) => state.clear);
  const showToast = useToast((state) => state.show);
  const { itemCount, subtotal, tbcCount } = cartSummary(lines);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<Errors>({});
  const [sentMessage, setSentMessage] = useState<string | null>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setSentMessage(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const orderLines = useMemo(
    () =>
      lines
        .map((line) => ({ line, product: productById.get(line.productId) }))
        .filter((entry) => entry.product),
    [lines],
  );

  const update = (key: keyof Customer) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (lines.length === 0) return;
    const nextErrors = validate(customer);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const clean: Customer = {
      ...customer,
      name: customer.name.trim(),
      phone: normalizePhone(customer.phone),
      altPhone: customer.altPhone.trim() ? normalizePhone(customer.altPhone) : '',
      city: customer.city.trim(),
      address: customer.address.trim(),
      pincode: customer.pincode.trim(),
      notes: customer.notes.trim(),
    };

    const message = buildOrderMessage(clean, lines);
    openWhatsApp(message);
    setSentMessage(message);
  };

  const handleClose = () => {
    if (sentMessage) {
      clear();
      setSentMessage(null);
    }
    onClose();
  };

  const copyOrder = async () => {
    if (!sentMessage) return;
    try {
      await navigator.clipboard.writeText(sentMessage);
      showToast('Order copied — paste it in WhatsApp');
    } catch {
      showToast('Could not copy automatically — please copy from WhatsApp', 'info');
    }
  };

  const fieldClass = (key: keyof Customer) => `field ${errors[key] ? 'field-error' : ''}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {sentMessage && <Confetti />}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Checkout"
            className="relative max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-gold/25 bg-[#100726] shadow-2xl sm:rounded-3xl"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-cream/15 bg-midnight/70 text-cream/70 transition hover:text-cream"
              aria-label={sentMessage ? 'Close and empty cart' : 'Close checkout'}
            >
              <X size={17} />
            </button>

            {sentMessage ? (
              <div className="flex flex-col items-center gap-4 px-6 py-14 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                  <CheckCircle2 size={34} />
                </span>
                <h2 className="font-display text-2xl text-cream">Your order is ready in WhatsApp</h2>
                <p className="max-w-md text-sm text-cream/55">
                  WhatsApp should have opened with your itemised order. Press send there and we will
                  confirm stock, delivery charges and timing. If it did not open, use the buttons below.
                </p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={whatsappUrl(sentMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-gold"
                  >
                    <MessageCircle size={16} /> Open WhatsApp again
                  </a>
                  <button type="button" className="btn btn-ghost" onClick={copyOrder}>
                    <Copy size={16} /> Copy order message
                  </button>
                </div>
                <button type="button" className="mt-2 text-xs text-cream/40 underline-offset-4 hover:text-gold hover:underline" onClick={handleClose}>
                  Done — start a new order
                </button>
              </div>
            ) : (
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-7">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gold/70">Checkout</p>
                  <h2 className="mt-1 font-display text-2xl text-cream">Delivery details</h2>
                  <p className="mt-1 text-xs text-cream/45">
                    We will send this order to {site.whatsappDisplay} on WhatsApp for confirmation.
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className="mb-1 block text-[11px] text-cream/55">Full name *</span>
                      <input
                        value={customer.name}
                        onChange={update('name')}
                        className={fieldClass('name')}
                        placeholder="Your name"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                      />
                      {errors.name && <span className="mt-1 block text-[11px] text-red-300">{errors.name}</span>}
                    </label>

                    <label>
                      <span className="mb-1 block text-[11px] text-cream/55">Mobile number *</span>
                      <input
                        value={customer.phone}
                        onChange={update('phone')}
                        className={fieldClass('phone')}
                        placeholder="10-digit mobile"
                        inputMode="tel"
                        autoComplete="tel"
                        aria-invalid={Boolean(errors.phone)}
                      />
                      {errors.phone && <span className="mt-1 block text-[11px] text-red-300">{errors.phone}</span>}
                    </label>

                    <label>
                      <span className="mb-1 block text-[11px] text-cream/55">Alternate number</span>
                      <input
                        value={customer.altPhone}
                        onChange={update('altPhone')}
                        className={fieldClass('altPhone')}
                        placeholder="Optional"
                        inputMode="tel"
                      />
                      {errors.altPhone && <span className="mt-1 block text-[11px] text-red-300">{errors.altPhone}</span>}
                    </label>

                    <label>
                      <span className="mb-1 block text-[11px] text-cream/55">City / delivery area *</span>
                      <input
                        value={customer.city}
                        onChange={update('city')}
                        className={fieldClass('city')}
                        placeholder="City or area"
                        autoComplete="address-level2"
                      />
                      {errors.city && <span className="mt-1 block text-[11px] text-red-300">{errors.city}</span>}
                    </label>

                    <label>
                      <span className="mb-1 block text-[11px] text-cream/55">Pincode *</span>
                      <input
                        value={customer.pincode}
                        onChange={update('pincode')}
                        className={fieldClass('pincode')}
                        placeholder="6-digit pincode"
                        inputMode="numeric"
                        autoComplete="postal-code"
                      />
                      {errors.pincode && <span className="mt-1 block text-[11px] text-red-300">{errors.pincode}</span>}
                    </label>

                    <label className="sm:col-span-2">
                      <span className="mb-1 block text-[11px] text-cream/55">Full delivery address (optional)</span>
                      <textarea
                        value={customer.address}
                        onChange={update('address')}
                        className={`${fieldClass('address')} min-h-[76px] resize-y`}
                        placeholder="House number, street, landmark (optional)"
                        autoComplete="street-address"
                      />
                      {errors.address && <span className="mt-1 block text-[11px] text-red-300">{errors.address}</span>}
                    </label>

                    <label>
                      <span className="mb-1 block text-[11px] text-cream/55">Preferred delivery date</span>
                      <input
                        type="date"
                        value={customer.deliveryDate}
                        onChange={update('deliveryDate')}
                        min={today()}
                        className={fieldClass('deliveryDate')}
                      />
                      {errors.deliveryDate && (
                        <span className="mt-1 block text-[11px] text-red-300">{errors.deliveryDate}</span>
                      )}
                    </label>

                    <label>
                      <span className="mb-1 block text-[11px] text-cream/55">Notes</span>
                      <input
                        value={customer.notes}
                        onChange={update('notes')}
                        className="field"
                        placeholder="Bulk order, timing, landmark…"
                      />
                    </label>
                  </div>

                  <button type="submit" className="btn btn-gold mt-5 w-full" disabled={lines.length === 0}>
                    <MessageCircle size={17} />
                    Send order on WhatsApp · {formatINR(subtotal)}
                  </button>
                  <p className="mt-2 text-center text-[10px] text-cream/35">
                    No payment is taken online. Prices are the 2026 list prices; delivery charges are
                    confirmed on WhatsApp.
                  </p>
                </form>

                <aside className="border-t border-gold/12 bg-midnight/45 p-6 sm:p-7 lg:border-l lg:border-t-0">
                  <div className="flex items-center justify-between pr-8">
                    <h3 className="font-display text-lg text-cream">Order summary</h3>
                    <span className="text-[11px] text-cream/40">{itemCount} items</span>
                  </div>
                  <div className="mt-4 max-h-[280px] space-y-2.5 overflow-y-auto pr-1">
                    {orderLines.map(({ line, product }) => {
                      if (!product) return null;
                      const total = lineTotal(line);
                      return (
                        <div key={line.key} className="flex items-start justify-between gap-3 text-xs">
                          <div className="min-w-0">
                            <p className="truncate text-cream/85">
                              {product.name}
                              {line.design ? ` · ${line.design}` : ''}
                            </p>
                            <p className="text-cream/35">× {line.qty}</p>
                          </div>
                          <span className="shrink-0 text-cream/70">
                            {total === null ? 'TBC' : formatINR(total)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="divider-gold my-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cream/55">Subtotal</span>
                    <span className="font-display text-2xl text-gold">{formatINR(subtotal)}</span>
                  </div>
                  {tbcCount > 0 && (
                    <p className="mt-2 text-[11px] text-saffron/90">
                      {tbcCount} item{tbcCount === 1 ? '' : 's'} will be priced on WhatsApp.
                    </p>
                  )}
                  <p className="mt-3 text-[11px] leading-relaxed text-cream/35">
                    Subtotal excludes delivery. We confirm availability and the final amount before
                    dispatch.
                  </p>
                </aside>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
