'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ShoppingBag, Search, Heart, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { CATEGORY_META } from '@/lib/categoryMeta';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://sayidati-backend-php-production.up.railway.app';

interface NavCategory { slug: string; name: string; description: string; icon: string; }

export default function Navbar({ initialCategories }: { initialCategories?: NavCategory[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCategOpen, setMobileCategOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [navCategories, setNavCategories] = useState<NavCategory[]>(initialCategories ?? []);
  const { count, openCart } = useCart();
  const { count: favCount } = useFavorites();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) return;
    fetch(`${API}/api/v1/categories`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: { slug: string; nameFr: string; description: string }[] | null) => {
        if (!data) return;
        setNavCategories(
          data.map((cat) => {
            const meta = CATEGORY_META[cat.slug];
            return {
              slug: cat.slug,
              name: cat.nameFr,
              description: cat.description ?? meta?.shortDescription ?? '',
              icon: meta?.icon ?? '🛍️',
            };
          })
        );
      })
      .catch(() => {});
  }, []);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/produits?search=${encodeURIComponent(q)}`);
      setSearchQuery('');
    }
    setSearchOpen(false);
  }

  function openSearch() {
    setSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold text-rose-600 tracking-wide shrink-0">
          Sayidati
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Accueil */}
          <Link href="/" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
            Accueil
          </Link>

          {/* Catégories dropdown */}
          <div ref={dropdownRef} className="relative">
            <div className="flex items-center gap-1">
              <Link
                href="/categories"
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                Catégories
              </Link>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="Ouvrir le menu catégories"
                className="text-gray-500 hover:text-rose-600 transition-colors p-0.5"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 grid grid-cols-2 gap-2">
                {/* All categories link */}
                <Link
                  href="/categories"
                  onClick={() => setDropdownOpen(false)}
                  className="col-span-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 transition-colors mb-1"
                >
                  <span className="text-rose-600 font-semibold text-sm">Voir toutes les catégories →</span>
                </Link>
                {navCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <span className="text-xl leading-none mt-0.5">{cat.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                        {cat.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{cat.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Produits */}
          <Link href="/produits" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
            Produits
          </Link>

          {/* Contact */}
          <Link href="/contact" className="text-gray-700 hover:text-rose-600 font-medium transition-colors">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-4 text-gray-600">
          {/* Search toggle */}
          <button
            aria-label="Rechercher"
            onClick={() => setSearchOpen((v) => !v)}
            className={`hover:text-rose-600 transition-colors ${searchOpen ? 'text-rose-600' : ''}`}
          >
            <Search size={20} />
          </button>
          {/* Favorites */}
          <Link href="/favoris" aria-label="Favoris" className="hover:text-rose-600 transition-colors relative">
            <Heart size={20} fill={favCount > 0 ? '#f43f5e' : 'none'} className={favCount > 0 ? 'text-rose-500' : ''} />
            {favCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>
          <button
            aria-label="Panier"
            onClick={openCart}
            className="hover:text-rose-600 transition-colors relative"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 flex flex-col">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-rose-600 font-medium py-3 border-b border-gray-100"
          >
            Accueil
          </Link>

          {/* Categories accordion */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => setMobileCategOpen((v) => !v)}
              className="w-full flex items-center justify-between text-gray-700 font-medium py-3"
            >
              <Link href="/categories" onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}>
                Catégories
              </Link>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform duration-200 ${mobileCategOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileCategOpen && (
              <div className="pb-2 pl-2 grid grid-cols-2 gap-1">
                {navCategories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-rose-50 text-sm text-gray-700"
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/produits"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-rose-600 font-medium py-3 border-b border-gray-100"
          >
            Produits
          </Link>

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-rose-600 font-medium py-3 border-b border-gray-100"
          >
            Contact
          </Link>

          {/* Mobile cart */}
          <button
            onClick={() => { setMenuOpen(false); openCart(); }}
            className="flex items-center gap-2 text-gray-700 hover:text-rose-600 font-medium py-3"
          >
            <ShoppingBag size={18} />
            Panier {count > 0 && <span className="bg-rose-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{count}</span>}
          </button>
        </div>
      )}

      {/* Search dropdown panel — slides below the header bar */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-white/98 backdrop-blur-sm px-4 py-4 shadow-md">
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex items-center gap-2"
          >
            <input
              ref={searchInputRef}
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
              placeholder="Rechercher un produit, une marque…"
              className="flex-1 border border-gray-200 rounded-full px-5 py-2.5 text-sm text-gray-800 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            />
            <button
              type="submit"
              className="bg-rose-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors flex items-center gap-2"
            >
              <Search size={15} />
              Rechercher
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Fermer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
