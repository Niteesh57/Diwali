import { brandLogos } from '../data/brandLogos';
import type { Product } from '../data/products';
import { ProductArt } from './ProductArt';

export function BrandThumb({ product }: { product: Product }) {
  const logo = brandLogos[product.brand];

  return (
    <div className="h-14 w-24 shrink-0 overflow-hidden rounded-md border border-[#e4d3bd] bg-white">
      {logo ? (
        <img
          src={logo}
          alt={`${product.brand} logo`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-1"
        />
      ) : (
        <ProductArt product={product} animated={false} className="h-full w-full" />
      )}
    </div>
  );
}
