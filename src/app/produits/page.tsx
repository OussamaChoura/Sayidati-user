export const runtime = 'edge';
import { getProducts, getCategories, getBrands } from '@/lib/api';
import ProductsClient from './ProductsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tous les Produits – Sayidati',
  description: 'Parcourez toute notre collection de parfums, soins et maquillage pour femme.',
};

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: {
    category?: string;
    page?: string;
    search?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const [productsData, categories, brands] = await Promise.all([
    getProducts({
      category: searchParams.category,
      page,
      limit: 12,
      search: searchParams.search,
      brand: searchParams.brand,
      minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
      maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
      inStock: searchParams.inStock === 'true',
    }),
    getCategories(),
    getBrands(),
  ]);

  return (
    <main className="pt-16 min-h-screen">
        <ProductsClient
          initialData={productsData}
          categories={categories}
          brands={brands}
          initialCategory={searchParams.category}
          initialSearch={searchParams.search}
          initialBrand={searchParams.brand}
          initialMinPrice={searchParams.minPrice ? Number(searchParams.minPrice) : undefined}
          initialMaxPrice={searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined}
          initialInStock={searchParams.inStock === 'true'}
          initialPage={page}
        />
    </main>
  );
}
