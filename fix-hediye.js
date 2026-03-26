const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
let tr = fs.readFileSync(trPath, 'utf8');

tr = tr.replace('Yıllık planlardaki 3 ay ücretsiz avantajı nasıl işliyor?', 'Yıllık planlardaki 3 ay hediye avantajı nasıl işliyor?');
tr = tr.replace('Gizli ücret yok, sürpriz yok. Yıllık ödemelerde 3 ay bizden hediye.', 'Gizli ücret yok, sürpriz yok. Yıllık ödemelerde 3 ay bizden hediye.');

fs.writeFileSync(trPath, tr);
console.log('Fixed hediye terminology');
