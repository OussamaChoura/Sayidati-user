import { getProduct, getProducts } from '@/lib/api';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductDetailClient from './ProductDetailClient';
import ProductJsonLd from '@/components/JsonLd/ProductJsonLd';
import type { Metadata } from 'next';

interface Props {
  params: { sku: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await getProduct(params.sku);
    return {
      title: `${product.nameFr} – Sayidati`,
      description: product.descriptionFr || `${product.nameFr} par ${product.brand}`,
    };
  } catch {
    return { title: 'Produit – Sayidati' };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  let product;
  try {
    product = await getProduct(params.sku);
  } catch {
    notFound();
  }

  // Related: same category, exclude current
  const related = await getProducts({ category: product.category?.slug, limit: 4 });
  const relatedProducts = related.data.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} />
      <Navbar />
      <main className="pt-16 min-h-screen">
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}
