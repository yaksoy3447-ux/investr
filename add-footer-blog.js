const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

if (tr.landing && tr.landing.footer && tr.landing.footer.links) {
    tr.landing.footer.links.company4 = "Yayınlar";
}
if (en.landing && en.landing.footer && en.landing.footer.links) {
    en.landing.footer.links.company4 = "Publications";
}

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Added Blog link to footer dictionary");
