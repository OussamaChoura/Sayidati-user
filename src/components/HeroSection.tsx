'use client';
import Image from 'next/image';
import { useSiteSettings } from '@/context/SiteSettingsContext';

export default function HeroSection() {
  const s = useSiteSettings();

  const title    = s['hero_title']    || "L'élégance\nà votre portée";
  const subtitle = s['hero_subtitle'] || 'Découvrez notre sélection exclusive de parfums, soins et accessoires pour sublimer chaque instant.';
  const ctaText  = s['hero_cta_text'] || 'Voir les produits';
  const imageUrl = s['hero_image_url'] || 'https://picsum.photos/seed/sayidati-hero/1600/900';

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={imageUrl}
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
          {s['hero_badge'] || 'Collection Printemps 2026'}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-xl whitespace-pre-line">
          {title.includes('\n') ? (
            <>
              {title.split('\n')[0]} <br />
              <span className="text-rose-400">{title.split('\n')[1]}</span>
            </>
          ) : title}
        </h1>
        <p className="text-lg text-gray-200 max-w-md mb-8">
          {subtitle}
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#produits" className="btn-primary text-base">
            {ctaText}
          </a>
          <a href="#contact" className="btn-outline text-base border-white text-white hover:bg-white hover:text-rose-600">
            Nous contacter
          </a>
        </div>
      </div>
    </section>
  );
}
