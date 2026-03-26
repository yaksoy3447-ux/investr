const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update detailedPricing table
if (tr.landing && tr.landing.detailedPricing && tr.landing.detailedPricing.db) {
    tr.landing.detailedPricing.db.f9Name = "Öncelikli Canlı Destek (Live Chat)";
    tr.landing.detailedPricing.db.f9Sub = "Uygulama içi destek ekibiyle anında mesajlaşma";
}

if (en.landing && en.landing.detailedPricing && en.landing.detailedPricing.db) {
    en.landing.detailedPricing.db.f9Name = "Priority Live Support (Chat)";
    en.landing.detailedPricing.db.f9Sub = "Instant messaging with our in-app support team";
}

// Update Pricing cards feature list (rows[8])
if (tr.landing && tr.landing.pricingTable && tr.landing.pricingTable.rows) {
    tr.landing.pricingTable.rows[8].name = "Öncelikli Canlı Destek (Live Chat)";
    tr.landing.pricingTable.rows[8].description = "Destek ekibiyle anında özel sohbet baloncuğu";
}

if (en.landing && en.landing.pricingTable && en.landing.pricingTable.rows) {
    en.landing.pricingTable.rows[8].name = "Priority Live Support (Chat)";
    en.landing.pricingTable.rows[8].description = "Dedicated live chat widget directly inside your dashboard";
}

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated live support translations!");
