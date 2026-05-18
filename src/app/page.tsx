export const runtime = 'edge';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import WebsiteJsonLd from '@/components/JsonLd/WebsiteJsonLd';
import { getCategories } from '@/lib/api';
import type { Category } from '@/lib/types';

export default async function HomePage() {
  let categories: Category[] = [];
  try { categories = await getCategories(); } catch {}

  return (
    <>
      <WebsiteJsonLd />
      <main>
        <HeroSection />
        <CategoriesSection initialCategories={categories.map(c => ({ ...c, productsCount: c.productsCount ?? 0, description: c.description ?? '' }))} />
        <FeaturedProducts />
      </main>
    </>
  );
}
