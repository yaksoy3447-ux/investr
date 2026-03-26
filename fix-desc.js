const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

tr.landing.detailedPricing.db.f4Sub = "Aylık gönderilebilecek maksimum doğrudan mesaj sayısı";
en.landing.detailedPricing.db.f4Sub = "Maximum number of allowed direct messages per month";

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated messaging quota descriptions.");
