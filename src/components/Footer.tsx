'use client';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useSiteSettings } from '@/context/SiteSettingsContext';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.78 1.52V6.79a4.85 4.85 0 01-1.01-.1z" />
  </svg>
);

export default function Footer() {
  const s = useSiteSettings();
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-serif text-3xl font-bold text-white mb-3">Sayidati</h2>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Votre destination beauté en ligne. Parfums, soins et maquillage pour la femme moderne.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={s['social.facebook'] || 'https://www.facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Sayidati"
                className="bg-gray-800 hover:bg-rose-600 p-2 rounded-full transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href={s['social.instagram'] || 'https://www.instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Sayidati"
                className="bg-gray-800 hover:bg-rose-600 p-2 rounded-full transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href={s['social.tiktok'] || 'https://www.tiktok.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Sayidati"
                className="bg-gray-800 hover:bg-rose-600 p-2 rounded-full transition-colors"
              >
                <TikTokIcon />
              </a>
              {(s['social.youtube'] || 'https://www.youtube.com') && (
                <a
                  href={s['social.youtube'] || 'https://www.youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Sayidati"
                  className="bg-gray-800 hover:bg-rose-600 p-2 rounded-full transition-colors"
                >
                  <Youtube size={18} />
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Accueil', href: '/' },
                { label: 'Parfums', href: '/categories/parfums' },
                { label: 'Soins Visage', href: '/categories/soins-visage' },
                { label: 'Maquillage', href: '/categories/maquillage' },
                { label: 'Soins Corps', href: '/categories/soins-corps' },
                { label: 'Accessoires', href: '/categories/accessoires' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-rose-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infos */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">
              Informations
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                'À propos de nous',
                'Conditions de vente',
                'Politique de confidentialité',
                'Livraison & retours',
                'FAQ',
                'Passeport Produit (DPP)',
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-rose-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 uppercase tracking-wide text-sm">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-rose-400 shrink-0" />
                <span>{s['contact.address'] || 'Tunis, Tunisie'}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-rose-400 shrink-0" />
                <a href={`tel:${s['contact.phone'] || '+21600000000'}`} className="hover:text-rose-400 transition-colors">
                  {s['contact.phone'] || '+216 00 000 000'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-rose-400 shrink-0" />
                <a
                  href={`mailto:${s['contact.email'] || 'contact@sayidati.tn'}`}
                  className="hover:text-rose-400 transition-colors"
                >
                  {s['contact.email'] || 'contact@sayidati.tn'}
                </a>
              </li>
            </ul>
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${(s['contact.whatsapp'] || '+21600000000').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full transition-colors"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Commander via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Sayidati. Tous droits réservés.
      </div>
    </footer>
  );
}
