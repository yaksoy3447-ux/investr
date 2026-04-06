const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'i18n', 'messages', 'tr.json');
const enPath = path.join(__dirname, 'i18n', 'messages', 'en.json');

const trData = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update TR Landing Translations
trData.landing = {
  ...trData.landing,
  heroBadge: "💎 YENİ NESİL YATIRIMCI VERİTABANI",
  heroH1_1: "Sermaye Avında",
  heroH1_2: "Kuralları Yazan",
  heroH1_3: "Girişimci Ol.",
  heroSubtitle: "Sıradan, güncel olmayan veritabanlarını unutun. 110.000'den fazla onaylı melek yatırımcı ve VC fonunun doğrudan e-postalarına tek tıkla ulaşın. Fon toplama sürecini aylar değil, günlere sığdırın.",
  heroBtn1: "Veritabanını İncele",
  heroBtn2: "Nasıl Çalışır?"
};

// Update EN Landing Translations
enData.landing = {
  ...enData.landing,
  heroBadge: "💎 NEXT-GEN INVESTOR INTELLIGENCE",
  heroH1_1: "Rewrite the Rules of",
  heroH1_2: "Raising Capital",
  heroH1_3: "for Your Startup.",
  heroSubtitle: "Forget outdated and restricted spreadsheets. Instantly access the verified direct emails of 110,000+ top-tier Angel Investors and VCs. Compress your fundraising timeline from months into days.",
  heroBtn1: "Explore Database",
  heroBtn2: "How it Works"
};

fs.writeFileSync(trPath, JSON.stringify(trData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Hero translation texts updated to premium startup style!');
