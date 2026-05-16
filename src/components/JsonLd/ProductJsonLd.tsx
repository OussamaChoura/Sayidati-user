import type { Product } from '@/lib/types';

export default function ProductJsonLd({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://sayidati.tn/produits/${product.sku}`,
    name: product.nameFr,
    description: product.descriptionFr,
    image: product.imageUrl,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://sayidati.tn/produits/${product.sku}`,
      priceCurrency: product.currency,
      price: Number(product.price),
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '7',
          currency: 'TND',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'TN',
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: Number(product.rating),
      reviewCount: product.reviewCount,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
