const fs = require('fs');

const enPath = './i18n/messages/en.json';
const trPath = './i18n/messages/tr.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));

// Update english features
en.landing.pricingPage.tiers.monthly = [
  {
    id: "starter",
    name: "Starter",
    price: 29,
    period: "/ mo",
    description: "Perfect for founders starting their seed round.",
    features: [
      { name: "40 Contact Reveals / month", included: true },
      { name: "View Verified Emails & LinkedIn", included: true },
      { name: "Save up to 100 Investors (CRM)", included: true },
      { name: "Direct In-App Email Outreach", included: true },
      { name: "Basic Email Templates", included: true }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: 69,
    period: "/ mo",
    description: "For serious founders actively raising funds.",
    features: [
      { name: "100 Contact Reveals / month", included: true },
      { name: "View Verified Emails & LinkedIn", included: true },
      { name: "Save up to 500 Investors (CRM)", included: true },
      { name: "Export Unlocked Contacts to CSV", included: true },
      { name: "Direct In-App Email Outreach", included: true },
      { name: "Premium Support & Analytics", included: true }
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: 149,
    period: "/ mo",
    description: "For agencies, VCs, and heavy raisers.",
    features: [
      { name: "500 Contact Reveals / month", included: true },
      { name: "View Verified Emails & LinkedIn", included: true },
      { name: "Save up to 1,000 Investors (CRM)", included: true },
      { name: "Export Unlocked Contacts to CSV", included: true },
      { name: "Direct In-App Email Outreach", included: true },
      { name: "24/7 Dedicated Account Manager", included: true }
    ]
  }
];

en.landing.pricingPage.tiers.credits = [
  {
    id: "credits-10",
    name: "10 Credits",
    price: 9.9,
    period: "one-time",
    description: "Perfect for spot-checking specific investors.",
    features: [
      { name: "10 Immediate Contact Reveals", included: true },
      { name: "Credits Never Expire", included: true },
      { name: "Access to Verified Direct Emails", included: true },
      { name: "View Hidden LinkedIn Profiles", included: true },
      { name: "Save Revealed Contacts to CRM", included: true }
    ]
  },
  {
    id: "credits-50",
    name: "50 Credits",
    price: 39,
    period: "one-time",
    description: "Standard top-up for active raisers.",
    features: [
      { name: "50 Immediate Contact Reveals", included: true },
      { name: "Credits Never Expire", included: true },
      { name: "Access to Verified Direct Emails", included: true },
      { name: "View Hidden LinkedIn Profiles", included: true },
      { name: "Save Revealed Contacts to CRM", included: true }
    ],
    popular: true
  },
  {
    id: "credits-100",
    name: "100 Credits",
    price: 69,
    period: "one-time",
    description: "For bulk email campaigns and agencies.",
    features: [
      { name: "100 Immediate Contact Reveals", included: true },
      { name: "Best Value for Bulk Campaigns", included: true },
      { name: "Credits Never Expire", included: true },
      { name: "Access to Verified Direct Emails", included: true },
      { name: "Save Revealed Contacts to CRM", included: true },
      { name: "Export Capabilities Enabled", included: true }
    ]
  }
];

// Update turkish features
tr.landing.pricingPage.tiers.monthly = [
  {
    id: "starter",
    name: "Başlangıç",
    price: 29,
    period: "/ aylık",
    description: "Tohum turuna yeni başlayan girişimler için.",
    features: [
      { name: "Ayda 40 Görünmez İletişim Açma", included: true },
      { name: "Doğrulanmış E-posta ve LinkedIn", included: true },
      { name: "CRM'e 100 Yatırımcı Kaydetme", included: true },
      { name: "Sistem üzerinden doğrudan Email", included: true },
      { name: "Temel E-posta Şablonları", included: true }
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: 69,
    period: "/ aylık",
    description: "Aktif olarak yatırım arayan ciddi girişimciler için.",
    features: [
      { name: "Ayda 100 Görünmez İletişim Açma", included: true },
      { name: "Doğrulanmış E-posta ve LinkedIn", included: true },
      { name: "CRM'e 500 Yatırımcı Kaydetme", included: true },
      { name: "Açılan Kişileri CSV İndirme", included: true },
      { name: "Sistem üzerinden doğrudan Email", included: true },
      { name: "Öncelikli Destek ve Analitik", included: true }
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: 149,
    period: "/ aylık",
    description: "Ajanslar, fonlar ve seri e-posta atanlar için.",
    features: [
      { name: "Ayda 500 Görünmez İletişim Açma", included: true },
      { name: "Doğrulanmış E-posta ve LinkedIn", included: true },
      { name: "CRM'e 1000 Yatırımcı Kaydetme", included: true },
      { name: "Açılan Kişileri CSV İndirme", included: true },
      { name: "Sistem üzerinden doğrudan Email", included: true },
      { name: "7/24 Özel Müşteri Temsilcisi", included: true }
    ]
  }
];

tr.landing.pricingPage.tiers.credits = [
  {
    id: "credits-10",
    name: "10 Kredi",
    price: 9.9,
    period: "tek sefer",
    description: "Nokta atışı yatırımcı bulmak isteyenler için.",
    features: [
      { name: "Anında 10 İletişim Kilidi Açma", included: true },
      { name: "Kredilerin Süresi Asla Dolmaz", included: true },
      { name: "Doğrulanmış Direkt Email Erişimi", included: true },
      { name: "Gizli LinkedIn Profillerini Görme", included: true },
      { name: "Açılan Kişileri CRM'e Kaydetme", included: true }
    ]
  },
  {
    id: "credits-50",
    name: "50 Kredi",
    price: 39,
    period: "tek sefer",
    description: "Sürekli iletişim açan girişimciler için.",
    features: [
      { name: "Anında 50 İletişim Kilidi Açma", included: true },
      { name: "Kredilerin Süresi Asla Dolmaz", included: true },
      { name: "Doğrulanmış Direkt Email Erişimi", included: true },
      { name: "Gizli LinkedIn Profillerini Görme", included: true },
      { name: "Açılan Kişileri CRM'e Kaydetme", included: true }
    ],
    popular: true
  },
  {
    id: "credits-100",
    name: "100 Kredi",
    price: 69,
    period: "tek sefer",
    description: "Büyük mail kampanyaları yapanlar için.",
    features: [
      { name: "Anında 100 İletişim Kilidi Açma", included: true },
      { name: "Toplu İşlemler İçin En İyi Değer", included: true },
      { name: "Kredilerin Süresi Asla Dolmaz", included: true },
      { name: "Doğrulanmış Direkt Email Erişimi", included: true },
      { name: "Açılan Kişileri CRM'e Kaydetme", included: true },
      { name: "Toplu CSV Çıktısı Aktif", included: true }
    ]
  }
];

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
console.log('Beefed up pricing plans done');
