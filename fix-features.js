const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// 1. Update contact address to just 1 email
tr.pages.contactContent = "Bizimle iletişime geçmekten çekinmeyin! Herhangi bir sorunuz veya öneriniz için bize tek bir tıkla aşağıdaki adresten ulaşabilirsiniz:\n\nEmail: info@investr.ai\n\nEkibimiz sizlere en kısa sürede dönüş yapacaktır.";
en.pages.contactContent = "Do not hesitate to reach out! For any questions or suggestions, please contact us through the following address:\n\nEmail: info@investr.ai\n\nOur team will get back to you immediately.";

// 2. Adjust features to EXACTLY reflect Investr
// Investr features: AI Matchmaking, Email Access, LinkedIn & Website Links, Unlimited Search, Data Export (CRM), AI Email Generation, CRM Pipelines.
tr.landing.pricingTable = {
  "title": "Tüm Özellikleri Karşılaştırın",
  "subtitle": "Kapsamlı özellik listesi sayesinde hangi planın size uygun olduğunu kolayca belirleyin.",
  "categories": {
    "database": "YATIRIMCI VERİTABANI",
    "outreach": "YAPAY ZEKA (Aİ) & OUTREACH",
    "crm": "KURUCU CRM PANOSU"
  },
  "rows": [
    {
      "name": "Aktif Yatırımcı Erişimi",
      "description": "Melek yatırımcı, VC ve Kurumsal firmalar",
      "starter": "✔",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Email & LinkedIn Bilgileri",
      "description": "Doğrulanmış yatırımcı iletişim bilgileri",
      "starter": "✔",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Detaylı Sektör & Tutar Filtreleme",
      "description": "Portföy uyumu ve bütçeye göre listeleme",
      "starter": "✔",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Yapay Zeka (AI) Pitch Oluşturucu",
      "description": "İş modelinize özel AI ile email yazımı",
      "starter": "Yok",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Toplu Hedefleme (Bulk Add)",
      "description": "Yatırımcıları CRM listelerine tek seferde ekleme",
      "starter": "Yok",
      "growth": "25 yatırımcı",
      "premium": "75 yatırımcı"
    },
    {
      "name": "Direkt Email Gönderimi",
      "description": "Uygulama dışına çıkmadan mail yollama",
      "starter": "✔",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Özelleştirilebilir Pipeline Aşamaları",
      "description": "Sürükle-bırak Kanban panosu",
      "starter": "Sınırsız",
      "growth": "Sınırsız",
      "premium": "Sınırsız"
    },
    {
      "name": "Aylık CRM Limitleri",
      "description": "CRM'e eklenebilecek maksimum yatırımcı",
      "starter": "100",
      "growth": "500",
      "premium": "1000"
    },
    {
      "name": "Öncelikli Birebir Destek",
      "description": "Uzman danışmanlarımızdan öncelikli yardım",
      "starter": "Yok",
      "growth": "Yok",
      "premium": "✔"
    }
  ]
};

en.landing.pricingTable = {
  "title": "Compare All Features",
  "subtitle": "Discover everything included in our plans to find the best fit for your startup.",
  "categories": {
    "database": "INVESTOR DATABASE",
    "outreach": "AI & OUTREACH",
    "crm": "FOUNDER CRM DASHBOARD"
  },
  "rows": [
    {
      "name": "Active Investor Access",
      "description": "Angels, VCs, and Corporate funds",
      "starter": "✔",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Email & LinkedIn Details",
      "description": "Verified investor contact information",
      "starter": "✔",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Deep Industry Filtering",
      "description": "Search by stage, portfolio match, and ticket size",
      "starter": "✔",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "AI Pitch Deck Generator",
      "description": "Craft tailored investor outreach emails using AI",
      "starter": "None",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Bulk CRM Assigning",
      "description": "Add multiple filtered investors to your lists instantly",
      "starter": "None",
      "growth": "25 at once",
      "premium": "75 at once"
    },
    {
      "name": "Direct Platform Emailing",
      "description": "Send tracked emails directly within the dashboard",
      "starter": "✔",
      "growth": "✔",
      "premium": "✔"
    },
    {
      "name": "Customizable Pipeline Stages",
      "description": "Drag-and-drop interactive Kanban boards",
      "starter": "Unlimited",
      "growth": "Unlimited",
      "premium": "Unlimited"
    },
    {
      "name": "Monthly CRM Extraction Limits",
      "description": "Maximum investors storable in pipelines",
      "starter": "100",
      "growth": "500",
      "premium": "1000"
    },
    {
      "name": "Priority 1-on-1 Support",
      "description": "Direct consultations with our expert team",
      "starter": "None",
      "growth": "None",
      "premium": "✔"
    }
  ]
};

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Features precisely mapped to Investr real functions!");
