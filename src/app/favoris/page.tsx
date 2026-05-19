'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { getProductImage } from '@/lib/utils';

export default function FavorisPage() {
  const { items, removeItem, count } = useFavorites();
  const { addItem } = useCart();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart size={28} fill="#f43f5e" className="text-rose-500" />
              Mes Favoris
            </h1>
            <p className="text-gray-500 mt-1">
              {count === 0
                ? 'Aucun produit sauvegardé'
                : `${count} produit${count > 1 ? 's' : ''} sauvegardé${count > 1 ? 's' : ''}`}
            </p>
          </div>

          {count === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Heart size={64} className="text-gray-200 mb-6" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Votre liste est vide</h2>
              <p className="text-gray-400 mb-8">
                Parcourez nos produits et ajoutez vos coups de cœur ici.
              </p>
              <Link
                href="/produits"
                className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition-colors"
              >
                Découvrir les produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((product) => {
                const price = Number(product.price);
                const origPrice = product.originalPrice ? Number(product.originalPrice) : null;
                const img = getProductImage(product, 400);

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  >
                    <Link href={`/produits/${product.sku}`} className="block relative h-56 overflow-hidden">
                      <Image
                        src={img}
                        alt={product.nameFr}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {product.badge}
                        </span>
                      )}
                    </Link>

                    <div className="p-4">
                      <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
                      <Link href={`/produits/${product.sku}`}>
                        <h3 className="font-serif font-semibold text-gray-900 mt-1 hover:text-rose-600 transition-colors">
                          {product.nameFr}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            {price.toFixed(3)} {product.currency}
                          </span>
                          {origPrice && (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                              {origPrice.toFixed(3)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeItem(product.id)}
                            aria-label="Retirer des favoris"
                            className="p-2 rounded-full border border-gray-200 hover:border-rose-300 hover:bg-rose-50 transition-colors"
                          >
                            <Trash2 size={15} className="text-gray-400 hover:text-rose-500" />
                          </button>
                          <button
                            onClick={() => addItem(product)}
                            disabled={!product.inStock}
                            aria-label={`Ajouter ${product.nameFr} au panier`}
                            className="bg-rose-600 text-white p-2 rounded-full hover:bg-rose-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                          >
                            <ShoppingBag size={15} />
                          </button>
                        </div>
                      </div>
                      {!product.inStock && (
                        <p className="text-xs text-red-500 mt-1">Rupture de stock</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
  );
}
