const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'i18n', 'messages', 'tr.json');
const enPath = path.join(__dirname, 'i18n', 'messages', 'en.json');

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

tr.landing = {
  ...tr.landing,
  testimonialsTitle: "Investr Kullanan Kurucuların Yorumları",
  testimonialsSubtitle: "Investr ile hedefledikleri yatırım turlarını başarıyla kapatan girişimcilerin hikayelerine kulak verin.",
  footer: {
    ctaAlert: "Kayıt işlemini tamamlamak için bir plan seçin.",
    ctaAction: "Planları İncele",
    ctaHeading1: "Geleceğin Yatırım Ağında",
    ctaHeading2: "Yerinizi Alın",
    ctaDesc: "Investr'ın benzersiz yapay zeka ve CRM destekli ekosistemiyle girişiminizin ihtiyaç duyduğu finansmanı saniyeler içerisinde bulun.",
    ctaBtn1: "HEMEN BAŞLA",
    ctaBtn2: "Oturum Aç",
    desc: "Yeni nesil girişimciler ve melek yatırımcılar için tasarlanmış kapalı bağlantı ağı.",
    links: {
      platform: "Platform",
      platform1: "Nasıl Çalışır",
      platform2: "Yatırımcı Ağı",
      platform3: "Planlar",
      company: "Şirket",
      company1: "Hakkımızda",
      company2: "İletişim",
      company3: "Kariyer",
      legal: "Yasal",
      legal1: "Kullanım Koşulları",
      legal2: "Gizlilik Sözleşmesi",
      legal3: "Çerez Politikası"
    },
    rights: "Tüm hakları saklıdır."
  },
  pricingPage: {
    badge: "Kayıt işlemini tamamlamak için aşağıdaki planlardan birini seçin.",
    title1: "Dakikalar içinde en iyi yatırımcılarla bağlantı kurun ve",
    title2: "hemen bugün turunuzu tamamlayın.",
    subtitle: "Gizli ücret yok, sürpriz yok. Yıllık ödemelerde 3 ay bizden hediye.",
    monthly: "Aylık",
    yearly: "Yıllık",
    yearlyBadge: "3 Ay Bedava"
  }
};

en.landing = {
  ...en.landing,
  testimonialsTitle: "Feedback from Founders using Investr",
  testimonialsSubtitle: "Listen to the stories of entrepreneurs who successfully closed their target investment rounds with Investr.",
  footer: {
    ctaAlert: "Select a plan to complete your registration.",
    ctaAction: "View Plans",
    ctaHeading1: "Take your place in",
    ctaHeading2: "the Future Investment Network",
    ctaDesc: "Find the funding your startup needs in seconds with Investr's unique AI and CRM-supported ecosystem.",
    ctaBtn1: "GET STARTED",
    ctaBtn2: "Sign In",
    desc: "A closed network designed for next-generation entrepreneurs and angel investors.",
    links: {
      platform: "Platform",
      platform1: "How It Works",
      platform2: "Investor Network",
      platform3: "Plans",
      company: "Company",
      company1: "About Us",
      company2: "Contact",
      company3: "Careers",
      legal: "Legal",
      legal1: "Terms of Use",
      legal2: "Privacy Agreement",
      legal3: "Cookie Policy"
    },
    rights: "All rights reserved."
  },
  pricingPage: {
    badge: "Select one of the plans below to complete your registration.",
    title1: "Connect with the best investors in minutes and",
    title2: "close your round today.",
    subtitle: "No hidden fees, no surprises. Get 3 months free with yearly billing.",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyBadge: "3 Months Free"
  }
};

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Translations successfully appended.");
