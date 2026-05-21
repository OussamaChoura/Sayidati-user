'use client';
import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import Cookies from 'js-cookie';
import type { Product } from '@/lib/types';

const FAV_COOKIE = 'sayidati_favorites';
const COOKIE_MAX_AGE = 90; // days

interface FavoritesContextValue {
  items: Product[];
  count: number;
  isFavorite: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function loadFavorites(): Product[] {
  try {
    const raw = Cookies.get(FAV_COOKIE);
    if (!raw) return [];
    return JSON.parse(raw) as Product[];
  } catch {
    return [];
  }
}

function saveFavorites(items: Product[]) {
  if (items.length === 0) {
    Cookies.remove(FAV_COOKIE, { path: '/' });
  } else {
    // Store only essential fields to stay within 4KB cookie limit
    const slim = items.map((p) => ({
      id: p.id,
      sku: p.sku,
      nameFr: p.nameFr,
      brand: p.brand,
      price: p.price,
      originalPrice: p.originalPrice,
      currency: p.currency,
      imageUrl: p.imageUrl,
      badge: p.badge,
      stock: p.stock,
      inStock: p.inStock,
    }));
    Cookies.set(FAV_COOKIE, JSON.stringify(slim), {
      expires: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const skipSave = useRef(true);

  // Hydrate from cookie after mount (avoids SSR mismatch)
  useEffect(() => {
    skipSave.current = true;
    setItems(loadFavorites());
  }, []);

  // Sync to cookie on every change (skip initial load to avoid clearing cookie)
  useEffect(() => {
    if (skipSave.current) {
      skipSave.current = false;
      return;
    }
    saveFavorites(items);
  }, [items]);

  const isFavorite = useCallback(
    (productId: string) => items.some((p) => p.id === productId),
    [items]
  );

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  return (
    <FavoritesContext.Provider value={{ items, count: items.length, isFavorite, toggleItem, removeItem }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
}
