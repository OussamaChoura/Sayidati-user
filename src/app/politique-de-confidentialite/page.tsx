export const runtime = 'edge';
import { getSettings } from '@/lib/api';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité – Sayidati',
  description: 'Découvrez comment Sayidati protège vos données personnelles.',
};

export default async function PrivacyPage() {
  let s: Record<string, string> = {};
  try { s = await getSettings(); } catch {}

  const content = s['privacy_policy'] ||
    `Sayidati accorde une importance primordiale à la protection de vos données personnelles.

COLLECTE DES DONNÉES
Nous collectons uniquement les informations nécessaires au traitement de vos commandes : nom, prénom, adresse de livraison, numéro de téléphone et adresse e-mail.

UTILISATION
Vos données sont utilisées exclusivement pour :
- Traiter et livrer vos commandes
- Vous contacter en cas de besoin concernant votre commande
- Améliorer nos services

PARTAGE
Nous ne vendons, n'échangeons ni ne transférons vos données personnelles à des tiers, sauf dans le cas nécessaire à la livraison de votre commande (transporteur).

VOS DROITS
Conformément à la loi, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à contact@sayidati.tn

COOKIES
Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur.

Dernière mise à jour : 2025`;

  const paragraphs = content.split('\n').filter(Boolean);

  return (
    <main className="pt-16 min-h-screen">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link href="/" className="hover:text-rose-500 transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700">Politique de confidentialité</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-xl">
              <ShieldCheck size={20} />
            </span>
            <h1 className="font-serif text-4xl font-bold text-gray-900">Politique de confidentialité</h1>
          </div>
          <p className="text-gray-500 text-lg">Vos données sont en sécurité chez nous.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4 shadow-sm">
          {paragraphs.map((p, i) => {
            const isTitle = p === p.toUpperCase() && p.length < 60 && /^[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ]/.test(p);
            const isBullet = p.startsWith('- ');
            return isTitle
              ? <h2 key={i} className="font-semibold text-gray-900 text-base mt-6 first:mt-0">{p}</h2>
              : isBullet
              ? <p key={i} className="text-gray-700 leading-relaxed text-[15px] pl-4 before:content-['•'] before:mr-2 before:text-rose-400">{p.slice(2)}</p>
              : <p key={i} className="text-gray-700 leading-relaxed text-[15px]">{p}</p>;
          })}
        </div>
      </div>
    </main>
  );
}
