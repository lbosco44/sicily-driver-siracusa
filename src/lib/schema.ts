export function localBusinessSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.ncctaxisiracusa.com',
    name: 'Sicily Driver Siracusa',
    alternateName: 'Sicily Driver Syracuse',
    url: 'https://www.ncctaxisiracusa.com',
    telephone: '+393756413379',
    email: 'info@ncctaxisiracusa.com',
    vatID: '02150600894',
    priceRange: '€€€',
    image: 'https://www.ncctaxisiracusa.com/images/hero-desktop.webp',
    description: 'Servizio NCC di lusso a Siracusa. Transfer aeroportuali, tour privati, matrimoni ed eventi in Sicilia con Mercedes Classe V, GLB Premium e Classe E.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via della Maestranza, 28',
      addressLocality: 'Siracusa',
      postalCode: '96100',
      addressRegion: 'SR',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.0633,
      longitude: 15.2932,
    },
    areaServed: {
      '@type': 'State',
      name: 'Sicilia',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    hasMap: 'https://www.openstreetmap.org/?mlat=37.0633&mlon=15.2932',
    sameAs: ['https://wa.me/393756413379'],
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(faqs: FaqItem[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function serviceSchema(name: string, areaServed: string, description: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Sicily Driver Siracusa',
      url: 'https://www.ncctaxisiracusa.com',
    },
    areaServed: {
      '@type': 'City',
      name: areaServed,
    },
    serviceType: 'NCC – Noleggio Con Conducente',
  };
}
