export interface HreflangEntry {
  lang: string;
  url: string;
}

export interface SeoData {
  title: string;
  description: string;
  canonical: string;
  hreflang: HreflangEntry[];
}

const BASE_URL = 'https://www.ncctaxisiracusa.com';

// hreflang pairs for vetrina IT/EN (NOT for ncc-* and driver-* landing pages)
const HREFLANG_PAIRS: Record<string, string> = {
  '/':              '/en/',
  '/chi-siamo':     '/en/chi-siamo',
  '/servizi':       '/en/servizi',
  '/tour-sicilia':  '/en/tour-sicilia',
  '/tour-barocco':  '/en/tour-barocco',
  '/contatti':      '/en/contatti',
  '/en/':           '/',
  '/en/chi-siamo':  '/chi-siamo',
  '/en/servizi':    '/servizi',
  '/en/tour-sicilia':  '/tour-sicilia',
  '/en/tour-barocco':  '/tour-barocco',
  '/en/contatti':   '/contatti',
};

// Default pages for IT
const IT_URLS = ['/', '/chi-siamo', '/servizi', '/tour-sicilia', '/tour-barocco', '/contatti'];

const SEO_DATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'NCC Siracusa | Sicily Driver – Transfer & Tour Sicilia',
    description: 'Servizio NCC a Siracusa con Mercedes Classe V. Transfer aeroporto Catania, tour Barocco e Etna, servizio 24/7. Richiedi preventivo.',
  },
  '/chi-siamo': {
    title: 'Chi Siamo | Sicily Driver Siracusa',
    description: 'Esperienza e passione nei servizi NCC e transfer privati in Sicilia. Scopri la nostra storia e i nostri valori.',
  },
  '/servizi': {
    title: 'Servizi NCC Siracusa: Transfer, Tour, Eventi VIP',
    description: 'Transfer aeroportuali, tour privati, servizio matrimoni ed eventi business. Mercedes premium, autisti professionisti, 24/7.',
  },
  '/tour-sicilia': {
    title: 'Tour Sicilia con Autista Privato | Sicily Driver',
    description: 'Tour personalizzati in Sicilia con NCC: Etna, Ortigia, Taormina, Val di Noto. Itinerari su misura con Mercedes Classe V.',
  },
  '/tour-barocco': {
    title: 'Tour Barocco Noto, Modica, Ragusa in 1 Giorno',
    description: 'Tour del Barocco siciliano in giornata con autista privato: Noto, Modica, Ragusa Ibla. Mercedes, guida opzionale, prezzi accessibili.',
  },
  '/contatti': {
    title: 'Contatti | Sicily Driver Siracusa NCC',
    description: 'Prenota il tuo NCC a Siracusa: telefono, WhatsApp, email. Preventivo rapido per transfer e tour in Sicilia.',
  },
  '/ncc-catania': {
    title: 'NCC Catania – Transfer Aeroporto e Autista Privato',
    description: 'Servizio NCC a Catania: transfer aeroporto CTA, tour personalizzati, autista privato Mercedes. Prenota online, conferma immediata.',
  },
  '/ncc-noto': {
    title: 'NCC Noto – Transfer Privati e Tour Barocco',
    description: 'NCC a Noto con transfer aeroporto e tour Barocco. Auto Mercedes premium, servizio professionale, prezzi competitivi.',
  },
  '/ncc-taormina': {
    title: 'NCC Taormina – Transfer di Lusso e Tour Etna',
    description: 'NCC per Taormina con transfer aeroporto Catania e tour Etna. Mercedes Classe V, autisti professionisti, servizio VIP 24/7.',
  },
  '/ncc-ragusa': {
    title: 'NCC Ragusa – Transfer Privati con Conducente',
    description: 'Servizio NCC a Ragusa e Ragusa Ibla. Transfer aeroporto Catania/Comiso, tour Barocco, eventi e matrimoni con Mercedes.',
  },
  '/driver-catania': {
    title: 'Private Driver Catania – Airport Transfer Sicily',
    description: 'Private driver in Catania for airport transfers (CTA) to Siracusa, Noto, Taormina, Ragusa. Mercedes vehicles, English-speaking chauffeur.',
  },
  '/driver-noto': {
    title: 'Private Driver Noto – Transfers & Baroque Tour',
    description: 'Private chauffeur in Noto for airport transfers and Baroque tour. Mercedes vans, professional English-speaking driver, 24/7.',
  },
  '/driver-taormina': {
    title: 'Private Driver Taormina – Luxury Transfer & Etna',
    description: 'Private driver in Taormina with Catania airport transfer and Etna tour. Premium Mercedes, English chauffeur, VIP service.',
  },
  '/driver-ragusa': {
    title: 'Private Driver Ragusa – Chauffeur & Airport Transfer',
    description: 'Private driver in Ragusa and Ragusa Ibla for Catania and Comiso airport transfers, Baroque tours and Sicily connections.',
  },
  '/en/': {
    title: 'NCC Syracuse | Sicily Driver – Airport Transfer & Tours',
    description: 'NCC service in Syracuse with Mercedes V-Class. Catania airport transfers, Baroque and Etna tours, 24/7 service. Get a quote now.',
  },
  '/en/chi-siamo': {
    title: 'About Us | Sicily Driver Syracuse',
    description: 'Discover Sicily Driver Syracuse: experience and passion in private NCC and transfer services in Sicily. Our story and values.',
  },
  '/en/servizi': {
    title: 'Our Services | NCC Sicily – Transfer, Tours, Events',
    description: 'Premium NCC services in Sicily: airport transfers, private tours, weddings and business events. Mercedes fleet, English-speaking drivers, 24/7.',
  },
  '/en/tour-sicilia': {
    title: 'Sicily Private Tours with Driver | Sicily Driver',
    description: 'Discover Sicily with a private driver: Etna, Ortigia, Taormina, Baroque Valley. Custom itineraries with Mercedes V-Class, English-speaking chauffeur.',
  },
  '/en/tour-barocco': {
    title: 'Baroque Tour Noto, Modica, Ragusa in 1 Day',
    description: 'Sicilian Baroque Tour in one day with private driver: Noto, Modica, Ragusa Ibla. Mercedes vehicles, optional guide, unbeatable prices.',
  },
  '/en/contatti': {
    title: 'Contact Us | Sicily Driver Syracuse NCC',
    description: 'Book your NCC in Syracuse: phone, WhatsApp, email. Fast quote for transfers and tours in Sicily. English-speaking team available 24/7.',
  },
};

export function getSeoData(url: string): SeoData {
  const data = SEO_DATA[url] ?? {
    title: 'Sicily Driver Siracusa | NCC Luxury',
    description: 'Servizio NCC di lusso in Sicilia. Transfer aeroportuali, tour privati, autisti professionisti.',
  };

  const hreflang: HreflangEntry[] = [];
  const twinUrl = HREFLANG_PAIRS[url];

  if (twinUrl !== undefined) {
    const isEN = url.startsWith('/en');
    if (isEN) {
      hreflang.push({ lang: 'en', url: `${BASE_URL}${url}` });
      hreflang.push({ lang: 'it', url: `${BASE_URL}${twinUrl}` });
      hreflang.push({ lang: 'x-default', url: `${BASE_URL}${twinUrl}` });
    } else {
      hreflang.push({ lang: 'it', url: `${BASE_URL}${url}` });
      hreflang.push({ lang: 'en', url: `${BASE_URL}${twinUrl}` });
      hreflang.push({ lang: 'x-default', url: `${BASE_URL}${url}` });
    }
  }

  return {
    title: data.title,
    description: data.description,
    canonical: `${BASE_URL}${url}`,
    hreflang,
  };
}
