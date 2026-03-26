const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

tr.landing.preview.mainTitle = "Investr'ın size sunabilecekleri";
tr.landing.preview.feature1Desc = "İşletmenizle veya vizyonunuzla eşleşen yatırımcılar";
tr.landing.preview.feature2Desc = "Girişiminizin aşamasını doğru yatırımcı profiliyle eşleştirin";
tr.landing.preview.feature3Desc = "Ülkenizde ve bölgenizde sizin için aktif yatırım arayanları bulun";

en.landing.preview.mainTitle = "What Investr can offer you";
en.landing.preview.feature1Desc = "Investors whose vision matches your business";
en.landing.preview.feature2Desc = "Match your startup stage with the right investor profile";
en.landing.preview.feature3Desc = "Find active investors looking for opportunities in your region";

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Done");
