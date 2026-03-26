const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update CSV export to Messaging Limit in detailedPricing
tr.landing.detailedPricing.db.f4Name = "Sistem İçi Aylık Mesaj Kredisi";
tr.landing.detailedPricing.db.f4Sub = "Aylık bağlantı kurulabilen maksimum yatırımcı sayısı";

en.landing.detailedPricing.db.f4Name = "Monthly Direct Messaging Limit";
en.landing.detailedPricing.db.f4Sub = "Maximum secure connection requests per month";

// Update also in landing.pricingTable.rows since I changed that earlier
tr.landing.pricingTable.rows[7].name = "Aylık Mesajlaşma Kotası";
tr.landing.pricingTable.rows[7].description = "Tüm seviyeler için aylık sistem içi iletişim adedi";

en.landing.pricingTable.rows[7].name = "Monthly Messaging Quota";
en.landing.pricingTable.rows[7].description = "Maximum strictly in-platform outbox reaches monthly";

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated CSV data export to Monthly Messaging Limit safely enforcing retention.");
