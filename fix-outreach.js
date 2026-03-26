const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Dışa Ulaşım (Outreach) Otomasyonu -> AI ile İç Ulaşım Mektubu / Pitch Gönderme
tr.landing.detailedPricing.email.f1Name = "Akıllı (AI) Mesaj Otomasyonu";
tr.landing.detailedPricing.email.f1Sub = "AI yardımıyla CRM listenizdeki yatırımcılara otomatik pitch (sunum) mesajı atma";

en.landing.detailedPricing.email.f1Name = "Smart AI Pitch Automation";
en.landing.detailedPricing.email.f1Sub = "Automatically send AI-generated pitch messages to targeted CRM investors";

// Check if Direct Platform Emailing exists in rows and patch its wording too
if (tr.landing && tr.landing.pricingTable && tr.landing.pricingTable.rows) {
    tr.landing.pricingTable.rows[5].name = "Sistem İçi Yapay Zeka (AI) Mesaj Atma";
    tr.landing.pricingTable.rows[5].description = "Uygulama dışına çıkmadan yatırımcılara otomatik pitch yollama";
}

if (en.landing && en.landing.pricingTable && en.landing.pricingTable.rows) {
    en.landing.pricingTable.rows[5].name = "Direct Platform AI Pitching";
    en.landing.pricingTable.rows[5].description = "Send tracked AI pitch messages directly within the dashboard";
}

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated Outreach Automation to align securely with In-App Smart Pitch Messaging.");
