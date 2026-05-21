'use client';
import { useState } from 'react';
import { ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useSiteSettings } from '@/context/SiteSettingsContext';

function getDefaultFaq(s: Record<string, string>) {
  const shippingCost  = s['shipping_cost'] || '7';
  const freeThreshold = s['free_shipping_threshold'] || '150';
  const deliveryDelay = s['delivery_delay'] || '1 à 3 jours ouvrables';

  return [
    {
      q: 'Comment passer une commande ?',
      a: 'Ajoutez les articles souhaités à votre panier, puis cliquez sur « Commander ». Renseignez vos coordonnées et validez. Vous serez contacté(e) pour confirmer votre commande.',
    },
    {
      q: 'Quels sont les délais de livraison ?',
      a: `Nous livrons généralement en ${deliveryDelay} partout en Tunisie, à partir de la confirmation de votre commande.`,
    },
    {
      q: 'Puis-je retourner un article ?',
      a: 'Vous disposez d\'un délai de 14 jours après réception pour retourner un article non ouvert et dans son emballage d\'origine. Les produits ouverts (cosmétiques, parfums) ne peuvent pas être retournés pour des raisons d\'hygiène.',
    },
    {
      q: 'Comment puis-je vous contacter ?',
      a: 'Vous pouvez nous joindre par e-mail, téléphone ou WhatsApp. Retrouvez nos coordonnées en bas de page.',
    },
    {
      q: 'Les produits sont-ils authentiques ?',
      a: 'Oui, tous nos produits sont 100 % authentiques et soigneusement sélectionnés auprès de fournisseurs agréés.',
    },
    {
      q: 'La livraison est-elle gratuite ?',
      a: `La livraison est offerte dès ${freeThreshold} DT d'achats. En dessous de ce seuil, des frais de livraison de ${shippingCost} DT s'appliquent.`,
    },
  ];
}

/** Parse raw text into Q&A pairs.
 * Supports formats:
 *   Q: question\nR: answer
 *   Q: question\nA: answer
 *   **question**\nanswer
 * Falls back to treating each pair of lines as Q / A.
 */
function parseFaq(raw: string): { q: string; a: string }[] {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  const items: { q: string; a: string }[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const qMatch = line.match(/^(?:Q\s*[:：]|Question\s*[:：])\s*(.+)/i);
    if (qMatch) {
      const q = qMatch[1];
      let a = '';
      if (i + 1 < lines.length) {
        const nextLine = lines[i + 1];
        const aMatch = nextLine.match(/^(?:R\s*[:：]|A\s*[:：]|Réponse\s*[:：]|Answer\s*[:：])\s*(.+)/i);
        if (aMatch) { a = aMatch[1]; i += 2; }
        else { a = nextLine; i += 2; }
      } else { i++; }
      items.push({ q, a });
    } else {
      i++;
    }
  }
  return items.length > 0 ? items : [];
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900 text-[15px]">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-600 text-[15px] leading-relaxed border-t border-gray-50 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const s = useSiteSettings();
  const raw = s['faq'] || '';
  const parsed = raw.trim() ? parseFaq(raw) : [];
  const items = parsed.length > 0 ? parsed : getDefaultFaq(s);

  return (
    <main className="pt-16 min-h-screen">
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-100 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-5">
            <Link href="/" className="hover:text-rose-500 transition-colors">Accueil</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700">FAQ</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-amber-100 text-amber-600 p-2 rounded-xl">
              <HelpCircle size={20} />
            </span>
            <h1 className="font-serif text-4xl font-bold text-gray-900">Questions fréquentes</h1>
          </div>
          <p className="text-gray-500 text-lg">Toutes les réponses à vos questions.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="space-y-3">
          {items.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>

        <div className="mt-12 bg-rose-50 rounded-2xl p-6 text-center">
          <p className="text-gray-700 font-medium mb-1">Vous n&apos;avez pas trouvé votre réponse ?</p>
          <p className="text-gray-500 text-sm mb-4">Notre équipe est disponible pour vous aider.</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-rose-700 transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
