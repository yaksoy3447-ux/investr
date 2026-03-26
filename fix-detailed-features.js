const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Fix f6 and f7 features to reflect Investr correctly
tr.landing.detailedPricing.db.f6Name = "Yapay Zeka (AI) Pitch Oluşturucu";
tr.landing.detailedPricing.db.f6Sub = "İş modelinize özel AI ile email yazımı";
en.landing.detailedPricing.db.f6Name = "AI Pitch Deck Generator";
en.landing.detailedPricing.db.f6Sub = "Craft tailored investor outreach emails using AI";

tr.landing.detailedPricing.db.f7Name = "Aylık Pipeline Yönetimi";
tr.landing.detailedPricing.db.f7Sub = "Yatırım turu süreçlerini evrelere ayırma";
en.landing.detailedPricing.db.f7Name = "Monthly Pipeline Management";
en.landing.detailedPricing.db.f7Sub = "Structure investment rounds into mapped stages";

tr.landing.detailedPricing.email.f2Name = "LinkedIn & Profil Entegrasyonu";
tr.landing.detailedPricing.email.f2Sub = "Platform dışına çıkmadan yatırımcı profesyonel profillerine erişim";
en.landing.detailedPricing.email.f2Name = "LinkedIn & Profile Integration";
en.landing.detailedPricing.email.f2Sub = "Access investor professional profiles seamlessly";

tr.landing.detailedPricing.email.f1Name = "Outreach (Dışa Ulaşım) Otomasyonu";
tr.landing.detailedPricing.email.f1Sub = "AI yardımıyla doğrudan hedef listelere mail atma";
en.landing.detailedPricing.email.f1Name = "Outreach Automation";
en.landing.detailedPricing.email.f1Sub = "Direct mass-email targeting powered via integrated AI";

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated detailedPricing to reflect real Investr features!");
