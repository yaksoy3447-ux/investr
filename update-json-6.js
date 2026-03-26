const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

tr.landing.testimonials.badge = "BAŞARI HİKAYELERİ";
en.landing.testimonials.badge = "SUCCESS STORIES";

tr.landing.testimonials.stories = [
  { text: "Investr sayesinde aylarca süren yatırım arayışımız sadece birkaç haftaya indi. Hız inanılmazdı.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop", name: "Ceren Yılmaz", role: "Kurucu Ortak, Sağlık Teknolojileri" },
  { text: "Yatırımcı bulduğum günden beri vizyonumu daha da büyütmeme yardımcı oldular. Buradan ulaştığım yatırımcılar çok değerli.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop", name: "Ahmet Doğan", role: "CEO, FinTech Start" },
  { text: "Melek yatırım ağlarına tek tek mail atmak yerine, doğru filtrelerle nokta atışı yaptık.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop", name: "Selin Karahan", role: "Cofounder" },
  { text: "Buradaki veritabanı harika. Series A öncesi ihtiyacımız olan nakiti tam zamanında, doğru kişiden bulduk.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop", name: "Onur Tekin", role: "CEO & Kurucu" },
  { text: "Platform, yatırım sürecindeki verimsizliği tamamen ortadan kaldırıyor. Zaman tasarrufu paha biçilemez.", image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=100&auto=format&fit=crop", name: "Ayşe Çelik", role: "Proje Yöneticisi" },
  { text: "Sadece veritabanı değil, CRM yapısıyla kiminle hangi aşamada olduğumuzu inanılmaz netleştirdi.", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=100&auto=format&fit=crop", name: "Merve Demir", role: "Yatırım Operasyonları" },
  { text: "Eskiden Excel üzerinde takip ederdik her şeyi. Şimdi sadece 'Sürükle bırak'.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop", name: "Caner Arslan", role: "Kurucu" },
  { text: "Müşteri panosu ve yatırımcı havuzu tam olarak Startupların dertlerine reçete gibi verilmiş.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", name: "Deniz Şahin", role: "Pazarlama Direktörü" },
  { text: "Uluslararası yatırımcıları kendi ülkemizden buralarda bulabılmek en büyük avantajımız oldu.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", name: "Emre Can", role: "Kurucu Ortak" }
];

en.landing.testimonials.stories = [
  { text: "Thanks to Investr, our months-long search for investment was reduced to just a few weeks. The speed was incredible.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop", name: "Ceren Yilmaz", role: "Co-Founder, HealthTech" },
  { text: "Since finding investors here, they helped me expand my vision even further. The connections made are highly valuable.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100&auto=format&fit=crop", name: "Ahmet Dogan", role: "CEO, FinTech Start" },
  { text: "Instead of emailing angel investor networks one by one, we made precise hits using their advanced filters.", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop", name: "Selin Karahan", role: "Cofounder" },
  { text: "The database here is fantastic. We found the crucial pre-Series A capital we needed from exactly the right person.", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop", name: "Onur Tekin", role: "CEO & Founder" },
  { text: "The platform completely eliminates the inefficiencies of the investment process. The time saved is priceless.", image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?q=80&w=100&auto=format&fit=crop", name: "Ayse Celik", role: "Project Manager" },
  { text: "It's not just a database; the CRM structure made it incredibly clear who we were engaged with at each stage.", image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=100&auto=format&fit=crop", name: "Merve Demir", role: "Investment Operations" },
  { text: "We used to track everything on spreadsheets. Now everything is literally just 'Drag and Drop'.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop", name: "Caner Arslan", role: "Founder" },
  { text: "The client dashboard and investor pool seem perfectly tailored as a prescription for startup headaches.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", name: "Deniz Sahin", role: "Marketing Director" },
  { text: "Being able to find international investors right from our home country was our biggest advantage.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", name: "Emre Can", role: "Co-Founder" }
];

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Translations updated!");
