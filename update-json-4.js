const fs = require('fs');
const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

tr.landing.pricingPage.billedYearly = "Yıllık faturalandırılır";
en.landing.pricingPage.billedYearly = "Billed annually";
tr.landing.pricingPage.choosePlan = "Planı Seç";
en.landing.pricingPage.choosePlan = "Choose Plan";
tr.landing.pricingPage.mostPopular = "En Popüler";
en.landing.pricingPage.mostPopular = "Most Popular";
tr.landing.pricingPage.perMonth = "/ ay";
en.landing.pricingPage.perMonth = "/ mo";
tr.landing.pricingPage.perYear = "/ ay (Yıllık Plan)";
en.landing.pricingPage.perYear = "/ mo (Yearly Plan)";

tr.landing.pricingPage.planFeatures = {
  starter: [
    { name: "100 yatırımcıya kadar CRM kaydı", included: true },
    { name: "Sınırsız liste oluşturma", included: true },
    { name: "Ayda 100 email gönderimi", included: true },
    { name: "Aylık 100 CSV dışa aktarımı", included: true },
    { name: "Detaylı yatırımcı veritabanı erişimi", included: true },
    { name: "Gelişmiş Filtreleme", included: true },
    { name: "Sınırsız Email takibi", included: true },
    { name: "Öncelikli müşteri desteği", included: false },
    { name: "Pitch deck kütüphanesine erişim", included: false }
  ],
  growth: [
    { name: "500 yatırımcıya kadar CRM kaydı", included: true },
    { name: "Sınırsız liste oluşturma", included: true },
    { name: "Ayda 500 email gönderimi", included: true },
    { name: "Aylık 500 CSV dışa aktarımı", included: true },
    { name: "Detaylı yatırımcı veritabanı erişimi", included: true },
    { name: "Gelişmiş Filtreleme", included: true },
    { name: "Sınırsız Email takibi", included: true },
    { name: "Öncelikli müşteri desteği", included: false },
    { name: "Pitch deck kütüphanesine erişim", included: true }
  ],
  premium: [
    { name: "1000 yatırımcıya kadar CRM kaydı", included: true },
    { name: "Sınırsız liste oluşturma", included: true },
    { name: "Ayda 1000 email gönderimi", included: true },
    { name: "Aylık 1000 CSV dışa aktarımı", included: true },
    { name: "Detaylı yatırımcı veritabanı erişimi", included: true },
    { name: "Gelişmiş Filtreleme", included: true },
    { name: "Sınırsız Email takibi", included: true },
    { name: "Öncelikli müşteri desteği", included: true },
    { name: "Pitch deck kütüphanesine erişim", included: true }
  ]
};

en.landing.pricingPage.planFeatures = {
  starter: [
    { name: "CRM records for up to 100 investors", included: true },
    { name: "Unlimited list creation", included: true },
    { name: "100 emails per month", included: true },
    { name: "100 CSV exports per month", included: true },
    { name: "Detailed investor database access", included: true },
    { name: "Advanced Filtering", included: true },
    { name: "Unlimited Email tracking", included: true },
    { name: "Priority customer support", included: false },
    { name: "Pitch deck library access", included: false }
  ],
  growth: [
    { name: "CRM records for up to 500 investors", included: true },
    { name: "Unlimited list creation", included: true },
    { name: "500 emails per month", included: true },
    { name: "500 CSV exports per month", included: true },
    { name: "Detailed investor database access", included: true },
    { name: "Advanced Filtering", included: true },
    { name: "Unlimited Email tracking", included: true },
    { name: "Priority customer support", included: false },
    { name: "Pitch deck library access", included: true }
  ],
  premium: [
    { name: "CRM records for up to 1000 investors", included: true },
    { name: "Unlimited list creation", included: true },
    { name: "1000 emails per month", included: true },
    { name: "1000 CSV exports per month", included: true },
    { name: "Detailed investor database access", included: true },
    { name: "Advanced Filtering", included: true },
    { name: "Unlimited Email tracking", included: true },
    { name: "Priority customer support", included: true },
    { name: "Pitch deck library access", included: true }
  ]
};

