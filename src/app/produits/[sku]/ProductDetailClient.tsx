'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Shield, Truck, RotateCcw, ChevronRight, ChevronLeft, Leaf } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'description' | 'dpp'>('description');
  const [activeIdx, setActiveIdx] = useState(0);

  const allImages: string[] = [
    ...(product.imageUrl ? [product.imageUrl] : []),
    ...product.imageUrls.filter((u) => u !== product.imageUrl),
  ];
  if (allImages.length === 0) allImages.push(`https://picsum.photos/seed/${product.sku}/600/600`);
  const price = Number(product.price);
  const origPrice = product.originalPrice ? Number(product.originalPrice) : null;
  const discount = calcDiscount(price, origPrice);

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
              key={allImages[activeIdx]}
              src={allImages[activeIdx]}
              alt={`${product.nameFr} – photo ${activeIdx + 1}`}
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
            <h1 className="font-serif text-4xl font-bold text-gray-900 mt-2">{product.nameFr}</h1>
          </div>

          <StarRating rating={Number(product.rating)} count={product.reviewCount} size={16} />

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {price.toFixed(3)} {product.currency}
            </span>
            {origPrice && (
              <span className="text-lg text-gray-400 line-through mb-0.5">
                {origPrice.toFixed(3)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-400'}`}
            />
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-700' : 'text-red-600'}`}>
              {product.inStock ? 'En stock' : 'Rupture de stock'}
            </span>
            {product.inStock && product.stock <= 5 && (
              <span className="text-xs text-orange-500">— Plus que {product.stock} disponibles</span>
            )}
          </div>

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
              disabled={!product.inStock}
              className="flex-1 h-12 bg-rose-600 text-white rounded-full font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={18} />
              Ajouter au panier
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 border-t pt-5">
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

      {/* Tabs: description + DPP */}
      <div className="mb-16">
        <div className="flex gap-1 border-b mb-6">
          {(['description', 'dpp'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-rose-600 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'description' ? 'Description' : (
                <span className="flex items-center gap-1"><Leaf size={14} /> Passeport Produit</span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'description' && (
          <div className="prose max-w-none text-gray-700">
            <p>{product.descriptionFr || 'Aucune description disponible.'}</p>
            <p className="text-sm text-gray-400 mt-2">SKU: {product.sku}</p>
          </div>
        )}

        {activeTab === 'dpp' && product.dpp ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-2xl p-5 space-y-3">
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                <Leaf size={16} /> Informations de traçabilité
              </h3>
              <p className="text-sm text-gray-600">
                <strong>Pays de fabrication:</strong> {product.dpp.country}
              </p>
              {product.dpp.carbonFootprint && (
                <p className="text-sm text-gray-600">
                  <strong>Empreinte carbone:</strong> {Number(product.dpp.carbonFootprint).toFixed(2)} kg CO₂
                </p>
              )}
              <p className="text-sm text-gray-600">
                <strong>Recyclable:</strong> {product.dpp.recyclable ? '✅ Oui' : '❌ Non'}
              </p>
              {product.dpp.certifications.length > 0 && (
                <div>
                  <strong className="text-sm text-gray-600">Certifications:</strong>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.dpp.certifications.map((c) => (
                      <span key={c} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {product.dpp.ingredients.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-800 mb-3">Ingrédients (INCI)</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {product.dpp.ingredients.join(', ')}
                </p>
              </div>
            )}
          </div>
        ) : activeTab === 'dpp' ? (
          <p className="text-gray-400 text-sm">Aucune information de passeport produit disponible.</p>
        ) : null}
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
