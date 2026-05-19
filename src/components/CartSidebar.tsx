'use client';
import { X, Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { getProductImage } from '@/lib/utils';

export default function CartSidebar() {
  const { items, count, total, isOpen, closeCart, removeItem, updateQty } = useCart();
  const settings = useSiteSettings();
  const shippingFee = parseFloat(settings['shipping_cost'] || '7');
  const freeThreshold = parseFloat(settings['free_shipping_threshold'] || '150');
  const shipping = total >= freeThreshold ? 0 : shippingFee;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="font-serif text-xl font-bold flex items-center gap-2">
            <ShoppingBag size={20} className="text-rose-600" />
            Panier
            {count > 0 && (
              <span className="bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </h2>
          <button onClick={closeCart} aria-label="Fermer le panier">
            <X size={22} className="text-gray-500 hover:text-gray-900 transition-colors" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-center text-sm">Votre panier est vide.</p>
              <button
                onClick={closeCart}
                className="btn-primary text-sm"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-3 bg-gray-50 rounded-xl p-3">
                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={getProductImage(item.product, 200)}
                    alt={item.product.nameFr}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400">{item.product.brand}</p>
                  <p className="font-medium text-sm text-gray-900 truncate">{item.product.nameFr}</p>
                  <p className="text-rose-600 font-bold text-sm mt-0.5">
                    {(Number(item.product.price) * item.quantity).toFixed(3)} {item.product.currency}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-rose-400 transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-rose-400 transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Sous-total</span>
              <span className="font-bold text-gray-900">{total.toFixed(3)} TND</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Livraison</span>
              {shipping === 0 ? (
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Truck size={13} /> Gratuite
                </span>
              ) : (
                <span className="text-gray-700 font-medium">+{shipping.toFixed(3)} TND</span>
              )}
            </div>
            <div className="flex justify-between font-bold text-base border-t pt-3">
              <span>Total</span>
              <span className="text-rose-600">{(total + shipping).toFixed(3)} TND</span>
            </div>
            <Link
              href="/commande"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              Passer la commande
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
