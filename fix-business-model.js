const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update pricing rows (index 1 is currently "Email & LinkedIn Bilgileri")
tr.landing.pricingTable.rows[1].name = "Sistem İçi Güvenli Görüşme";
tr.landing.pricingTable.rows[1].description = "Yatırımcıya özel mesaj isteği atın (E-posta gizli kalır)";

en.landing.pricingTable.rows[1].name = "Secure In-App Messaging";
en.landing.pricingTable.rows[1].description = "Send private pitch messages (Direct emails hidden)";

// Update detailedPricing (f2Name was Email Bilgileri)
tr.landing.detailedPricing.db.f2Name = "Sistem İçi Güvenli Mesajlaşma";
tr.landing.detailedPricing.db.f2Sub = "İletişim kopmadan platform üzerinden doğrudan görüşme";

en.landing.detailedPricing.db.f2Name = "Secure In-App Messaging";
en.landing.detailedPricing.db.f2Sub = "Talk directly via the platform without exposing contact details";

// Wait, detailedPricing.email section has "LinkedIn & Profil Entegrasyonu"
tr.landing.detailedPricing.email.f2Name = "Kapalı Kutu Yatırımcı İletişimi";
tr.landing.detailedPricing.email.f2Sub = "Yatırımcı izni olmadan kişisel verilerin korunması";

en.landing.detailedPricing.email.f2Name = "Closed-Box Investor Reach";
en.landing.detailedPricing.email.f2Sub = "Invest personal data strictly protected until authorized";

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Business logic strictly adapted to internal messaging model.");
