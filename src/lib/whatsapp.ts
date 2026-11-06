import { productById } from '../data/products';
import { site } from '../data/site';
import { lineTotal, type CartLine } from './cart';
import { formatINR } from './format';

export type Customer = {
  name: string;
  phone: string;
  altPhone: string;
  city: string;
  address: string;
  pincode: string;
  deliveryDate: string;
  notes: string;
};

export const emptyCustomer: Customer = {
  name: '',
  phone: '',
  altPhone: '',
  city: '',
  address: '',
  pincode: '',
  deliveryDate: '',
  notes: '',
};

export function buildOrderMessage(customer: Customer, lines: CartLine[]) {
  const items = lines.map((line, index) => {
    const product = productById.get(line.productId);
    const name = line.customName ? `${line.customName} [Custom Item]` : (product?.name ?? line.productId);
    const design = line.design ? ` (${line.design})` : '';
    const total = lineTotal(line);
    const price = total === null ? 'price to be confirmed' : formatINR(total);
    return `${index + 1}. ${name}${design} × ${line.qty} — ${price}`;
  });

  let subtotal = 0;
  let itemCount = 0;
  let tbcCount = 0;
  for (const line of lines) {
    itemCount += line.qty;
    const total = lineTotal(line);
    if (total === null) tbcCount += line.qty;
    else subtotal += total;
  }

  const blocks = [
    `*${site.name.toUpperCase()} — NEW ORDER*`,
    '',
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    customer.altPhone ? `Alternate phone: ${customer.altPhone}` : '',
    `Address: ${[customer.address, customer.city, customer.pincode].filter(Boolean).join(', ')}`,
    customer.deliveryDate ? `Preferred delivery: ${customer.deliveryDate}` : '',
    '',
    '*ORDER*',
    ...items,
    '',
    `Items: ${itemCount} | Subtotal: ${formatINR(subtotal)}`,
    tbcCount ? `Note: ${tbcCount} item(s) marked “price to be confirmed”.` : '',
    customer.notes ? `Customer note: ${customer.notes}` : '',
    '',
    'Sent from the 2026 website',
  ];

  return blocks
    .join('\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string) {
  const url = whatsappUrl(message);
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
  return url;
}
