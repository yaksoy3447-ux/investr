const fs = require('fs');

const enPath = './i18n/messages/en.json';
const trPath = './i18n/messages/tr.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));

// Delete old structure
delete en.landing.pricingPage.tiers;
delete tr.landing.pricingPage.tiers;

// Update English
en.landing.pricingPage.badge = "Transparent Pricing";
en.landing.pricingPage.title1 = "Simple & Predictable";
en.landing.pricingPage.title2 = "Pricing Plans";
en.landing.pricingPage.subtitle = "Choose a monthly or yearly plan. You can also buy standalone credits.";
en.landing.pricingPage.monthly = "Monthly";
en.landing.pricingPage.yearly = "Yearly";
en.landing.pricingPage.yearlyBadge = "GET 3 MONTHS FREE";

en.landing.pricingPage.plans = [
  {
    id: "free",
    name: "Free",
    badge: "Browse the platform",
    price: "0",
    period: "Forever",
    description: "Discover our database and filter investors.",
    isFree: true,
    limits: [
      "Access to 50,000+ Database",
      "Advanced Market Filters",
      "Save up to 5 Investors (CRM)",
      "Blurred Contact Info"
    ],
    features: [
      { name: "Verified Direct Emails", included: false },
      { name: "View LinkedIn Profiles", included: false },
      { name: "Send In-App Emails", included: false },
      { name: "Export to CSV", included: false },
      { name: "Dedicated Support", included: false }
    ],
    cta: "Sign Up for Free"
  },
  {
    id: "credits",
    name: "Pay As You Go",
    badge: "Spot-checking",
    price: "9.90",
    period: "one-time",
    description: "Buy standalone credits. Credits never expire.",
    isCredit: true,
    limits: [
      "Minimum 10 Credits",
      "Credits Never Expire",
      "Save Revealed Contacts",
      "Flexible top-ups"
    ],
    features: [
      { name: "Verified Direct Emails", included: true },
      { name: "View LinkedIn Profiles", included: true },
      { name: "Send In-App Emails", included: false },
      { name: "Export to CSV", included: false },
      { name: "Dedicated Support", included: false }
    ],
    cta: "Buy Credits"
  },
  {
    id: "starter",
    name: "Starter",
    badge: "Solo founder outreach",
    price: "29",
    period: "per month",
    description: "Perfect for founders starting their seed round.",
    isSubscription: true,
    limits: [
      "40 Contact Reveals / month",
      "Save up to 100 Investors to CRM",
      "Unlimited Pipelines",
      "Email up to 40 investors/month"
    ],
    features: [
      { name: "Verified Direct Emails", included: true },
      { name: "View LinkedIn Profiles", included: true },
      { name: "Send In-App Emails", included: true },
      { name: "Export to CSV", included: false },
      { name: "Dedicated Support", included: false }
    ],
    cta: "Start Your Subscription"
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Growing startup outreach",
    price: "69",
    period: "per month",
    description: "For serious founders actively raising funds.",
    popular: true,
    isSubscription: true,
    limits: [
      "100 Contact Reveals / month",
      "Save up to 500 Investors to CRM",
      "Unlimited Pipelines",
      "Email up to 100 investors/month"
    ],
    features: [
      { name: "Verified Direct Emails", included: true },
      { name: "View LinkedIn Profiles", included: true },
      { name: "Send In-App Emails", included: true },
      { name: "Export to CSV", included: true },
      { name: "Dedicated Support", included: false }
    ],
    cta: "Start Your Subscription"
  },
  {
    id: "premium",
    name: "Premium",
    badge: "High-volume team",
    price: "199",
    period: "per month",
    description: "For agencies, VCs, and heavy raisers.",
    isSubscription: true,
    limits: [
      "1,000 Contact Reveals / month",
      "Save unlimited Investors to CRM",
      "Unlimited Pipelines",
      "Email up to 1,000 investors/month"
    ],
    features: [
      { name: "Verified Direct Emails", included: true },
      { name: "View LinkedIn Profiles", included: true },
      { name: "Send In-App Emails", included: true },
      { name: "Export to CSV", included: true },
      { name: "Dedicated Support", included: true }
    ],
    cta: "Start Your Subscription"
  }
];

// Update Turkish
tr.landing.pricingPage.badge = "Şeffaf Fiyatlandırma";
tr.landing.pricingPage.title1 = "İhtiyacınıza Uygun";
tr.landing.pricingPage.title2 = "Esnek Paketler";
tr.landing.pricingPage.subtitle = "Aylık veya yıllık bir plan seçin. İsterseniz serbest krediler alabilirsiniz.";
tr.landing.pricingPage.monthly = "Aylık";
tr.landing.pricingPage.yearly = "Yıllık";
tr.landing.pricingPage.yearlyBadge = "3 AY HEDİYE";

