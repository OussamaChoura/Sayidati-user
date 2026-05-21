'use client';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

const CONSENT_COOKIE = 'sayidati_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!Cookies.get(CONSENT_COOKIE)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    Cookies.set(CONSENT_COOKIE, 'accepted', { expires: 365, path: '/', sameSite: 'lax' });
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-xl bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-gray-600 leading-relaxed">
          <p>
            🍪 Nous utilisons des cookies pour sauvegarder votre panier et vos favoris.
            En continuant, vous acceptez notre{' '}
            <Link href="/politique-de-confidentialite" className="underline text-pink-600 hover:text-pink-700">
              politique de confidentialité
            </Link>.
          </p>
        </div>
        <button
          onClick={accept}
          className="shrink-0 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
