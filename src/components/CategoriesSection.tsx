'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORY_META } from '@/lib/categoryMeta';

const GAP = 24;

type Cat = { slug: string; nameFr: string; description: string; imageUrl: string | null; productsCount: number };

export default function CategoriesSection({ initialCategories = [] }: { initialCategories?: Cat[] }) {
  const [categories] = useState<Cat[]>(initialCategories);
  const [colWidth, setColWidth] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const columns: Cat[][] = [];
  for (let i = 0; i < categories.length; i += 2) {
    columns.push(categories.slice(i, i + 2));
  }

  const tripled = [...columns, ...columns, ...columns];

  // Compute responsive column width based on container size
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      const visibleCols = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setColWidth((w - GAP * (visibleCols - 1)) / visibleCols);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [categories.length]); // eslint-disable-line

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || columns.length === 0 || colWidth === 0) return;
    const colW = colWidth + GAP;
    el.scrollLeft = colW * columns.length;
  }, [categories.length, colWidth]); // eslint-disable-line

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || columns.length === 0 || isScrolling.current || colWidth === 0) return;
    const colW = colWidth + GAP;
    const setWidth = colW * columns.length;
    if (el.scrollLeft < setWidth * 0.5) {
      el.scrollLeft += setWidth;
    } else if (el.scrollLeft >= setWidth * 2) {
      el.scrollLeft -= setWidth;
    }
  }, [columns.length, colWidth]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollByColumn = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el || colWidth === 0) return;
    const colW = colWidth + GAP;
    const setWidth = colW * columns.length;
    isScrolling.current = true;
    el.scrollBy({ left: dir === 'right' ? colW : -colW, behavior: 'smooth' });
    setTimeout(() => {
      isScrolling.current = false;
      const cur = el.scrollLeft;
      if (cur < setWidth * 0.5) {
        el.scrollLeft += setWidth;
      } else if (cur >= setWidth * 2) {
        el.scrollLeft -= setWidth;
      }
    }, 350);
  };

  return (
    <section id="categories" className="py-20 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-rose-500 uppercase tracking-widest text-sm font-semibold mb-2">Explorer</p>
          <h2 className="font-serif text-4xl font-bold text-gray-900">Nos Cat&eacute;gories</h2>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Retrouvez tout ce dont vous avez besoin pour prendre soin de vous au quotidien.
          </p>
        </div>

        {categories.length === 0 ? null : (
          <div className="relative">
            <button
              onClick={() => scrollByColumn('left')}
              className="hidden sm:flex items-center absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-rose-50 transition-colors"
              aria-label="Defiler a gauche"
            >
              <ChevronLeft size={22} className="text-rose-600" />
            </button>

            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6" style={{ width: 'max-content' }}>
                {tripled.map((col, ci) => (
                  <div
                    key={ci}
                    className="flex flex-col gap-4 flex-shrink-0"
                    style={{ width: colWidth > 0 ? `${colWidth}px` : undefined }}
                  >
                    {col.map((cat) => {
                      const m = CATEGORY_META[cat.slug];
                      const image = cat.imageUrl || m?.image || `https://picsum.photos/seed/${cat.slug}/600/400`;
                      const description = cat.description || m?.shortDescription || '';
                      return (
                        <Link
                          key={cat.slug}
                          href={`/categories/${cat.slug}`}
                          className="group relative rounded-2xl overflow-hidden shadow hover:shadow-xl transition-shadow duration-300 block"
                        >
                          <div className="relative h-48 md:h-56">
                            <Image
                              src={image}
                              alt={cat.nameFr}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-20 flex flex-col justify-end px-4 pb-3">
                            <div className="flex items-end justify-between gap-2">
                              <div className="min-w-0">
                                <p className="font-serif text-base font-bold text-white leading-tight truncate">
                                  {cat.nameFr}
                                </p>
                                <p className="text-xs text-gray-300 mt-0.5 truncate">{description}</p>
                              </div>
                              <span className="flex-shrink-0 text-xs bg-rose-600/80 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                                {cat.productsCount} article{cat.productsCount !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => scrollByColumn('right')}
              className="hidden sm:flex items-center absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-rose-50 transition-colors"
              aria-label="Defiler a droite"
            >
              <ChevronRight size={22} className="text-rose-600" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}