tr.landing.pricingPage.plans = [
  {
    id: "free",
    name: "Ücretsiz",
    badge: "Platformu keşfedin",
    price: "0",
    period: "Süresiz",
    description: "Veritabanımızı tarayın ve filtreleri test edin.",
    isFree: true,
    limits: [
      "50.000+ Bağımsız Veritabanı",
      "Gelişmiş Pazar Filtreleri",
      "CRM'e 5 Yatırımcı Kaydetme",
      "Sansürlü İletişim Bilgileri"
    ],
    features: [
      { name: "Doğrulanmış Direkt Email", included: false },
      { name: "LinkedIn Profili Görme", included: false },
      { name: "Sistem İçi Email Atma", included: false },
      { name: "CSV İndirme", included: false },
      { name: "Öncelikli Destek", included: false }
    ],
    cta: "Ücretsiz Başla"
  },
  {
    id: "credits",
    name: "Kredi Satın Al",
    badge: "Nokta atışı erişim",
    price: "9.90",
    period: "tek sefer",
    description: "Sadece iletişim numarası için serbest kredi alın.",
    isCredit: true,
    limits: [
      "Minimum 10 Kredi Alınır",
      "Kredilerin Süresi Asla Dolmaz",
      "Açılan Kişileri Kaydetme",
      "İstenilen Kadar Artırma (+5)"
    ],
    features: [
      { name: "Doğrulanmış Direkt Email", included: true },
      { name: "LinkedIn Profili Görme", included: true },
      { name: "Sistem İçi Email Atma", included: false },
      { name: "CSV İndirme", included: false },
      { name: "Öncelikli Destek", included: false }
    ],
    cta: "Kredi Al"
  },
  {
    id: "starter",
    name: "Başlangıç",
    badge: "Solo Girişimciler",
    price: "29",
    period: "/ aylık",
    description: "Tohum yatırım turuna yeni başlayanlar için.",
    isSubscription: true,
    limits: [
      "Ayda 40 İletişim Kilidi Açma",
      "CRM'e 100 Yatırımcı Kaydetme",
      "Sınırsız Liste / Pipeline",
      "Ayda 40 Yatırımcıya Direkt Email"
    ],
    features: [
      { name: "Doğrulanmış Direkt Email", included: true },
      { name: "LinkedIn Profili Görme", included: true },
      { name: "Sistem İçi Email Atma", included: true },
      { name: "CSV İndirme", included: false },
      { name: "Öncelikli Destek", included: false }
    ],
    cta: "Aylık Abone Ol"
  },
  {
    id: "pro",
    name: "Pro",
    badge: "Büyüyen Startuplar",
    price: "69",
    period: "/ aylık",
    description: "Aktif olarak yatırım arayan ciddi girişimciler için.",
    popular: true,
    isSubscription: true,
    limits: [
      "Ayda 100 İletişim Kilidi Açma",
      "CRM'e 500 Yatırımcı Kaydetme",
      "Sınırsız Liste / Pipeline",
      "Ayda 100 Yatırımcıya Direkt Email"
    ],
    features: [
      { name: "Doğrulanmış Direkt Email", included: true },
      { name: "LinkedIn Profili Görme", included: true },
      { name: "Sistem İçi Email Atma", included: true },
      { name: "CSV İndirme", included: true },
      { name: "Öncelikli Destek", included: false }
    ],
    cta: "Aylık Abone Ol"
  },
  {
    id: "premium",
    name: "Premium",
    badge: "Yüksek Hacimli Ekipler",
    price: "199",
    period: "/ aylık",
    description: "Ajanslar, fonlar ve büyük seriler.",
    isSubscription: true,
    limits: [
      "Ayda 1000 İletişim Kilidi Açma",
      "CRM'e Sınırsız Kayıt",
      "Sınırsız Liste / Pipeline",
      "Ayda 1000 Yatırımcıya Direkt Email"
    ],
    features: [
      { name: "Doğrulanmış Direkt Email", included: true },
      { name: "LinkedIn Profili Görme", included: true },
      { name: "Sistem İçi Email Atma", included: true },
      { name: "CSV İndirme", included: true },
      { name: "Öncelikli Destek", included: true }
    ],
    cta: "Aylık Abone Ol"
  }
];

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
console.log('Done rewriting pricing to Angel Match model');
