const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'i18n', 'messages', 'tr.json');
const enPath = path.join(__dirname, 'i18n', 'messages', 'en.json');

const trData = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

trData.pages.termsContent += `

6. YASAL HAKLAR VE YAPTIRIMLAR (LEGAL ENFORCEMENT)
GetInvestr, platformunun, veritabanının ve kullanıcılarının güvenliğini en üst düzeyde korur. Verilerimizi yasa dışı kopyalamak, sistemlerimize siber saldırıda bulunmak (DDoS vb.), verilerimizi kendi adınıza ticari bir ürün olarak satmak veya platformumuzu maddi/manevi zarara uğratacak herhangi bir ihlalde bulunmak durumunda; GetInvestr olarak yalnızca hesabınızı kalıcı olarak kapatmakla kalmayacağımızı, aynı zamanda doğacak siber ve finansal zararların tazmini için uluslararası ve yerel mahkemelerde her türlü yasal (hukuki ve cezai) hakkımızı sonuna kadar arayacağımızı ve bu tür art niyetli faaliyetlere karşı "SIFIR TOLERANS" göstereceğimizi kesin ve net bir dille beyan ederiz.`;

enData.pages.termsContent += `

6. LEGAL RIGHTS AND ENFORCEMENT
GetInvestr maintains the highest level of security for its platform, database, and users. In the event of illegal extraction or copying of our data, launching cyber attacks against our systems (e.g., DDoS), reselling our proprietary data as your own commercial product, or any violation that causes financial or reputational harm to our platform; GetInvestr explicitly declares that we will not only terminate your account permanently, but also aggressively pursue our legal rights (both civil and criminal) to the fullest extent permitted by law in international and local courts. We maintain a strict "ZERO TOLERANCE" policy against such malicious and illegal activities.`;

fs.writeFileSync(trPath, JSON.stringify(trData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
console.log('Legal enforcement clause added!');