tr.landing.detailedPricing = {
  title: "Özellikler",
  starter: "Starter",
  growth: "Growth",
  premium: "Premium",
  unlimited: "Sınırsız",
  db: {
    category: "Yatırımcı Veritabanı",
    f1Name: "110,000+ Yatırımcı", f1Sub: "Angel, VC ve Kurumsallara Erişim",
    f2Name: "Email Bilgileri", f2Sub: "Tüm e-postalara tam erişim",
    f3Name: "Sınırsız Arama", f3Sub: "Maksimum arama limiti yok",
    f4Name: "Veri Dışa Aktarma", f4Sub: "Aylık CSV veya XLSX aktarımı",
    f5Name: "Detaylı Filtreleme", f5Sub: "Sektör, meblağ veya lokasyona göre",
    f6Name: "Hesap Telefonları", f6Sub: "İletişim numarasına sahip yatırımcılar",
    f7Name: "Startup Şablonları", f7Sub: "Kişiselleştirilebilir dökümanlar",
    f8Name: "Toplu Seçim", f8Sub: "Birden fazla yatırımcıyı listeye ekleme", f8V1: "25 kerede", f8V2: "75 kerede",
    f9Name: "Öncelikli Destek", f9Sub: "Kişiselleştirilmiş birebir danışmanlık"
  },
  email: {
    category: "Email Gönderim Paneli",
    f1Name: "Email Takip Geçmişi", f1Sub: "Tüm etkileşimleri tek ekranda görebilme",
    f2Name: "Toplu Mail Atma", f2Sub: "Aynı anda kişiselleştirilmiş mail imkanı",
    f3Name: "Okunma / Tıklama", f3Sub: "Detaylı teslimat metrikleri",
    f4Name: "Kendi Domaininden Gönderim", f4Sub: "Farklı e-posta entegrasyon desteği"
  },
  crm: {
    category: "Girişimci CRM Panosu",
    f1Name: "Listenizdeki Yatırımcılar", f1Sub: "Her aşamaya eklenebilecek max yatırımcı",
    f2Name: "Satış Hattı", f2Sub: "CRM içerisinde oluşturulabilen özelleştirilmiş kategori dizilimi"
  }
};

en.landing.detailedPricing = {
  title: "Features",
  starter: "Starter",
  growth: "Growth",
  premium: "Premium",
  unlimited: "Unlimited",
  db: {
    category: "Investor Database",
    f1Name: "110,000+ Investors", f1Sub: "Access to Angels, VCs, and Corporates",
    f2Name: "Email Information", f2Sub: "Full access to investor emails",
    f3Name: "Unlimited Search", f3Sub: "No maximum search limits",
    f4Name: "Data Export", f4Sub: "Monthly CSV or XLSX exports",
    f5Name: "Detailed Filtering", f5Sub: "Search by industry, amount or location",
    f6Name: "Direct Phone Numbers", f6Sub: "Investors with direct contact numbers",
    f7Name: "Startup Templates", f7Sub: "Customizable documents and templates",
    f8Name: "Bulk Selection", f8Sub: "Add multiple investors to lists instantly", f8V1: "25 at once", f8V2: "75 at once",
    f9Name: "Priority Support", f9Sub: "Personalized 1-on-1 consultation"
  },
  email: {
    category: "Email Dispatch Panel",
    f1Name: "Email Tracking History", f1Sub: "View all interactions on one screen",
    f2Name: "Bulk Email Sending", f2Sub: "Personalized mass email capabilities",
    f3Name: "Open / Click Analysis", f3Sub: "Detailed delivery metrics",
    f4Name: "Custom Domain Sending", f4Sub: "Support for custom email address integrations"
  },
  crm: {
    category: "Founder CRM Dashboard",
    f1Name: "Investors in Your List", f1Sub: "Max investors addable to stages",
    f2Name: "Pipeline Stages", f2Sub: "Customizable category pipelines within CRM"
  }
};

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
