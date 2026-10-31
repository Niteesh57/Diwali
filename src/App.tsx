import { useMemo, useState } from 'react';
import { categories } from './data/categories';
import type { CategoryKey } from './data/categories';
import { products, searchProducts, type Product } from './data/products';
import { CategoryNav, type CollectionFilter, type SortKey } from './components/CategoryNav';
import { BrandTicker } from './components/BrandTicker';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutDialog } from './components/CheckoutDialog';
import { ExclusiveBanner } from './components/ExclusiveBanner';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { QuickView } from './components/QuickView';
import { SeoJsonLd } from './components/SeoJsonLd';
import { SparklerTrail } from './components/SparklerTrail';
import { StickyCartBar } from './components/StickyCartBar';
import { Toast } from './components/Toast';
import { WhatsAppFab } from './components/WhatsAppFab';
import { WhySection } from './components/WhySection';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryKey | 'all'>('all');
  const [brand, setBrand] = useState('all');
  const [collection, setCollection] = useState<CollectionFilter>('all');
  const [sort, setSort] = useState<SortKey>('recommended');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let list = query.trim() ? searchProducts(query) : products;
    if (collection !== 'all') list = list.filter((product) => product.collection === collection);
    if (category !== 'all') list = list.filter((product) => product.category === category);
    if (brand !== 'all') list = list.filter((product) => product.brand === brand);

    if (sort === 'price-asc') {
      list = [...list].sort(
        (a, b) => (a.price ?? Number.POSITIVE_INFINITY) - (b.price ?? Number.POSITIVE_INFINITY),
      );
    } else if (sort === 'price-desc') {
      list = [...list].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    } else {
      list = [...list].sort((a, b) => a.sno - b.sno);
    }

    return list;
  }, [query, category, brand, collection, sort]);

  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div className="page-backdrop min-h-screen">
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-midnight"
      >
        Skip to the price list
      </a>

      <SparklerTrail />
      <Header query={query} onQueryChange={setQuery} onOpenCart={() => setCartOpen(true)} />

      <main>
        <Hero />
        <BrandTicker />

        <section id="shop" className="pb-16 pt-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-gold/70">Price list 2026</p>
                <h2 className="mt-1 font-display text-3xl leading-tight text-cream sm:text-4xl">
                  Every cracker, <span className="gold-text">one honest price</span>
                </h2>
                <p className="mt-2 max-w-xl text-sm text-cream/50">
                  {products.length} products across {categories.length} categories. Tap any card for
                  details, pick a quantity, and send the whole order to WhatsApp at checkout.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-midnight/50 px-3.5 py-1.5 text-[11px] text-cream/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {filtered.length} matching item{filtered.length === 1 ? '' : 's'}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <CategoryNav
              query={query}
              onQueryChange={setQuery}
              category={category}
              onCategoryChange={setCategory}
              brand={brand}
              onBrandChange={setBrand}
              collection={collection}
              onCollectionChange={setCollection}
              sort={sort}
              onSortChange={setSort}
              resultCount={filtered.length}
            />
          </div>

          <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6">
            <ProductGrid products={filtered} onOpen={setQuickView} />
          </div>
        </section>

        <ExclusiveBanner onOpen={setQuickView} />
        <WhySection />
      </main>

      <Footer />
      <StickyCartBar onOpenCart={() => setCartOpen(true)} />
      <WhatsAppFab />

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={openCheckout} />
      <CheckoutDialog open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <QuickView product={quickView} onClose={() => setQuickView(null)} />
      <Toast />
      <SeoJsonLd />
    </div>
  );
}
