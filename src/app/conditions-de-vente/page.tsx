export const runtime = 'edge';
import { getSettings } from '@/lib/api';
import { ChevronRight, FileText } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions de vente – Sayidati',
  description: 'Consultez les conditions générales de vente de la boutique Sayidati.',
};

export default async function ConditionsPage() {
  let s: Record<string, string> = {};
  try { s = await getSettings(); } catch {}

  const shippingCost  = s['shipping_cost'] || '7';
  const freeThreshold = s['free_shipping_threshold'] || '150';
  const deliveryDelay = s['delivery_delay'] || '1 à 3 jours ouvrables';
  const contactEmail  = s['site_email'] || 'contact@sayidati.tn';

  const content = s['terms_of_service'] ||
    `Les présentes conditions générales de vente régissent les relations contractuelles entre Sayidati et ses clients.

En passant commande sur notre boutique, vous acceptez sans réserve les présentes conditions.

COMMANDES
Toute commande passée sur le site est ferme et définitive. Nous nous réservons le droit d'annuler ou de refuser toute commande en cas de problème de disponibilité ou d'erreur manifeste de prix.

PRIX
Les prix affichés sont en dinars tunisiens (TND) et incluent toutes les taxes applicables. Les frais de livraison sont indiqués lors de la finalisation de la commande.

PAIEMENT
Le paiement s'effectue à la livraison (paiement contre remboursement) ou via les moyens de paiement disponibles sur le site.

LIVRAISON
Les délais de livraison sont de ${deliveryDelay} après expédition. Les frais de livraison sont de ${shippingCost} DT. La livraison est gratuite dès ${freeThreshold} DT d'achats. Sayidati ne pourra être tenu responsable des retards causés par le transporteur.

RETOURS
Vous disposez d'un délai de 14 jours à compter de la réception pour retourner un article. Les articles retournés doivent être dans leur état d'origine, non utilisés et dans leur emballage d'origine.

Pour toute question, contactez-nous à ${contactEmail}`;

  const paragraphs = content.split('\n').filter(Boolean);

  return (
    <main className="pt-16 min-h-screen">
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 border-b border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link href="/" className="hover:text-rose-500 transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700">Conditions de vente</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-gray-100 text-gray-600 p-2 rounded-xl">
              <FileText size={20} />
            </span>
            <h1 className="font-serif text-4xl font-bold text-gray-900">Conditions de vente</h1>
          </div>
          <p className="text-gray-500 text-lg">Conditions générales applicables à toutes vos commandes.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4 shadow-sm">
          {paragraphs.map((p, i) => {
            const isTitle = p === p.toUpperCase() && p.length < 60 && /^[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ]/.test(p);
            return isTitle
              ? <h2 key={i} className="font-semibold text-gray-900 text-base mt-6 first:mt-0">{p}</h2>
              : <p key={i} className="text-gray-700 leading-relaxed text-[15px]">{p}</p>;
          })}
        </div>
      </div>
    </main>
  );
}
