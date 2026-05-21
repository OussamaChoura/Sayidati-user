'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Shield, Truck, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import StarRating from '@/components/StarRating';
import { calcDiscount } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const allImages: string[] = [
    ...(product.imageUrl ? [product.imageUrl] : []),
    ...product.imageUrls.filter((u) => u !== product.imageUrl),
  ];
  if (allImages.length === 0) allImages.push(`https://picsum.photos/seed/${product.sku}/600/600`);
  const price = Number(product.price);
  const origPrice = product.originalPrice ? Number(product.originalPrice) : null;

  // Variant logic
  const activeVariants = (product.variants ?? []).filter(v => v.isActive);
  const optionKeys = activeVariants.length > 0
    ? [...new Set(activeVariants.flatMap(v => Object.keys(v.options)))]
    : [];
  const selectedVariant = optionKeys.length > 0 && optionKeys.every(k => selectedOptions[k])
    ? activeVariants.find(v => optionKeys.every(k => v.options[k] === selectedOptions[k])) ?? null
    : null;
  const allOptionsSelected = optionKeys.length === 0 || optionKeys.every(k => !!selectedOptions[k]);
  const displayPrice = selectedVariant?.price != null ? selectedVariant.price : price;
  const displayOrigPrice = selectedVariant?.originalPrice != null ? selectedVariant.originalPrice : origPrice;
  const displayStock = selectedVariant != null ? selectedVariant.stock : product.stock;
  const displayInStock = selectedVariant != null ? selectedVariant.stock > 0 : product.inStock;
  const mainDisplayImage = selectedVariant?.imageUrl ?? allImages[activeIdx];
  const discount = calcDiscount(displayPrice, displayOrigPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-rose-500 transition-colors">Accueil</Link>
        <ChevronRight size={14} />
        <Link href="/produits" className="hover:text-rose-500 transition-colors">Produits</Link>
        <ChevronRight size={14} />
        {product.category && (
          <>
            <Link
              href={`/categories/${product.category.slug}`}
              className="hover:text-rose-500 transition-colors"
            >
              {product.category.nameFr}
            </Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-gray-700">{product.nameFr}</span>
      </nav>

      {/* Main product area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
        {/* Image gallery */}
        <div className="flex flex-col gap-3">
          {/* Main image */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-gray-50">
            <Image
              key={mainDisplayImage}
              src={mainDisplayImage}
              alt={`${product.nameFr}`}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIdx((i) => (i - 1 + allImages.length) % allImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveIdx((i) => (i + 1) % allImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow rounded-full w-9 h-9 flex items-center justify-center transition-colors z-10"
                  aria-label="Image suivante"
                >
                  <ChevronRight size={18} />
                </button>
                {/* Dot indicators */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        i === activeIdx ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full z-10">
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="absolute top-4 right-4 bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full z-10">
                -{discount}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    i === activeIdx ? 'border-rose-500' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`${product.nameFr} – miniature ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-rose-500 text-sm font-semibold uppercase tracking-widest">
              {product.brand}
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">{product.nameFr}</h1>
          </div>

          <StarRating rating={Number(product.rating)} count={product.reviewsCount} size={16} />

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {Number(displayPrice).toFixed(3)} {product.currency}
            </span>
            {displayOrigPrice && (
              <span className="text-lg text-gray-400 line-through mb-0.5">
                {Number(displayOrigPrice).toFixed(3)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${displayInStock ? 'bg-green-500' : 'bg-red-400'}`}
            />
            <span className={`text-sm font-medium ${displayInStock ? 'text-green-700' : 'text-red-600'}`}>
              {displayInStock ? 'En stock' : 'Rupture de stock'}
            </span>
            {displayInStock && displayStock <= 5 && (
              <span className="text-xs text-orange-500">— Plus que {displayStock} disponibles</span>
            )}
          </div>

          {/* Variant selector */}
          {optionKeys.length > 0 && (
            <div className="space-y-3">
              {optionKeys.map(key => {
                const values = [...new Set(activeVariants.map(v => v.options[key]).filter(Boolean))];
                return (
                  <div key={key}>
                    <p className="text-sm font-medium text-gray-700 mb-1.5">
                      {key}
                      {selectedOptions[key] && <span className="font-normal text-gray-500 ml-1.5">— {selectedOptions[key]}</span>}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {values.map(val => {
                        const hasVariant = activeVariants.some(v =>
                          optionKeys.every(k => k === key ? v.options[k] === val : (!selectedOptions[k] || v.options[k] === selectedOptions[k]))
                        );
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setSelectedOptions(o => ({ ...o, [key]: val }))}
                            disabled={!hasVariant}
                            className={`px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                              selectedOptions[key] === val
                                ? 'bg-rose-600 text-white border-rose-600'
                                : hasVariant
                                ? 'bg-white text-gray-700 border-gray-300 hover:border-rose-400'
                                : 'bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed'
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {!allOptionsSelected && (
                <p className="text-xs text-amber-600 bg-amber-50 rounded-xl px-3 py-2">Sélectionnez toutes les options pour ajouter au panier.</p>
              )}
            </div>
          )}

          {/* Qty + Add */}
          <div className="flex items-stretch gap-3">
            <div className="flex items-center border border-gray-200 rounded-full overflow-hidden h-12 shrink-0">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl leading-none"
              >
                −
              </button>
              <span className="w-10 h-full flex items-center justify-center font-semibold text-gray-900 text-base">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-xl leading-none"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addItem(product, qty)}
              disabled={!displayInStock || !allOptionsSelected}
              className="flex-1 h-12 bg-rose-600 text-white rounded-full font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={18} />
              Ajouter au panier
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t pt-5">
            {[
              { icon: <Truck size={18} />, text: 'Livraison 1–3 jours' },
              { icon: <RotateCcw size={18} />, text: 'Retour 14 jours' },
              { icon: <Shield size={18} />, text: 'Paiement sécurisé' },
            ].map((b) => (
              <div key={b.text} className="flex flex-col items-center gap-1 text-center">
                <span className="text-rose-500">{b.icon}</span>
                <span className="text-xs text-gray-500">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-16">
        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">Description</h2>
        <div className="prose max-w-none text-gray-700">
          {product.descriptionFr
            ? product.descriptionFr.split('\n').map((p, i) =>
                p.trim() ? <p key={i}>{p}</p> : <br key={i} />
              )
            : <p>Aucune description disponible.</p>
          }
        </div>
        <p className="text-sm text-gray-400 mt-4">Réf. : {product.sku}</p>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
