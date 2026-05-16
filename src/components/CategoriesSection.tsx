import Image from 'next/image';
import Link from 'next/link';
import { getCategories } from '@/lib/api';
import { CATEGORY_META } from '@/lib/categoryMeta';

export default async function CategoriesSection() {
  let categories: { slug: string; nameFr: string; imageUrl: string | null; _count?: { products: number } }[] = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return (
    <section id="categories" className="py-20 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-rose-500 uppercase tracking-widest text-sm font-semibold mb-2">
            Explorer
          </p>
          <h2 className="font-serif text-4xl font-bold text-gray-900">Nos Catégories</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Retrouvez tout ce dont vous avez besoin pour prendre soin de vous au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => {
            const m = CATEGORY_META[cat.slug];
            const image = cat.imageUrl || m?.image || `https://picsum.photos/seed/${cat.slug}/600/400`;
            const description = m?.shortDescription || '';
            const count = cat._count?.products ?? 0;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 md:h-64">
                  <Image
                    src={image}
                    alt={cat.nameFr}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif text-lg font-bold">{cat.nameFr}</h3>
                  <p className="text-xs text-gray-300">{description}</p>
                  <span className="mt-1 inline-block text-xs bg-rose-600/80 px-2 py-0.5 rounded-full">
                    {count} article{count !== 1 ? 's' : ''}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
