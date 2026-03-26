const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// 1. Fix Outreach AI Label (the hardcoded one I just parameterized)
if (tr.landing && tr.landing.heroCards) {
    tr.landing.heroCards.outreachLabel = "Suni Zeka (AI)"; 
    tr.landing.heroCards.seriesA = "Seri A Portföyü"; // Changed Series A to Seri A
}

if (en.landing && en.landing.heroCards) {
    en.landing.heroCards.outreachLabel = "Outreach AI";
    en.landing.heroCards.seriesA = "Series A Portfolio";
}

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated Hero cards translations properly to Turkish strict equivalents");
