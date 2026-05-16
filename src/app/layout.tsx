import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import CartSidebar from '@/components/CartSidebar';
import AnnouncementBanner from '@/components/AnnouncementBanner';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Sayidati – Parfums & Beauté Féminine',
  description:
    'Découvrez notre sélection exclusive de parfums, soins et produits de beauté pour femme. Livraison rapide en Tunisie.',
  keywords: ['parfums femme', 'beauté', 'soins', 'Tunisie', 'sayidati'],
  openGraph: {
    title: 'Sayidati – Parfums & Beauté Féminine',
    description: 'Votre destination beauté en ligne.',
    type: 'website',
    locale: 'fr_TN',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans bg-white text-gray-900">
        <SiteSettingsProvider>
          <CartProvider>
            <FavoritesProvider>
              <AnnouncementBanner />
              {children}
              <CartSidebar />
            </FavoritesProvider>
          </CartProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
