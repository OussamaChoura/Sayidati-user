'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import StarRating from '@/components/StarRating';
import { getProductImage, calcDiscount } from '@/lib/utils';
import type { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { isFavorite, toggleItem } = useFavorites();
  const favorited = isFavorite(product.id);

  // Variant-aware pricing
  const activeVariants = (product.variants ?? []).filter(v => v.isActive && v.price != null);
  const hasVariantPricing = activeVariants.length > 0;
  const variantMinPrice = hasVariantPricing
    ? Math.min(...activeVariants.map(v => Number(v.price)))
    : null;

  const price = variantMinPrice ?? Number(product.price);
  const origPrice = !hasVariantPricing && product.originalPrice ? Number(product.originalPrice) : null;
  const discount = calcDiscount(price, origPrice);
  const img = getProductImage(product);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      {/* Image */}
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
        {discount && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          aria-label={favorited ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          onClick={(e) => { e.preventDefault(); toggleItem(product); }}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 duration-300"
        >
          <Heart
            size={16}
            fill={favorited ? '#f43f5e' : 'none'}
            className="text-rose-500"
          />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wide">{product.brand}</p>
        <Link href={`/produits/${product.sku}`}>
          <h3 className="font-serif font-semibold text-gray-900 mt-1 hover:text-rose-600 transition-colors">
            {product.nameFr}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <StarRating rating={Number(product.rating)} count={product.reviewsCount} size={12} />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="flex items-baseline gap-1">
              {hasVariantPricing && (
                <span className="text-xs text-gray-400 font-normal">À partir de</span>
              )}
              <span className="text-lg font-bold text-gray-900">
                {price.toFixed(3)} {product.currency}
              </span>
            </div>
            {origPrice && (
              <span className="text-sm text-gray-400 line-through">
                {origPrice.toFixed(3)}
              </span>
            )}
            {hasVariantPricing && (
              <p className="text-xs text-rose-500 mt-0.5">{activeVariants.length} variante{activeVariants.length > 1 ? 's' : ''}</p>
            )}
          </div>
          <button
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className="bg-rose-600 text-white p-2 rounded-full hover:bg-rose-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label={`Ajouter ${product.nameFr} au panier`}
          >
            <ShoppingBag size={16} />
          </button>
        </div>
        {!product.inStock && (
          <p className="text-xs text-red-500 mt-1">Rupture de stock</p>
        )}
      </div>
    </div>
  );
}
