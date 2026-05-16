import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCategories } from '@/lib/api';
import { CATEGORY_META } from '@/lib/categoryMeta';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catégories – Sayidati',
  description: 'Explorez toutes nos catégories : parfums, soins visage, maquillage, soins corps, cheveux et accessoires.',
};

export default async function CategoriesPage() {
  let categories: Awaited<ReturnType<typeof getCategories>> = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        {/* Page hero */}
        <div className="bg-rose-50 py-16 text-center">
          <p className="text-rose-500 uppercase tracking-widest text-sm font-semibold mb-2">
            Explorer
          </p>
          <h1 className="font-serif text-5xl font-bold text-gray-900">Nos Catégories</h1>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Retrouvez tout ce dont vous avez besoin pour prendre soin de vous au quotidien.
          </p>
        </div>

        {/* Categories grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const m = CATEGORY_META[cat.slug] ?? { icon: '🛍️', color: 'from-gray-900/70', image: `https://picsum.photos/seed/${cat.slug}/800/600`, description: cat.description ?? '', shortDescription: '' };
              const image = cat.imageUrl || m.image;
              const count = cat._count?.products ?? 0;
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-64">
                    <Image
                      src={image}
                      alt={cat.nameFr}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${m.color} via-black/20 to-transparent`} />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{m.icon}</span>
                          <h2 className="font-serif text-xl font-bold">{cat.nameFr}</h2>
                        </div>
                        <p className="text-sm text-gray-200 leading-relaxed line-clamp-2">
                          {m.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                        {count} article{count !== 1 ? 's' : ''}
                      </span>
                      <span className="bg-rose-600 group-hover:bg-rose-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors">
                        Voir →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-rose-600 py-14 text-center text-white">
          <h2 className="font-serif text-3xl font-bold mb-3">Vous cherchez quelque chose de précis ?</h2>
          <p className="text-rose-100 mb-6">Parcourez tous nos produits et filtrez selon vos besoins.</p>
          <Link
            href="/produits"
            className="inline-block bg-white text-rose-600 font-semibold px-8 py-3 rounded-full hover:bg-rose-50 transition-colors"
          >
            Voir tous les produits
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
