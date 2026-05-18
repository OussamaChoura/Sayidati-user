export const runtime = 'edge';
import { getSettings } from '@/lib/api';
import { ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos de nous – Sayidati',
  description: 'Découvrez l\'histoire et la mission de Sayidati, votre destination beauté en Tunisie.',
};

export default async function AboutPage() {
  let s: Record<string, string> = {};
  try { s = await getSettings(); } catch {}

  const content = s['about_us'] ||
    `Bienvenue chez Sayidati, votre destination beauté de confiance en Tunisie.

Fondée avec passion, Sayidati a pour mission de vous offrir une sélection soigneuse de parfums, soins et cosmétiques pour la femme moderne — à des prix accessibles et avec un service irréprochable.

Nous croyons que chaque femme mérite de se sentir belle et confiante au quotidien. C'est pourquoi nous choisissons chaque produit avec soin, en veillant à la qualité, à l'authenticité et à votre satisfaction.

Notre équipe est à votre écoute pour vous conseiller et vous accompagner dans vos achats. N'hésitez pas à nous contacter !`;

  const paragraphs = content.split('\n').filter(Boolean);

  return (
    <main className="pt-16 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-b border-rose-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link href="/" className="hover:text-rose-500 transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700">À propos de nous</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-rose-100 text-rose-600 p-2 rounded-xl">
              <Heart size={20} />
            </span>
            <h1 className="font-serif text-4xl font-bold text-gray-900">À propos de nous</h1>
          </div>
          <p className="text-gray-500 text-lg">Notre histoire, notre mission, nos valeurs.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5 shadow-sm">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed text-[15px]">{p}</p>
          ))}
        </div>
      </div>
    </main>
  );
}
