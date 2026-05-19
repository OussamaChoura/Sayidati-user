const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sayidati.tn';

export default function WebsiteJsonLd({ settings = {} }: { settings?: Record<string, string> }) {
  const phone    = settings['contact.phone']    || settings['site_phone']    || '';
  const socials  = [
    settings['social.facebook']  || settings['facebook_url'],
    settings['social.instagram'] || settings['instagram_url'],
    settings['social.tiktok']    || settings['tiktok_url'],
  ].filter(Boolean) as string[];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: settings['site_name'] || 'Sayidati',
        description: settings['meta_description'] || 'Parfums, soins et maquillage pour femme en Tunisie.',
        inLanguage: 'fr',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/recherche?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: settings['site_name'] || 'Sayidati',
        url: `${SITE_URL}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/logo.png`,
        },
        ...(phone && {
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: phone,
            contactType: 'customer service',
            availableLanguage: ['French', 'Arabic'],
          },
        }),
        ...(socials.length > 0 && { sameAs: socials }),
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
