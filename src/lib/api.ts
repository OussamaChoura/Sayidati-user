import type { Category, PaginatedProducts, Product } from './types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, init ?? { next: { revalidate: 60 } } as RequestInit);
  if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
  return res.json() as Promise<T>;
}

export async function getProducts(params?: {
  category?: string;
  page?: number;
  limit?: number;
  search?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}): Promise<PaginatedProducts> {
  const q = new URLSearchParams();
  if (params?.category) q.set('category', params.category);
  if (params?.page) q.set('page', String(params.page));
  if (params?.limit) q.set('limit', String(params.limit));
  if (params?.search) q.set('search', params.search);
  if (params?.brand) q.set('brand', params.brand);
  if (params?.minPrice !== undefined) q.set('minPrice', String(params.minPrice));
  if (params?.maxPrice !== undefined) q.set('maxPrice', String(params.maxPrice));
  if (params?.inStock) q.set('inStock', 'true');
  const qs = q.toString();
  return apiFetch<PaginatedProducts>(`/api/v1/products${qs ? `?${qs}` : ''}`);
}

export async function getBrands(): Promise<string[]> {
  return apiFetch<string[]>('/api/v1/products/brands');
}

export async function getProduct(sku: string): Promise<Product> {
  return apiFetch<Product>(`/api/v1/products/${sku}`);
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>('/api/v1/categories', { next: { revalidate: 300 } } as RequestInit);
}

export async function getCategory(slug: string): Promise<Category> {
  return apiFetch<Category>(`/api/v1/categories/${slug}`);
}

export async function getSettings(): Promise<Record<string, string>> {
  return apiFetch<Record<string, string>>('/api/v1/settings', { next: { revalidate: 300 } } as RequestInit);
}
