const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

tr.pages = {
  aboutTitle: "Hakkımızda",
  aboutContent: "Investr, girişimciler ile melek yatırımcılar, risk sermayeleri ve kurumsal yatırımcılar arasında köprü kurmayı hedefleyen yenilikçi bir finansal teknoloji platformudur.\n\nAmacımız, aylarca süren yatırım arayışı süreçlerini minimize ederek, doğru eşleşmeleri en hızlı ve en güvenilir yoldan sağlamaktır. Teknolojimizi tutkuyla geliştiriyor, girişim ekosistemini güçlendirmeye devam ediyoruz.",
  contactTitle: "İletişim",
  contactContent: "Bizimle iletişime geçmekten çekinmeyin! Herhangi bir sorunuz veya öneriniz için aşağıdaki kanallar üzerinden bize ulaşabilirsiniz:\n\nE-posta: iletisim@investr.ai\nTelefon: +90 (212) 555 55 55\n\nMüşteri hizmetleri ekibimiz sizlere en kısa sürede dönüş yapacaktır.",
  careersTitle: "Kariyer",
  careersContent: "Açık bir kariyer vizyonu ve inovasyon tutkusuyla çalışıyoruz.\n\nŞu anda aktif bir açık pozisyonumuz bulunmamaktadır. Ancak ekibimize dahil olmak veya gelecekteki fırsatlar için değerlendirilmek isterseniz özgeçmişinizi kariyer@investr.ai adresine gönderebilirsiniz. Sizi tanımaktan mutluluk duyarız!",
  termsTitle: "Kullanım Koşulları",
  termsContent: "Bu platformu kullanarak, Investr'ın tüm kurallarını okumuş ve kabul etmiş sayılırsınız.\n\nSisteme kayıtlı kullanıcılarımız doğru bilgi verdiklerini taahhüt ederler. İçerik doğrulukları ve sağlanan materyaller kendi sorumluluğunuzdadır. Kullanım koşulları her zaman değiştirilebilir olup, güncel metin her daim bu sayfadan duyurulacaktır.",
  privacyTitle: "Gizlilik Sözleşmesi",
  privacyContent: "Gizliliğinize değer veriyoruz.\n\nKişisel verileriniz ve hesabınız yüksek güvenlik standartları altında şifrelenmektedir. Bilgileriniz 3. şahıslar veya izinsiz şirketlerle hiçbir şekilde paylaşılmaz.",
  cookieTitle: "Çerez Politikası",
  cookieContent: "Sitemizde daha iyi bir kullanıcı deneyimi sunmak amacıyla çerezler kullanılmaktadır.\n\nKullanılan çerezler genel site analizi, kişiselleştirme fonksiyonları ve güvenlik parametreleri hedeflenerek toplanmaktadır. Siteyi ziyaret etmeye devam etmeniz durumunda bu çerezleri onaylamış sayılırsınız."
};

en.pages = {
  aboutTitle: "About Us",
  aboutContent: "Investr is an innovative financial technology platform aiming to bridge the gap between startup founders, angel investors, venture capitalists, and corporate investors.\n\nOur objective is to dramatically minimize the months-long investment sourcing process, enabling the fastest and most secure direct matchmaking. We build our technology with passion, continuing to empower the startup ecosystem universally.",
  contactTitle: "Contact",
  contactContent: "Do not hesitate to reach out! For any questions or suggestions, please contact us through the following channels:\n\nEmail: contact@investr.ai\nPhone: +90 (212) 555 55 55\n\nOur customer operations team will get back to you immediately.",
  careersTitle: "Careers",
  careersContent: "We operate with a transparent career vision and a hunger for innovation.\n\nWe do not have any open positions at the moment. However, if you would like to join our vibrant team or be considered for future opportunities, please forward your resume to careers@investr.ai. We'd love to meet you!",
  termsTitle: "Terms of Service",
  termsContent: "By utilizing this platform, you acknowledge and agree to abide by all rulings of Investr.\n\nRegistered users commit to maintaining accurate information securely. Content validation and materials provided are your own responsibility. We reserve the full rights to alter our global terms at any moment here exclusively.",
  privacyTitle: "Privacy Policy",
  privacyContent: "We strictly value your online privacy.\n\nYour personal data and account identifiers are heavily encrypted under ultimate structural security protocols. Your information is never shared openly with unauthorized third-parties or external advertising domains.",
  cookieTitle: "Cookie Policy",
  cookieContent: "Cookies are persistently utilized on our platform to guarantee you an extensively better overall experience.\n\nEmbedded cookies are primarily geared towards global site diagnostic analytics, functionality personalization, and strict internal security criteria matching. By continuing to navigate across our portal, you formally accept these embedded rulesets."
};

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Static page content populated!");
