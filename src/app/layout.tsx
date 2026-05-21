import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import CartSidebar from '@/components/CartSidebar';
import CookieConsent from '@/components/CookieConsent';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCategories } from '@/lib/api';
import { CATEGORY_META } from '@/lib/categoryMeta';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Sayidati – Parfums & Beauté Féminine',
  description:
    'Découvrez notre sélection exclusive de parfums, soins et produits de beauté pour femme. Livraison rapide en Tunisie.',
  keywords: ['parfums femme', 'beauté', 'soins', 'Tunisie', 'sayidati'],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Sayidati – Parfums & Beauté Féminine',
    description: 'Votre destination beauté en ligne.',
    type: 'website',
    locale: 'fr_TN',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let navCategories: { slug: string; name: string; description: string; icon: string }[] = [];
  try {
    const cats = await getCategories();
    navCategories = cats.map((cat) => {
      const meta = CATEGORY_META[cat.slug];
      return {
        slug: cat.slug,
        name: cat.nameFr,
        description: cat.description ?? meta?.shortDescription ?? '',
        icon: meta?.icon ?? '🛍️',
      };
    });
  } catch {}

  return (
    <html lang="fr">
      <body className="font-sans bg-white text-gray-900">
        <SiteSettingsProvider>
          <CartProvider>
            <FavoritesProvider>
              <AnnouncementBanner />
              <Navbar initialCategories={navCategories} />
              {children}
              <Footer />
              <CartSidebar />
              <CookieConsent />
            </FavoritesProvider>
          </CartProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
