const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Detailed Pricing fixes (email.f4Name)
if (tr.landing && tr.landing.detailedPricing && tr.landing.detailedPricing.email) {
    tr.landing.detailedPricing.email.f4Name = "Yapay Zeka (AI) Portföy Uyumu";
    tr.landing.detailedPricing.email.f4Sub = "Girişiminiz ile yatırımcının potansiyel eşleşme skoru analizi";
}

if (en.landing && en.landing.detailedPricing && en.landing.detailedPricing.email) {
    en.landing.detailedPricing.email.f4Name = "AI Portfolio Match Scoring";
    en.landing.detailedPricing.email.f4Sub = "Smart compatibility assessment between your startup and investor thesis";
}

// Pricing Table rows checks
if (tr.landing && tr.landing.pricingTable && tr.landing.pricingTable.rows) {
    // Attempting to find and replace any Custom Domain wording in the main features lists
    tr.landing.pricingTable.rows.forEach(row => {
        if (row.name && row.name.includes("Domain")) {
            row.name = "Yapay Zeka (AI) Portföy Uyumu Skoru";
            row.description = "Size uygun yatırımcıyı otomatik tespit analizi";
        }
    });
}
if (en.landing && en.landing.pricingTable && en.landing.pricingTable.rows) {
    en.landing.pricingTable.rows.forEach(row => {
        if (row.name && row.name.toLowerCase().includes("domain")) {
            row.name = "AI Portfolio Match Scoring";
            row.description = "Automatic discovery of highly compatible investor mandates";
        }
    });
}


fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated domain feature to AI Matching successfully.");
