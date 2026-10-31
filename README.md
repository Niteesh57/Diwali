# Diwali Crackers 2026

Animated React storefront for the 2026 Diwali crackers price list, with a cart that checks out over WhatsApp.

## Run locally

```bash
npm install
npm run dev
```

Build and preview the production bundle:

```bash
npm run build
npm run preview
```

The production site is written to `dist/`. Upload that folder to any static host
(Vercel, Netlify, GitHub Pages, or your own web server).

## What's inside

- **Full 2026 catalogue** — 145 rows (S.No 1–144 from the printed list, plus the 5D Pataka Glasses) in `src/data/products.json`.
- **Search, category, collection and brand filters** with price sorting.
- **Cart** with quantity steppers, persisted in `localStorage` (`diwali-cart-v1`).
- **WhatsApp checkout** — collects name, phone, address, pincode, delivery date and notes, then opens WhatsApp to `+91 97012 33737` with an itemised order.
- **Festive motion** — canvas fireworks, sparkler pointer trail, diyas, marquee, scroll reveals and confetti, all disabled under `prefers-reduced-motion`.
- **Custom SVG product art** for every category, so no product depends on an external image.

## Editing the catalogue

1. Edit `src/data/products.json` (one object per row).
2. Keep `sno` unique and sequential, `category` one of the keys in `src/data/categories.ts`, and `price` either a number or `null` with `priceLabel` (used for the two price-on-request toy guns).
3. Run `npm run verify:catalogue` to validate counts, ids, S.No sequence and prices.

Product names are kept exactly as printed in the price list so customers can match rows.
Search aliases (e.g. `chacker` → `chakkar`) live in each product's `aliases` array.

## Shop details to update

Edit `src/data/site.ts`:

- `phonePrimary`, `phoneSecondary`, `whatsappNumber`
- `address`, `licence`
- `deliveryNote`, `safetyNote`
- `diwaliDate` (countdown target — currently 8 November 2026, 6:00 pm IST)

## Photos

Hero and gallery photos are licence-free images from Wikimedia Commons. See
`public/images/CREDITS.md` for authors, sources and licences. All product illustrations are original SVG art.
