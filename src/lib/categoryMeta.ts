export interface CategoryMeta {
  nameFr: string;
  icon: string;
  color: string;
  description: string;
  shortDescription: string;
  image: string;
}

export const CATEGORY_META: Record<string, CategoryMeta> = {
  'parfums': {
    nameFr: 'Parfums',
    icon: '🌹',
    color: 'from-rose-900/70',
    description: "Eaux de parfum & eaux de toilette. Des fragrances qui vous enveloppent d'élégance.",
    shortDescription: 'Eaux de parfum & eaux de toilette',
    image: 'https://picsum.photos/seed/parfums/800/600',
  },
  'soins-visage': {
    nameFr: 'Soins Visage',
    icon: '✨',
    color: 'from-pink-900/70',
    description: 'Crèmes, sérums & masques pour un teint lumineux et une peau parfaite.',
    shortDescription: 'Crèmes, sérums & masques',
    image: 'https://picsum.photos/seed/soins/800/600',
  },
  'maquillage': {
    nameFr: 'Maquillage',
    icon: '💄',
    color: 'from-red-900/70',
    description: 'Rouge à lèvres, fond de teint & bien plus pour sublimer votre beauté.',
    shortDescription: 'Rouge à lèvres, fond de teint & plus',
    image: 'https://picsum.photos/seed/maquillage/800/600',
  },
  'soins-corps': {
    nameFr: 'Soins Corps',
    icon: '🧴',
    color: 'from-amber-900/70',
    description: 'Lotions, huiles & gommages pour une peau douce et nourrie au quotidien.',
    shortDescription: 'Lotions, huiles & gommages',
    image: 'https://picsum.photos/seed/corps/800/600',
  },
  'cheveux': {
    nameFr: 'Cheveux',
    icon: '💇',
    color: 'from-purple-900/70',
    description: 'Shampoings, masques & huiles capillaires pour des cheveux brillants et sains.',
    shortDescription: 'Shampoings, masques & huiles capillaires',
    image: 'https://picsum.photos/seed/cheveux/800/600',
  },
  'accessoires': {
    nameFr: 'Accessoires',
    icon: '👜',
    color: 'from-gray-900/70',
    description: 'Bijoux, écharpes & accessoires pour compléter chaque tenue avec style.',
    shortDescription: 'Bijoux, écharpes & plus',
    image: 'https://picsum.photos/seed/accessoires/800/600',
  },
};
