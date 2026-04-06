const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'i18n', 'messages', 'tr.json');
const enPath = path.join(__dirname, 'i18n', 'messages', 'en.json');

const trData = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Initialize or update landing objects
if(!trData.landing) trData.landing = {};
if(!enData.landing) enData.landing = {};

// Hero
trData.landing.heroBadge = "💎 YENİ NESİL YATIRIMCI VERİTABANI";
trData.landing.heroH1_1 = "Sermaye Avında";
trData.landing.heroH1_2 = "Kuralları Yazan";
trData.landing.heroH1_3 = "Girişimci Ol.";
trData.landing.heroSubtitle = "Sıradan, güncel olmayan veritabanlarını unutun. 110.000'den fazla onaylı melek yatırımcı ve VC fonunun doğrudan e-postalarına tek tıkla ulaşın. Fon toplama sürecini aylar değil, günlere sığdırın.";
trData.landing.heroBtn1 = "Veritabanını İncele";
trData.landing.heroBtn2 = "Nasıl Çalışır?";

enData.landing.heroBadge = "💎 NEXT-GEN INVESTOR INTELLIGENCE";
enData.landing.heroH1_1 = "Rewrite the Rules of";
enData.landing.heroH1_2 = "Raising Capital";
enData.landing.heroH1_3 = "for Your Startup.";
enData.landing.heroSubtitle = "Forget outdated and restricted spreadsheets. Instantly access the verified direct emails of 110,000+ top-tier Angel Investors and VCs. Compress your fundraising timeline from months into days.";
enData.landing.heroBtn1 = "Explore Database";
enData.landing.heroBtn2 = "How it Works";

// SocialProof / Testimonials
trData.landing.testimonials = {
  title: "Girişimciler Ne Diyor?",
  subtitle: "Sıradan e-postaları bırakıp GetInvestr'ın doğrulanmış verileriyle yatırım turlarını rekor sürede kapatan kuruculara katılın.",
  r1Text: "LinkedIn'de mail aramakla haftalar kaybediyorduk. 2 günde 150 melek yatırımcıya ulaştık. Tohum turumuzu 3 haftada kapattık.",
  r1Author: "Ahmet Karataş",
  r1Role: "Kurucu & CEO, FinFlow",
  r2Text: "Farkı e-posta doğruluk oranında yatıyor. Filtreleyip indirdiğimiz CSV listesine mail attığımızda bounce oranı sıfıra yakındı.",
  r2Author: "Sarah Jenkins",
  r2Role: "Kurucu Ortak, Curi AI",
  r3Text: "Veriler inanılmaz güncel. Avrupa'daki SaaS yatırımcılarını saniyeler içinde filtreleyip seri a turumuzu başarıyla tamamladık.",
  r3Author: "Caner Yılmaz",
  r3Role: "VP of Growth, SaaSify"
};

enData.landing.testimonials = {
  title: "What Founders Are Saying",
  subtitle: "Join visionary founders who stopped wasting time with dead-end emails and closed their rounds in record time.",
  r1Text: "We used to lose weeks scraping LinkedIn. We reached 150 relevant angel investors in 2 days and closed our Seed round in 3 weeks.",
  r1Author: "Ahmet Karatas",
  r1Role: "Founder & CEO, FinFlow",
  r2Text: "The standout feature is the email accuracy rate. We exported our filtered list and had an incredibly low bounce rate.",
  r2Author: "Sarah Jenkins",
  r2Role: "Co-Founder, Curi AI",
  r3Text: "The data here is incredibly fresh. We filtered for European SaaS focused VCs and closed our Series A seamlessly.",
  r3Author: "John Miller",
  r3Role: "Head of Growth, SaaSify"
};

// How It Works
trData.landing.howItWorks = {
  badge: "SİSTEMATİK BAŞARI",
  title: "Sermayeye Nasıl Ulaşırsınız?",
  subtitle: "Aylarca süren yatırımcı avını, akıllı verilerle dakikalara indiren kusursuz bir iş akışı.",
  step1Title: "Kusursuz Filtreleme",
  step1Desc: "110.000 profil arasından sadece sizin sektörünüze ve aşamanıza yatırım yapanları ayıklayın.",
  step2Title: "Anında Doğrulama",
  step2Desc: "Korunan iletişim bilgilerini ve karar vericilerin e-postalarını anında elde edin.",
  step3Title: "Export ve İletişim",
  step3Desc: "Özel listenizi CSV olarak indirin ve doğrudan mail atarak sıcak teması başlatın."
};

