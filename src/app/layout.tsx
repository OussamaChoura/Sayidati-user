import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { SiteSettingsProvider } from '@/context/SiteSettingsContext';
import CartSidebar from '@/components/CartSidebar';
import AnnouncementBanner from '@/components/AnnouncementBanner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

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
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-white text-gray-900`}>
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
