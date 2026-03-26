const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));

if (tr.landing && tr.landing.pricingPage && tr.landing.pricingPage.tiers) {
    tr.landing.pricingPage.tiers.startup = "Başlangıç";
    tr.landing.pricingPage.tiers.pro = "Büyüme";
    tr.landing.pricingPage.tiers.enterprise = "Premium";
}

if (tr.landing && tr.landing.pricing && tr.landing.pricing.tiers) {
    tr.landing.pricing.tiers.startup = "Başlangıç";
    tr.landing.pricing.tiers.pro = "Büyüme";
    tr.landing.pricing.tiers.enterprise = "Premium";
}

if (tr.landing && tr.landing.detailedPricing) {
    tr.landing.detailedPricing.starter = "Başlangıç";
    tr.landing.detailedPricing.growth = "Büyüme";
    tr.landing.detailedPricing.premium = "Premium";
}

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
console.log("Tier names translated to Turkish.");
