const fs = require('fs');
const enPath = 'i18n/messages/en.json';

let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

if (en.nav) {
    en.nav.collapse = "Collapse";
}

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Added collapse translation to EN");