enData.landing.howItWorks = {
  badge: "SYSTEMATIC SUCCESS",
  title: "How You Find Capital",
  subtitle: "A powerful workflow that condenses months of hunting for capital into just a few minutes of smart extraction.",
  step1Title: "Flawless Filtering",
  step1Desc: "Filter through 110,000+ profiles to find investors exactly matching your industry and stage.",
  step2Title: "Instant Verification",
  step2Desc: "Unlock heavily guarded contact details and decision-maker emails in seconds.",
  step3Title: "Export & Outreach",
  step3Desc: "Download your custom list as a CSV and immediately initiate your direct fundraising outreach."
};

// Preview
trData.landing.preview = {
  badge: "CANLI ÖNİZLEME",
  title: "Sıradan Arama Değil, Nokta Atışı Av.",
  subtitle: "GetInvestr'ın eşsiz motoru yatırımcıların profillerini analiz eder ve size ulaşılabilir olandır. Soğuk aramaları bitiriyoruz.",
  feature1Title: "Çoklu Keskin Filtreler",
  feature1Desc: "Sektör, Tur Aşaması, Lokasyon veya Çek Büyüklüğüne göre tam kontrol.",
  feature2Title: "Gerçek Zamanlı Veri",
  feature2Desc: "Listelerimiz veritabanımıza özel araçlarla sürekli olarak temizlenir.",
  feature3Title: "Doğrudan C-Level Ulaşım",
  feature3Desc: "Asistanları veya genel kutuları aşın. Karar vericinin ana e-postasına ulaşın."
};

enData.landing.preview = {
  badge: "LIVE PREVIEW",
  title: "Not Just Search. Precision Hunting.",
  subtitle: "GetInvestr's unique engine analyzes investors' past portfolios and provides you with the highest probability matches.",
  feature1Title: "Razor-Sharp Filters",
  feature1Desc: "Total control over Industry, Stage, Location, or traditional Check Size.",
  feature2Title: "Real-Time Data",
  feature2Desc: "Our datasets are dynamically cleansed and kept highly accurate.",
  feature3Title: "Direct C-Level Access",
  feature3Desc: "Bypass the gatekeepers. Reach the actual decision-maker's primary email."
};

// FAQ
trData.landing.faq = {
  title: "Genel Sıkça Sorulanlar (FAQ)",
  q1: "Verilerin doğruluğunu nasıl sağlıyorsunuz?",
  a1: "Yatırımcıların güncel durumlarını özel yazılımlarla sürekli tarıyor ve email bounce (sekme) oranlarını en aza indiriyoruz.",
  q2: "Kayıtları CSV olarak dışa aktarabilir miyim (Export)?",
  a2: "Evet. Paketinizin indirme kotasına göre filtrelediğiniz hedef yatırımcı havuzunuzu anında Excel'e çekebilirsiniz.",
  q3: "Ödeme sonrası sistem anında açılır mı?",
  a3: "Kesinlikle. Stripe tarafından kredi kartınız doğrulandığı andan itibaren tüm kısıtlamalar kaldırılır.",
  q4: "Kredi/kota limitleri var mıdır?",
  a4: "Aşırı yüklenmeyi (scraping) engellemek adına paketlerin aylık 2000 vb. dışa aktarma (export) güvenlik kotaları bulunmaktadır.",
  q5: "İptal ve iade politikası (Refund) nasıl işler?",
  a5: "Kullanım Şartlarında net belirttiğimiz gibi, dijital olarak anlık veritabanı kopyalaması sağladığımız için hiçbir koşulda para iadesi (refund) yapılmaz."
};

enData.landing.faq = {
  title: "Frequently Asked Questions",
  q1: "How do you ensure data accuracy?",
  a1: "We continuously scan investors' actual status with custom software to absolutely minimize email bounce rates.",
  q2: "Can I export records to CSV?",
  a2: "Yes. Depending on the quota of your current tier, you can instantly export targeted lead pools to CSV or Excel.",
  q3: "Do I get immediate access after payment?",
  a3: "Absolutely. The nanosecond your credit card is verified via Stripe, all database locks are automatically removed.",
  q4: "Are there credit or quota limits?",
  a4: "Yes, to prevent mass bot scraping, there are monthly export safety limits (e.g., 2000 leads) based on your package.",
  q5: "How does the cancellation and refund policy work?",
  a5: "As clearly stated in our Terms, we provide immediate digital database access, therefore under no circumstances do we offer refunds."
};

fs.writeFileSync(trPath, JSON.stringify(trData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
console.log('Finished injecting landing texts ONLY. Pricing is preserved!');
