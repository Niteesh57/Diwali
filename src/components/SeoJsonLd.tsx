import { products } from '../data/products';

export function SeoJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Diwali Crackers 2026 Price List',
    numberOfItems: products.length,
    itemListElement: products
      .filter((product) => product.price !== null)
      .map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          brand: { '@type': 'Brand', name: product.brand },
          category: product.category,
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: product.price,
            availability: product.outOfStock
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
          },
        },
      })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
