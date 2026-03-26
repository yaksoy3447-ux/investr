const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update FAQ region
tr.landing.faq.a2 = "Veritabanımız tamamen Türkiye pazarındaki yatırımcılara odaklanmıştır. Ülkemizdeki aktif melek yatırımcılar, Venture Capital (Girişim Sermayesi) fonları ve kurumsal yatırımcıları sistemimizde bulabilir, ekosistemdeki yerel Türk yatırımcılarla güvenle doğrudan iletişim kurabilirsiniz.";
en.landing.faq.a2 = "Our database is entirely focused on investors active in the Turkish market. You can find leading local angel investors, Venture Capital (VC) funds, and corporate investors operating within Turkey, allowing you to establish direct connections within the domestic startup ecosystem securely.";

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Updated region focus exclusively to Turkey in the FAQ section");
