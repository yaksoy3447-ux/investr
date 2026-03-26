const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update FAQ region
tr.landing.faq.a2 = "Veritabanımız, portföy eşleşmesi alanında maksimum etkiyi yaratan Türkiye ekosistemindeki aktif yatırımcılara odaklanmıştır. Seçkin Melek Yatırımcılar (Angel), VC (Girişim Sermayesi) fonları ve ülkemizdeki kurumsal yatırım yapılarına doğrudan ulaşabilirsiniz.";

// Update Stripe policy payment strictly stripping Iyzico fallback
tr.landing.faq.a6 = "Kesinlikle. Ödeme altyapımız dünya standartlarındaki Stripe güvencesi altındadır ve kredi kartı bilgileriniz hiçbir şekilde sunucularımızda saklanmamaktadır.";
en.landing.faq.a6 = "Absolutely. Our payment infrastructure is strictly secured by globally recognized Stripe standards, and your raw credit card data is never processed or retained locally on our servers.";

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated FAQ regions and billing architectures effectively");
