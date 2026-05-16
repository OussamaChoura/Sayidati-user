import { getCategory, getProducts, getCategories } from '@/lib/api';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const cat = await getCategory(params.slug);
    return {
      title: `${cat.nameFr} – Sayidati`,
      description: cat.description || `Découvrez notre collection ${cat.nameFr}.`,
    };
  } catch {
    return { title: 'Catégorie – Sayidati' };
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  let category;
  try {
    category = await getCategory(params.slug);
  } catch {
    notFound();
  }

  const page = Number(searchParams.page) || 1;
  const [productsData, allCategories] = await Promise.all([
    getProducts({ category: params.slug, page, limit: 12 }),
    getCategories(),
  ]);
  const totalPages = Math.ceil(productsData.total / productsData.limit);

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Category hero */}
        <div className="relative h-48 md:h-64 bg-rose-100 overflow-hidden">
          {category.imageUrl && (
            <Image
              src={category.imageUrl}
              alt={category.nameFr}
              fill
              className="object-cover opacity-50"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/60 to-transparent flex items-center px-8 md:px-16">
            <div className="text-white">
              <p className="uppercase tracking-widest text-rose-200 text-xs mb-2">Catégorie</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold">{category.nameFr}</h1>
              {category.description && (
                <p className="mt-2 text-rose-100 text-sm max-w-md">{category.description}</p>
              )}
              <p className="mt-2 text-rose-200 text-sm">{productsData.total} articles</p>
            </div>
          </div>
        </div>

        {/* Category nav */}
        <div className="bg-white border-b sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            <Link
              href="/produits"
              className="shrink-0 px-4 py-1.5 rounded-full text-sm border border-gray-300 hover:border-rose-400 transition-colors"
            >
              Tout
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  cat.slug === params.slug
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'border-gray-300 hover:border-rose-400'
                }`}
              >
                {cat.nameFr}
              </Link>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {productsData.data.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">Aucun produit dans cette catégorie pour le moment.</p>
              <Link href="/produits" className="btn-primary mt-4 inline-block">
                Voir tous les produits
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productsData.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={`/categories/${params.slug}?page=${p}`}
                      className={`w-9 h-9 rounded-full text-sm font-medium flex items-center justify-center transition-colors ${
                        p === page
                          ? 'bg-rose-600 text-white'
                          : 'border border-gray-300 hover:border-rose-400'
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
