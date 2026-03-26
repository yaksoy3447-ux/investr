const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

tr.landing.faq.a3 = "Platformumuzun kapalı kutu güvenli iletişim altyapısı sayesinde, dış e-posta trafiğiyle vakit kaybetmezsiniz. Profilini beğendiğiniz yatırımcılara CRM panomuz üzerinden anında sisteme içi mesaj / pitch yollayabilir ve size dönüş sağladıklarında iletişim bilgisi paylaşımlarıyla sürece güvenle devam edebilirsiniz.";
en.landing.faq.a3 = "Thanks to our closed-box secure communication infrastructure, you do not waste time with external email traffic. You can instantly send an in-app message / pitch to investors from your CRM dashboard, and safely proceed exchanging full contact details once they respond positively.";

// Wait, let's also check if there is any mention of "Bütün yatırımcıların mailini tek seferde görebiliyor muyum" that I should fix.
// Actually all the other FAQs seem mostly general. I'll just change a3. 

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated FAQ a3 to reflect the new in-app messaging feature securely.");
