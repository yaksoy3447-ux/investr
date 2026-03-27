const fs = require('fs');

const enPath = './i18n/messages/en.json';
const trPath = './i18n/messages/tr.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));

// English Update
if (en.landing && en.landing.pricing) {
  en.landing.pricing.title = "Simple, Predictable Pricing";
  en.landing.pricing.subtitle = "Pay only for the investor contacts you reveal. No hidden fees.";
  en.landing.pricing.monthly = "Monthly Packs";
  en.landing.pricing.annual = "Pay As You Go";

  en.landing.pricing.tiers = [
    {
      "name": "Free",
      "price": "0",
      "period": "Forever",
      "description": "Discover our database and filter investors. No email reveals.",
      "features": [
        "Full access to 5,000+ investors",
        "Advanced filtering & sorting",
        "Blurred contact info",
        "Save to specific CRM list"
      ],
      "cta": "Get Started",
      "href": "/register",
      "popular": false
    },
    {
      "name": "Starter",
      "price": "29",
      "period": "per month",
      "description": "Perfect for founders starting their seed round.",
      "features": [
        "40 Contact Reveals / month",
        "View verified emails & LinkedIn",
        "Direct email outreach via UI",
        "Basic email templates"
      ],
      "cta": "Subscribe",
      "href": "#",
      "popular": true
    },
    {
      "name": "Pro",
      "price": "69",
      "period": "per month",
      "description": "For serious founders actively raising funds.",
      "features": [
        "100 Contact Reveals / month",
        "Priority support",
        "Advanced email analytics",
        "Export unlocked contacts to CSV"
      ],
      "cta": "Subscribe",
      "href": "#",
      "popular": false
    },
    {
      "name": "Premium",
      "price": "149",
      "period": "per month",
      "description": "For agencies, VCs, and heavy raisers.",
      "features": [
        "500 Contact Reveals / month",
        "Dedicated account manager",
        "Full API access (Coming soon)",
        "Unlock full database analytics"
      ],
      "cta": "Subscribe",
      "href": "#",
      "popular": false
    }
  ];
}

// Turkish Update
if (tr.landing && tr.landing.pricing) {
  tr.landing.pricing.title = "Şeffaf ve Esnek Fiyatlandırma";
  tr.landing.pricing.subtitle = "Sadece iletişim bilgilerini açtığınız yatırımcılar için ödeyin.";
  tr.landing.pricing.monthly = "Aylık Paketler";
  tr.landing.pricing.annual = "Kredi Satın Al";

  tr.landing.pricing.tiers = [
    {
      "name": "Ücretsiz",
      "price": "0",
      "period": "Süresiz",
      "description": "Veritabanını keşfedin ve yatırımcıları görün. (İletişim bilgileri sansürlüdür)",
      "features": [
        "5.000+ yatırımcıya erişim",
        "Gelişmiş filtreleme sistemi",
        "CRM'e kaydetme",
        "Sansürlü iletişim bilgileri"
      ],
      "cta": "Ücretsiz Başla",
      "href": "/register",
      "popular": false
    },
    {
      "name": "Başlangıç",
      "price": "29",
      "period": "/ aylık",
      "description": "Tohum turuna yeni başlayan girişimciler için ideal.",
      "features": [
        "Aylık 40 Yatırımcı Kilidi Açma",
        "E-posta ve LinkedIn görme",
        "Sistem üzerinden doğrudan e-posta",
        "Temel e-posta şablonları"
      ],
      "cta": "Abone Ol",
      "href": "#",
      "popular": true
    },
    {
      "name": "Pro",
      "price": "69",
      "period": "/ aylık",
      "description": "Aktif olarak yatırım arayan ciddi girişimciler için.",
      "features": [
        "Aylık 100 Yatırımcı Kilidi Açma",
        "Öncelikli destek",
        "Gelişmiş e-posta analitiği",
        "Açılan kişileri CSV olarak indirme"
      ],
      "cta": "Abone Ol",
      "href": "#",
      "popular": false
    },
    {
      "name": "Premium",
      "price": "149",
      "period": "/ aylık",
      "description": "Ajanslar, fonlar ve yoğun e-posta atanlar için.",
      "features": [
        "Aylık 500 Yatırımcı Kilidi Açma",
        "Özel müşteri temsilcisi",
        "Tüm veritabanı analizleri",
        "CSV Dışa Aktarma"
      ],
      "cta": "Abone Ol",
      "href": "#",
      "popular": false
    }
  ];
}

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
console.log('Translations updated to Credit System.');
