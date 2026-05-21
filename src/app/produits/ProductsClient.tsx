'use client';
import { useState, useTransition, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import type { Category, PaginatedProducts } from '@/lib/types';

interface Props {
  initialData: PaginatedProducts;
  categories: Category[];
  brands: string[];
  initialCategory?: string;
  initialSearch?: string;
  initialBrand?: string;
  initialMinPrice?: number;
  initialMaxPrice?: number;
  initialInStock?: boolean;
  initialPage: number;
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-3"
      >
        {title}
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {open && children}
    </div>
  );
}

export default function ProductsClient({
  initialData,
  categories,
  brands,
  initialCategory,
  initialSearch,
  initialBrand,
  initialMinPrice,
  initialMaxPrice,
  initialInStock,
  initialPage,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState(initialSearch || '');
  const [selectedCats, setSelectedCats] = useState<string[]>(
    initialCategory ? initialCategory.split(',').filter(Boolean) : []
  );
  const [brand, setBrand] = useState(initialBrand || '');
  const [minPrice, setMinPrice] = useState(initialMinPrice !== undefined ? String(initialMinPrice) : '');
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice !== undefined ? String(initialMaxPrice) : '');
  const [inStock, setInStock] = useState(initialInStock || false);

  const navigate = useCallback(
    (overrides: Record<string, string | undefined> = {}) => {
      const base = { search, category: selectedCats.join(','), brand, minPrice, maxPrice, inStock: inStock ? 'true' : '' };
      const merged = { ...base, ...overrides };
      const params: Record<string, string> = {};
      Object.entries(merged).forEach(([k, v]) => { if (v) params[k] = v; });
      const qs = new URLSearchParams(params).toString();
      startTransition(() => router.push(`${pathname}${qs ? `?${qs}` : ''}`));
    },
    [search, selectedCats, brand, minPrice, maxPrice, inStock, pathname, router]
  );

  function applyFilters() {
    navigate({ page: '1' });
    setSidebarOpen(false);
  }

  function clearFilters() {
    setSelectedCats([]); setBrand(''); setMinPrice(''); setMaxPrice(''); setInStock(false); setSearch('');
    startTransition(() => router.push(pathname));
    setSidebarOpen(false);
  }

  const activeFilterCount = selectedCats.length + [brand, minPrice, maxPrice, inStock ? 'x' : ''].filter(Boolean).length;
  const totalPages = Math.ceil(initialData.total / initialData.limit);

  const FilterPanel = (
    <div className="flex flex-col gap-1 text-sm">
      <Section title="Catégorie">
        <div className="flex flex-col gap-1.5">
          {categories.map((cat) => {
            const checked = selectedCats.includes(cat.slug);
            return (
              <label key={cat.slug} className="flex items-center gap-2 cursor-pointer hover:text-rose-600">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    setSelectedCats((prev) =>
                      checked ? prev.filter((s) => s !== cat.slug) : [...prev, cat.slug]
                    )
                  }
                  className="accent-rose-600 rounded"
                />
                <span className="flex-1">{cat.nameFr}</span>
                {cat._count && <span className="text-xs text-gray-400">({cat._count.products})</span>}
              </label>
            );
          })}
        </div>
      </Section>

      <Section title="Prix (TND)">
        <div className="flex items-center gap-2">
          <input type="number" min={0} placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200" />
          <span className="text-gray-400 shrink-0">–</span>
          <input type="number" min={0} placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-rose-200" />
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          {([['0','50'],['50','100'],['100','200'],['200','']] as [string,string][]).map(([mn, mx]) => (
            <button key={`${mn}-${mx}`} onClick={() => { setMinPrice(mn); setMaxPrice(mx); }}
              className="text-xs border border-gray-200 rounded-full px-2 py-0.5 hover:border-rose-400 hover:text-rose-600 transition-colors">
              {mn && mx ? `${mn}–${mx}` : `${mn}+`} TND
            </button>
          ))}
        </div>
      </Section>

      {brands.length > 0 && (
        <Section title="Marque">
          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            <label className="flex items-center gap-2 cursor-pointer hover:text-rose-600">
              <input type="radio" name="brand" checked={brand === ''} onChange={() => setBrand('')} className="accent-rose-600" />
              Toutes
            </label>
            {brands.map((b) => (
              <label key={b} className="flex items-center gap-2 cursor-pointer hover:text-rose-600">
                <input type="radio" name="brand" checked={brand === b} onChange={() => setBrand(b)} className="accent-rose-600" />
                {b}
              </label>
            ))}
          </div>
        </Section>
      )}

      <Section title="Disponibilité" defaultOpen={false}>
        <label className="flex items-center gap-2 cursor-pointer hover:text-rose-600">
          <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-rose-600 rounded" />
          En stock uniquement
        </label>
      </Section>

      <div className="flex gap-2 pt-2">
        <button onClick={applyFilters}
          className="flex-1 bg-rose-600 text-white py-2 rounded-xl text-sm font-semibold hover:bg-rose-700 transition-colors">
          Appliquer
        </button>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters}
            className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-xl text-sm font-medium hover:border-rose-400 hover:text-rose-600 transition-colors">
            Effacer
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">Nos Produits</h1>
        <p className="text-gray-500 mt-1">{initialData.total} article{initialData.total !== 1 ? 's' : ''} disponible{initialData.total !== 1 ? 's' : ''}</p>
      </div>

      {/* Search + mobile filter button */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') applyFilters(); }}
            placeholder="Rechercher un produit ou une marque…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 text-sm" />
        </div>
        <button onClick={() => setSidebarOpen(true)}
          className="lg:hidden relative flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 text-sm hover:border-rose-400 transition-colors">
          <SlidersHorizontal size={16} /> Filtres
          {activeFilterCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{activeFilterCount}</span>
          )}
        </button>
      </div>

      {/* Active filter tags */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCats.map((slug) => (
            <span key={slug} className="flex items-center gap-1 bg-rose-100 text-rose-700 text-xs rounded-full px-3 py-1">
              {categories.find((c) => c.slug === slug)?.nameFr ?? slug}
              <button onClick={() => {
                const next = selectedCats.filter((s) => s !== slug);
                setSelectedCats(next);
                navigate({ category: next.join(','), page: '1' });
              }}><X size={10} /></button>
            </span>
          ))}
          {brand && <span className="flex items-center gap-1 bg-rose-100 text-rose-700 text-xs rounded-full px-3 py-1">
            {brand}
            <button onClick={() => { setBrand(''); navigate({ brand: '', page: '1' }); }}><X size={10} /></button>
          </span>}
          {(minPrice || maxPrice) && <span className="flex items-center gap-1 bg-rose-100 text-rose-700 text-xs rounded-full px-3 py-1">
            {minPrice || '0'} – {maxPrice || '∞'} TND
            <button onClick={() => { setMinPrice(''); setMaxPrice(''); navigate({ minPrice: '', maxPrice: '', page: '1' }); }}><X size={10} /></button>
          </span>}
          {inStock && <span className="flex items-center gap-1 bg-rose-100 text-rose-700 text-xs rounded-full px-3 py-1">
            En stock
            <button onClick={() => { setInStock(false); navigate({ inStock: '', page: '1' }); }}><X size={10} /></button>
          </span>}
          <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-rose-600 underline">Tout effacer</button>
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-60 shrink-0">
          <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 text-sm">Filtres</h2>
              {activeFilterCount > 0 && (
                <span className="bg-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFilterCount}</span>
              )}
            </div>
            {FilterPanel}
          </div>
        </aside>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="relative ml-auto w-[80vw] max-w-72 bg-white h-full overflow-y-auto p-5 shadow-xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Filtres</h2>
                <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
              </div>
              {FilterPanel}
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 transition-opacity ${isPending ? 'opacity-50' : 'opacity-100'}`}>
            {initialData.data.length === 0 ? (
              <div className="col-span-full text-center py-20 text-gray-400">
                <p className="text-lg">Aucun produit trouvé.</p>
                <button onClick={clearFilters} className="mt-4 text-rose-600 text-sm underline">Effacer les filtres</button>
              </div>
            ) : (
              initialData.data.map((product) => <ProductCard key={product.id} product={product} />)
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => navigate({ page: String(p) })}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${p === initialPage ? 'bg-rose-600 text-white' : 'border border-gray-300 hover:border-rose-400'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
