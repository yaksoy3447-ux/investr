const fs = require('fs');

const enPath = './i18n/messages/en.json';
const trPath = './i18n/messages/tr.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));

// Update english
en.landing.pricingPage = {
  ...en.landing.pricingPage,
  badge: "Transparent Pricing",
  title1: "Only pay for the contacts",
  title2: "you reveal.",
  subtitle: "Choose a monthly package or buy credits individually.",
  toggleMonthly: "Monthly Subscriptions",
  toggleAnnual: "Pay As You Go (Credits)",
  
  tiers: {
    monthly: [
      {
        id: "starter",
        name: "Starter",
        price: 29,
        period: "/ mo",
        description: "Perfect for starting your fundraise.",
        features: [
          { name: "40 Contact Reveals / month", included: true },
          { name: "Send emails via platform", included: true },
          { name: "CRM features", included: true }
        ]
      },
      {
        id: "pro",
        name: "Pro",
        price: 69,
        period: "/ mo",
        description: "For serious founders.",
        features: [
          { name: "100 Contact Reveals / month", included: true },
          { name: "Send emails via platform", included: true },
          { name: "CRM features", included: true }
        ],
        popular: true
      },
      {
        id: "premium",
        name: "Premium",
        price: 149,
        period: "/ mo",
        description: "For agencies and heavy raisers.",
        features: [
          { name: "500 Contact Reveals / month", included: true },
          { name: "Send emails via platform", included: true },
          { name: "CRM features", included: true }
        ]
      }
    ],
    credits: [
      {
        id: "credits-10",
        name: "10 Credits",
        price: 9.9,
        period: "one-time",
        description: "Perfect for spot-checking investors.",
        features: [
          { name: "10 Contact Reveals", included: true },
          { name: "Never expires", included: true }
        ]
      },
      {
        id: "credits-50",
        name: "50 Credits",
        price: 39,
        period: "one-time",
        description: "Standard top-up.",
        features: [
          { name: "50 Contact Reveals", included: true },
          { name: "Never expires", included: true }
        ],
        popular: true
      },
      {
        id: "credits-100",
        name: "100 Credits",
        price: 69,
        period: "one-time",
        description: "For bulk email campaigns.",
        features: [
          { name: "100 Contact Reveals", included: true },
          { name: "Never expires", included: true }
        ]
      }
    ]
  },
  cta: "Get Started",
  ctaPremium: "Get Started"
};

// Update turkish
tr.landing.pricingPage = {
  ...tr.landing.pricingPage,
  badge: "Şeffaf Fiyatlandırma",
  title1: "Sadece kilidini açtığınız",
  title2: "iletişimler için ödeyin.",
  subtitle: "İhtiyacınıza göre aylık paket seçin veya tekil kredi satın alın.",
  toggleMonthly: "Aylık Paketler",
  toggleAnnual: "Kredi Satın Al (Tek Seferlik)",
  
  tiers: {
    monthly: [
      {
        id: "starter",
        name: "Başlangıç",
        price: 29,
        period: "/ aylık",
        description: "Tohum turuna yeni başlayan girişimler için.",
        features: [
          { name: "Ayda 40 İletişim Açma", included: true },
          { name: "Sistem üzerinden E-posta", included: true },
          { name: "Detaylı CRM takibi", included: true }
        ]
      },
      {
        id: "pro",
        name: "Pro",
        price: 69,
        period: "/ aylık",
        description: "Aktif olarak yatırım arayan ciddi girişimciler için.",
        features: [
          { name: "Ayda 100 İletişim Açma", included: true },
          { name: "Sistem üzerinden E-posta", included: true },
          { name: "Detaylı CRM takibi", included: true }
        ],
        popular: true
      },
      {
        id: "premium",
        name: "Premium",
        price: 149,
        period: "/ aylık",
        description: "Ajanslar ve çok sayıda mail atanlar için.",
        features: [
          { name: "Ayda 500 İletişim Açma", included: true },
          { name: "Sistem üzerinden E-posta", included: true },
          { name: "Detaylı CRM takibi", included: true }
        ]
      }
    ],
    credits: [
      {
        id: "credits-10",
        name: "10 Kredi",
        price: 9.9,
        period: "tek seferlik",
        description: "Nokta atışı yatırımcı bulmak isteyenler için.",
        features: [
          { name: "10 İletişim Kilidi Açma", included: true },
          { name: "Kredilerin süresi hiç dolmaz", included: true }
        ]
      },
      {
        id: "credits-50",
        name: "50 Kredi",
        price: 39,
        period: "tek seferlik",
        description: "Standart kredi paketi.",
        features: [
          { name: "50 İletişim Kilidi Açma", included: true },
          { name: "Kredilerin süresi hiç dolmaz", included: true }
        ],
        popular: true
      },
      {
        id: "credits-100",
        name: "100 Kredi",
        price: 69,
        period: "tek seferlik",
        description: "Büyük mail kampanyaları için.",
        features: [
          { name: "100 İletişim Kilidi Açma", included: true },
          { name: "Kredilerin süresi hiç dolmaz", included: true }
        ]
      }
    ]
  },
  cta: "Hemen Başla",
  ctaPremium: "Hemen Başla"
};

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
console.log('Done mapping robust tiered format');
