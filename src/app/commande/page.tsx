'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { getProductImage } from '@/lib/utils';
import Image from 'next/image';
import { CheckCircle, Loader2, Banknote, Smartphone, Building2, CreditCard, FileText } from 'lucide-react';

type PaymentMethod = 'cod' | 'd17' | 'bank_transfer' | 'edinar' | 'cheque';

interface PaymentOption {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  instructions?: string;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'cod',
    label: 'Paiement a la livraison',
    description: 'Payez en especes a la reception de votre commande.',
    icon: <Banknote size={22} />,
    badge: 'Le plus populaire',
  },
  {
    id: 'd17',
    label: 'D17',
    description: 'Paiement via le portefeuille mobile D17 (Poste Tunisienne).',
    icon: <Smartphone size={22} />,
    instructions: 'Apres confirmation, vous recevrez un numero D17 par WhatsApp ou email pour effectuer le virement.',
  },
  {
    id: 'bank_transfer',
    label: 'Virement bancaire',
    description: 'Virement depuis votre compte bancaire tunisien.',
    icon: <Building2 size={22} />,
    instructions: 'RIB et coordonnees bancaires communiques par WhatsApp ou email apres la commande.',
  },
  {
    id: 'edinar',
    label: 'E-DINAR (La Poste)',
    description: 'Carte prepayee E-DINAR emise par La Poste Tunisienne.',
    icon: <CreditCard size={22} />,
    instructions: 'Un lien de paiement securise vous sera envoye par WhatsApp ou email.',
  },
  {
    id: 'cheque',
    label: 'Cheque bancaire',
    description: "Cheque libelle a l'ordre de Sayidati, envoye avant expedition.",
    icon: <FileText size={22} />,
    instructions: "Adresse d'envoi du cheque communiquee par WhatsApp ou email apres confirmation de commande.",
  },
];

const SHIPPING = 7;

export default function CommandePage() {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [success, setSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    address: '',
    city: '',
    notes: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName:    form.customerName,
          customerPhone:   form.customerPhone,
          customerEmail:   form.customerEmail || undefined,
          customerAddress: form.address || undefined,
          customerCity:    form.city || undefined,
          notes:           form.notes || undefined,
          source:          'website',
          paymentMethod,
          shippingFee:     SHIPPING,
          items: items.map((i) => ({ sku: i.product.sku, quantity: i.quantity })),
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Erreur ${res.status}`);
      }
      const order = await res.json();
      setOrderId(order.id);
      clearCart();
      setSuccess(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  const selectedOption = PAYMENT_OPTIONS.find((p) => p.id === paymentMethod)!;

  if (items.length === 0 && !success) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Votre panier est vide.</p>
            <button onClick={() => router.push('/produits')} className="btn-primary mt-4">
              Voir les produits
            </button>
          </div>
        </main>
  );
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {success ? (
            <div className="bg-white rounded-3xl shadow-sm p-12 text-center max-w-lg mx-auto">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Commande confirmee !</h1>
              <p className="text-gray-500 mb-1">Merci pour votre commande. Nous vous contacterons bientot.</p>
              <p className="text-xs text-gray-400 mb-4">Reference : {orderId}</p>
              {selectedOption.instructions && (
                <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-sm text-rose-800 mb-6 text-left">
                  <p className="font-semibold mb-1">Mode de paiement : {selectedOption.label}</p>
                  <p>{selectedOption.instructions}</p>
                </div>
              )}
              <button onClick={() => router.push('/')} className="btn-primary">
                Retour a l&apos;accueil
              </button>
            </div>

          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

              <div className="lg:col-span-3 space-y-6">

                <div className="bg-white rounded-3xl shadow-sm p-8">
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">Informations de livraison</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                      <input type="text" name="customerName" value={form.customerName} onChange={handleChange} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        placeholder="Fatima Ben Ali" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telephone *</label>
                      <input type="tel" name="customerPhone" value={form.customerPhone} onChange={handleChange} required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        placeholder="+216 XX XXX XXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" name="customerEmail" value={form.customerEmail} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        placeholder="vous@email.com" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                      <input type="text" name="address" value={form.address} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        placeholder="Rue, appartement..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                      <input type="text" name="city" value={form.city} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        placeholder="Tunis" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <input type="text" name="notes" value={form.notes} onChange={handleChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                        placeholder="Instructions de livraison..." />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-8">
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">Mode de paiement</h2>
                  <div className="space-y-3">
                    {PAYMENT_OPTIONS.map((opt) => {
                      const selected = paymentMethod === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPaymentMethod(opt.id)}
                          className={`w-full flex items-start gap-4 rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                            selected ? 'border-rose-500 bg-rose-50' : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                          }`}
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                            selected ? 'border-rose-500' : 'border-gray-300'
                          }`}>
                            {selected && <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />}
                          </div>
                          <span className={`shrink-0 mt-0.5 ${selected ? 'text-rose-600' : 'text-gray-400'}`}>
                            {opt.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`font-semibold text-sm ${selected ? 'text-rose-700' : 'text-gray-800'}`}>
                                {opt.label}
                              </span>
                              {opt.badge && (
                                <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full font-medium">
                                  {opt.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{opt.description}</p>
                            {selected && opt.instructions && (
                              <p className="text-xs text-rose-700 mt-2 bg-rose-100 rounded-xl px-3 py-2">
                                {opt.instructions}
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-sm p-6 sticky top-20">
                  <h2 className="font-semibold text-gray-900 mb-4">Resume de commande</h2>

                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image src={getProductImage(item.product, 100)} alt={item.product.nameFr}
                            fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.product.nameFr}</p>
                          <p className="text-xs text-gray-400">Qte : {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {(Number(item.product.price) * item.quantity).toFixed(3)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sous-total</span>
                      <span className="font-medium">{total.toFixed(3)} TND</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Livraison</span>
                      <span className="font-medium">{SHIPPING.toFixed(3)} TND</span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t pt-3 mt-1">
                      <span>Total</span>
                      <span className="text-rose-600">{(total + SHIPPING).toFixed(3)} TND</span>
                    </div>
                  </div>

                  <div className={`mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm border ${
                    paymentMethod === 'cod'
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-blue-50 border-blue-100 text-blue-700'
                  }`}>
                    <span>{selectedOption.icon}</span>
                    <span className="font-medium">{selectedOption.label}</span>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-5 w-full h-12 bg-rose-600 text-white rounded-full font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {loading && <Loader2 size={16} className="animate-spin" />}
                      Confirmer la commande
                    </button>
                  </form>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
  );
}
