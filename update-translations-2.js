const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'i18n', 'messages', 'tr.json');
const enPath = path.join(__dirname, 'i18n', 'messages', 'en.json');

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

tr.landing = {
  ...tr.landing,
  heroCards: {
    matchAnalysis: "Eşleşme Analizi",
    highMatch: "Yüksek Uyum",
    activeInvestors: "Aktif Yatırımcı",
    stageMatch: "Aşama Eşleşmesi",
    seriesA: "Series A Portföyü",
    outreachAi: "Pitch Hazır"
  },
  howItWorks: {
    title: "Investr girişiminizin potansiyelini nasıl ortaya çıkarır?",
    subtitle: "Investr; ağınızı genişletmenize, fon aramak için harcadığınız zamandan tasarruf etmenize ve girişiminiz için o mükemmel yatırımcıyı bulmanıza yardımcı olur.",
    step1Title: "Kapsamlı Yatırımcı Veritabanı",
    step1Desc: "Binlerce potansiyel melek yatırımcı ve girişim sermayesi fonunun bulunduğu geniş veritabanımıza erişin.",
    step2Title: "İletişim Bilgileri ve Profiller",
    step2Desc: "Yatırımcıların güncel iletişim bilgilerini, email adreslerini ve geçmiş yatırım profillerini tek tıklamayla görüntüleyin.",
    step3Title: "Detaylı Arama ve Filtreleme",
    step3Desc: "Girişiminizin aşamasına, sektörüne ve aradığınız yatırım miktarına göre size en uygun yatırımcıları filtreleyin.",
    step4Title: "Çeşitli Yatırımcı Profilleri",
    step4Desc: "Platformumuz endüstrinizdeki en doğru bağlantıları bulmanız için her sektörden farklı yatırımcıları barındırır.",
    step5Title: "Yatırım Sürecinizi Takip Edin",
    step5Desc: "Entegre CRM sistemimiz ile yatırımcılarla olan etkileşimlerinizi tek bir yerden, kolayca yönetin.",
    step6Title: "Sürekli Güncel Veri",
    step6Desc: "Verilerimizin her zaman taze kalması için finansal ve insan kaynaklarımızı veritabanımızı güncellemeye adıyoruz."
  },
  preview: {
    foundersTitle: "Girişimciler için",
    foundersDesc: "Ağınızı genişletin ve binlerce yatırımcıdan oluşan veritabanımızla fon aramak için harcadığınız yüzlerce saatten tasarruf edin.",
    businessesTitle: "İşletme Sahipleri için",
    businessesDesc: "Investr, işinizi geliştirmek için ihtiyaç duyduğunuz destek ve ivmeyi sağlamak için sizi doğru yatırımcılarla buluşturur.",
    findRightTitle: "Hayalinizi finanse edecek doğru yatırımcıyı bulun",
    findRightDesc: "Investr, yanlış yatırımcıları manuel olarak aramak zorunda kalmamanız için lokasyonlara, yatırım aşamalarına ve yatırımcı türlerine göre kategorize edilmiş binlerce yatırımcı içerir.",
    feature1: "Sektör eşleşmesi",
    feature2: "Aşama eşleşmesi",
    feature3: "Bölge eşleşmesi"
  }
};

en.landing = {
  ...en.landing,
  heroCards: {
    matchAnalysis: "Match Analysis",
    highMatch: "High Match",
    activeInvestors: "Active Investors",
    stageMatch: "Stage Matching",
    seriesA: "Series A Portfolio",
    outreachAi: "Pitch Ready"
  },
  howItWorks: {
    title: "How does Investr unlock your startup's potential?",
    subtitle: "Investr helps you expand your network, save time spent searching for funding, and find that perfect investor for your startup.",
    step1Title: "Comprehensive Investor Database",
    step1Desc: "Access our vast database containing thousands of potential angel investors and venture capital funds.",
    step2Title: "Contact Info and Profiles",
    step2Desc: "View investors' up-to-date contact info, email addresses, and past investment profiles with a single click.",
    step3Title: "Detailed Search and Filtering",
    step3Desc: "Filter the most suitable investors for you based on your startup's stage, industry, and the investment amount you seek.",
    step4Title: "Diverse Investor Profiles",
    step4Desc: "Our platform hosts different investors from every sector to help you find the right connections in your industry.",
    step5Title: "Track Your Investment Process",
    step5Desc: "Easily manage your interactions with investors from a single place using our integrated CRM system.",
    step6Title: "Always Up-to-Date Data",
    step6Desc: "We dedicate our financial and human resources to updating our database so our data always stays fresh."
  },
  preview: {
    foundersTitle: "For Entrepreneurs",
    foundersDesc: "Expand your network and save hundreds of hours spent looking for funding with our database of thousands of investors.",
    businessesTitle: "For Business Owners",
    businessesDesc: "Investr connects you with the right investors to provide the support and momentum you need to grow your business.",
    findRightTitle: "Find the right investor to fund your dream",
    findRightDesc: "Investr features thousands of investors categorized by locations, investment stages, and investor types so you don't have to manually search for the wrong investors.",
    feature1: "Industry matching",
    feature2: "Stage matching",
    feature3: "Region matching"
  }
};

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Translations successfully appended.");
