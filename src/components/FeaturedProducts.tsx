import Link from 'next/link';
import ProductCard from './ProductCard';
import ProductJsonLd from './JsonLd/ProductJsonLd';
import { getProducts } from '@/lib/api';

export default async function FeaturedProducts() {
  let featured = [];
  try {
    const result = await getProducts({ limit: 8 });
    featured = result.data;
  } catch {
    featured = [];
  }

  return (
    <section id="produits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-rose-500 uppercase tracking-widest text-sm font-semibold mb-2">
            Sélection
          </p>
          <h2 className="font-serif text-4xl font-bold text-gray-900">Produits Vedettes</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Une sélection soigneuse de nos meilleures ventes et nouveautés.
          </p>
        </div>

        {featured.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Aucun produit disponible pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <div key={product.id}>
                <ProductJsonLd product={product} />
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/produits" className="inline-block border-2 border-rose-600 text-rose-600 px-8 py-3 rounded-full font-semibold hover:bg-rose-600 hover:text-white transition-colors">
            Voir tous les produits
          </Link>
        </div>
      </div>
    </section>
  );
}
