export const runtime = 'edge';
import { getSettings } from '@/lib/api';
import { ChevronRight, Truck } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Livraison & retours – Sayidati',
  description: 'Tout savoir sur la livraison et la politique de retour Sayidati.',
};

export default async function LivraisonPage() {
  let s: Record<string, string> = {};
  try { s = await getSettings(); } catch {}

  const shippingCost      = s['shipping_cost'] || '7';
  const freeThreshold     = s['free_shipping_threshold'] || '150';
  const deliveryDelay     = s['delivery_delay'] || '1 à 3 jours ouvrables';
  const contactEmail      = s['site_email'] || 'contact@sayidati.tn';
  const content           = s['return_policy'] || '';

  const defaultContent =
    `LIVRAISON
Nous livrons partout en Tunisie. Les commandes sont expédiées sous 24 à 48 h après confirmation.

Délai de livraison : ${deliveryDelay}
Frais de livraison : ${shippingCost} DT
Livraison gratuite dès ${freeThreshold} DT d'achats

SUIVI DE COMMANDE
Un numéro de suivi vous est communiqué par SMS ou e-mail dès l'expédition de votre commande.

RETOURS
Vous disposez d'un délai de 14 jours à compter de la réception pour nous retourner un article.

CONDITIONS DE RETOUR
- L'article doit être dans son état d'origine, non utilisé et dans son emballage d'origine
- Les produits ouverts (cosmétiques, parfums) ne peuvent pas être retournés pour des raisons d'hygiène
- Les frais de retour sont à la charge du client sauf en cas d'erreur de notre part

REMBOURSEMENT
Le remboursement est effectué dans un délai de 7 jours ouvrables après réception et vérification de l'article retourné.

Pour initier un retour, contactez-nous à ${contactEmail} ou via WhatsApp.`;

  const finalContent = content || defaultContent;
  const paragraphs = finalContent.split('\n').filter(Boolean);

  return (
    <main className="pt-16 min-h-screen">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-b border-green-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link href="/" className="hover:text-rose-500 transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700">Livraison & retours</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-green-100 text-green-600 p-2 rounded-xl">
              <Truck size={20} />
            </span>
            <h1 className="font-serif text-4xl font-bold text-gray-900">Livraison & retours</h1>
          </div>
          <p className="text-gray-500 text-lg">Tout ce que vous devez savoir sur nos délais et notre politique de retour.</p>
        </div>
      </div>

      {/* Key info cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Frais de livraison', value: `${shippingCost} DT`, sub: 'partout en Tunisie' },
            { label: 'Livraison gratuite', value: `dès ${freeThreshold} DT`, sub: 'd\'achats' },
            { label: 'Délai de livraison', value: deliveryDelay, sub: 'après expédition' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{card.label}</p>
              <p className="font-bold text-gray-900 text-lg leading-tight">{card.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4 shadow-sm">
          {paragraphs.map((p, i) => {
            const isTitle = p === p.toUpperCase() && p.length < 60 && /^[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ]/.test(p);
            const isBullet = p.startsWith('- ');
            return isTitle
              ? <h2 key={i} className="font-semibold text-gray-900 text-base mt-6 first:mt-0">{p}</h2>
              : isBullet
              ? <p key={i} className="text-gray-700 leading-relaxed text-[15px] pl-4 before:content-['•'] before:mr-2 before:text-green-500">{p.slice(2)}</p>
              : <p key={i} className="text-gray-700 leading-relaxed text-[15px]">{p}</p>;
          })}
        </div>
      </div>
    </main>
  );
}
