import type { Product } from './types';

export function getProductImage(product: Product, size = 400): string {
  return product.imageUrl || `https://picsum.photos/seed/${product.sku}/${size}/${size}`;
}

export function calcDiscount(price: number, originalPrice: number | null): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
