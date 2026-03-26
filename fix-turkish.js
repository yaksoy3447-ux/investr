const fs = require('fs');
const trPath = 'i18n/messages/tr.json';
let tr = fs.readFileSync(trPath, 'utf8');
tr = tr.replace('"yearlyBadge": "3 Ay Bedava"', '"yearlyBadge": "3 Ay Hediye"');
fs.writeFileSync(trPath, tr);
console.log('Fixed yearly badge');
