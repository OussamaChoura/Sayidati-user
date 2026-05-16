export default function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://sayidati.tn/#website',
        url: 'https://sayidati.tn/',
        name: 'Sayidati',
        description: 'Parfums, soins et maquillage pour femme en Tunisie.',
        inLanguage: 'fr',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://sayidati.tn/recherche?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': 'https://sayidati.tn/#organization',
        name: 'Sayidati',
        url: 'https://sayidati.tn/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sayidati.tn/logo.png',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+216-00-000-000',
          contactType: 'customer service',
          availableLanguage: ['French', 'Arabic'],
        },
        sameAs: [
          'https://www.facebook.com/sayidati',
          'https://www.instagram.com/sayidati',
          'https://www.tiktok.com/@sayidati',
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
