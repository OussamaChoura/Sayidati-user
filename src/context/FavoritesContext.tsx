'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Product } from '@/lib/types';

interface FavoritesContextValue {
  items: Product[];
  count: number;
  isFavorite: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

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
