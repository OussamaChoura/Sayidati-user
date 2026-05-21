'use client';
import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import Cookies from 'js-cookie';
import type { CartItem, Product } from '@/lib/types';

const CART_COOKIE = 'sayidati_cart';
const COOKIE_MAX_AGE = 30; // days

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = Cookies.get(CART_COOKIE);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (items.length === 0) {
    Cookies.remove(CART_COOKIE, { path: '/' });
  } else {
    // Store only essential fields to stay within 4KB cookie limit
    const slim = items.map(({ product, quantity }) => ({
      quantity,
      product: {
        id: product.id,
        sku: product.sku,
        nameFr: product.nameFr,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        currency: product.currency,
        imageUrl: product.imageUrl,
        stock: product.stock,
        inStock: product.inStock,
      },
    }));
    Cookies.set(CART_COOKIE, JSON.stringify(slim), {
      expires: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const skipSave = useRef(true);

  // Hydrate from cookie after mount (avoids SSR mismatch)
  useEffect(() => {
    skipSave.current = true;
    setItems(loadCart());
  }, []);

  // Sync to cookie on every change (skip initial load to avoid clearing cookie)
  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    saveCart(items);
  }, [items]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count,
        total,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
