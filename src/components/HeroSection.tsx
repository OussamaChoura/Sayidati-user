import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="https://picsum.photos/seed/sayidati-hero/1600/900"
        alt="Parfums et beauté féminine – Sayidati"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
        <p className="uppercase tracking-widest text-rose-300 text-sm font-semibold mb-3">
          Collection Printemps 2026
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-xl">
          L'élégance <br />
          <span className="text-rose-400">à votre portée</span>
        </h1>
        <p className="text-lg text-gray-200 max-w-md mb-8">
          Découvrez notre sélection exclusive de parfums, soins et accessoires pour sublimer chaque instant.
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#produits" className="btn-primary text-base">
            Voir les produits
          </a>
          <a href="#contact" className="btn-outline text-base border-white text-white hover:bg-white hover:text-rose-600">
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}
