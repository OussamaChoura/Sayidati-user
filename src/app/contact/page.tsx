import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: 'Contactez-nous – Sayidati',
  description: 'Contactez l\'équipe Sayidati pour toute question sur nos produits ou votre commande.',
};

export default function ContactPage() {
  return (
    <main className="pt-16 min-h-screen">
        {/* Hero */}
        <div className="bg-rose-50 py-16 text-center">
          <p className="text-rose-500 uppercase tracking-widest text-sm font-semibold mb-2">Support</p>
          <h1 className="font-serif text-5xl font-bold text-gray-900">Contactez-nous</h1>
          <p className="mt-3 text-gray-500 max-w-lg mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions du lundi au samedi.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Envoyer un message</h2>
            <form className="space-y-5" action="#" method="POST">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Fatima"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                    placeholder="Ben Ali"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="votremail@exemple.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
                  placeholder="+216 XX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                <select
                  name="subject"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 bg-white"
                >
                  <option value="">Choisissez un sujet</option>
                  <option value="order">Suivi de commande</option>
                  <option value="product">Question produit</option>
                  <option value="return">Retour / Remboursement</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Envoyer le message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div className="bg-rose-50 rounded-3xl p-8 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-gray-900">Informations de contact</h2>
              {[
                {
                  icon: <MapPin size={20} className="text-rose-500 shrink-0 mt-0.5" />,
                  label: 'Adresse',
                  value: 'Tunis, Tunisie',
                },
                {
                  icon: <Phone size={20} className="text-rose-500 shrink-0" />,
                  label: 'Téléphone',
                  value: '+216 00 000 000',
                  href: 'tel:+21600000000',
                },
                {
                  icon: <Mail size={20} className="text-rose-500 shrink-0" />,
                  label: 'Email',
                  value: 'contact@sayidati.tn',
                  href: 'mailto:contact@sayidati.tn',
                },
                {
                  icon: <Clock size={20} className="text-rose-500 shrink-0" />,
                  label: 'Horaires',
                  value: 'Lun – Sam : 9h00 – 18h00',
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  {item.icon}
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-gray-800 hover:text-rose-600 transition-colors font-medium">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-800 font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <div className="bg-green-50 rounded-3xl p-8">
              <h3 className="font-semibold text-gray-900 mb-2">Commandez via WhatsApp</h3>
              <p className="text-sm text-gray-500 mb-4">
                Réponse rapide garantie. Envoyez-nous vos demandes directement sur WhatsApp.
              </p>
              <a
                href="https://wa.me/21600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full font-medium transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Discuter sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
  );
}
