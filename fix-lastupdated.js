const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

if (tr.landing && tr.landing.blog) {
    tr.landing.blog.lastUpdated = "Son güncelleme:";
}
if (en.landing && en.landing.blog) {
    en.landing.blog.lastUpdated = "Last updated:";
}

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Added lastUpdated translation keys.");
