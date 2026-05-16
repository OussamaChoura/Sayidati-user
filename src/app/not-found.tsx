import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center bg-rose-50">
        <div className="text-center px-4">
          <p className="font-serif text-9xl font-bold text-rose-200 select-none">404</p>
          <h1 className="font-serif text-3xl font-bold text-gray-900 -mt-4">Page introuvable</h1>
          <p className="text-gray-500 mt-3 max-w-sm mx-auto">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link href="/" className="btn-primary mt-6 inline-block">
            Retour à l'accueil
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
