const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Fix "Suni Zeka" to "Yapay Zeka"
if (tr.landing && tr.landing.heroCards) {
    tr.landing.heroCards.outreachLabel = "Yapay Zeka (AI)";
}

// Add blog links to header
if (tr.landing && tr.landing.header) {
    tr.landing.header.blog = "Yayınlar";
}
if (en.landing && en.landing.header) {
    en.landing.header.blog = "Insights";
}

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Fixed old Turkish AI terms and injected blog headers gracefully.");
