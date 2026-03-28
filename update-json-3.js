const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Update Footer Built
tr.landing.footer.built = "Tutkuyla geliştirildi";
en.landing.footer.built = "Built with passion";

// Update FAQ Content (Relevant to a startup/investor database CRM)
tr.landing.faq = {
  title: "Sıkça Sorulan Sorular",
  description: "Investr hakkında en çok merak edilen soruları sizin için yanıtladık. Platformun yeteneklerinden güvenliğe kadar her detay aşağıda.",
  q1: "Investr tam olarak nedir ve kimler içindir?",
  a1: "Investr, girişimciler ve start-up kurucuları için özel olarak tasarlanmış kapsayıcı bir yatırımcı veritabanı ve CRM platformudur. Binlerce melek yatırımcı ve girişim sermayesi fonunun yer aldığı bu platformda, girişiminize en uygun yatırımcıları filtreleyebilir ve iletişim süreçlerinizi tek bir noktadan yönetebilirsiniz.",
  q2: "Veritabanınız ne sıklıkla güncellenmektedir?",
  a2: "Yatırımcı veritabanımız, iletişim bilgileri ve yatırım aşamaları (Seed, Series A vb.) göz önünde bulundurularak sürekli otomatik taramalar ve ekibimizin manuel doğrulamaları ile haftalık olarak güncellenir.",
  q3: "Yatırımcılarla nasıl iletişime geçeceğim?",
  a3: "Platformumuz üzerinden dilediğiniz yatırımcının e-posta adresini, LinkedIn profilini ve yatırım geçmişini görüntüleyebilirsiniz. Ayrıca entegre CRM sistemimizi kullanarak her yatırımcı ile ne aşamada (İlk iletişim, toplantı, due diligence) olduğunuzu takip edebilir, taslak mail şablonlarımızı kullanarak doğrudan iletişime geçebilirsiniz.",
  q4: "Yıllık planlardaki 3 ay ücretsiz avantajı nasıl işliyor?",
  a4: "Yıllık abonelik seçtiğinizde, 12 aylık kullanım bedeli yerine yalnızca 9 aylık ücret ödersiniz. Böylece faturanızda 3 aylık bir indirim uygulanmış olur.",
  q5: "Platformda hangi ülkelerden yatırımcılar var?",
  a5: "Investr'ın veritabanı global bir ağı kapsar. Amerika (Silikon Vadisi), Avrupa, MENA bölgesi ve Türkiye başta olmak üzere dünyanın dört bir yanından binlerce yatırımcı profiline erişim sağlayabilirsiniz.",
  q6: "Girişimimi yatırımcılara nasıl daha iyi sunabilirim?",
  a6: "Platform içerisindeki kaynaklar ve Outreach AI özelliği sayesinde, yatırımcılara göndereceğiniz mesajların daha etkili olmasını sağlayacak şablonlar ve yönlendirmeler alabilirsiniz.",
  q7: "Kredi kartı bilgilerim güvende mi?",
  a7: "Kesinlikle. Ödeme altyapımız tamamen Stripe güvencesi altındadır ve kredi kartı bilgileriniz hiçbir şekilde sunucularımızda saklanmamaktadır."
};

en.landing.faq = {
  title: "Frequently Asked Questions",
  description: "We've answered the most common questions about Investr for you. Everything from platform capabilities to security is detailed below.",
  q1: "What exactly is Investr and who is it for?",
  a1: "Investr is a comprehensive investor database and CRM platform exclusively designed for entrepreneurs and start-up founders. With thousands of angel investors and VC funds, you can securely filter the best matches for your startup and manage all your communications from a single hub.",
  q2: "How often is your database updated?",
  a2: "Our investor database, including contact details and investment stages (Seed, Series A, etc.), is updated weekly using a combination of automated scans and manual verifications by our dedicated team.",
  q3: "How do I contact the investors?",
  a3: "You can view the email address, LinkedIn profile, and investment history of any investor right on the platform. Furthermore, our integrated CRM allows you to track your stage with each investor (First touch, Meeting, Due diligence) and use our draft email templates to reach out directly.",
  q4: "How does the '3 months free' on yearly plans work?",
  a4: "When you choose a yearly subscription, you pay for only 9 months of usage instead of 12. This effectively applies a 3-month discount to your billing total.",
  q5: "Which regions are covered by the investors on the platform?",
  a5: "Investr's database covers a global network. You can access thousands of investor profiles from the US (Silicon Valley), Europe, the MENA region, and Turkey.",
  q6: "How can I pitch my startup better?",
  a6: "Thanks to our in-platform resources and the Outreach AI feature, you can access powerful templates and guidance to ensure your messages to investors make a great impression.",
  q7: "Is my credit card information secure?",
  a7: "Absolutely. Our payment infrastructure is entirely secured by Stripe, and your credit card information is never stored on our servers."
};

// Update Pricing Features using correct context
tr.landing.pricingPage = {
  ...tr.landing.pricingPage,
  tiers: {
    startup: "Starter",
    startupDesc: "Yatırım turuna yeni başlayan erken aşama girişimler için.",
    pro: "Pro",
    proDesc: "Aktif olarak büyüme fonu arayan profesyonel start-up'lar için.",
    enterprise: "Enterprise",
    enterpriseDesc: "Tüm ekibinizin kullanabileceği, limitsiz yatırımcı erişimi arayanlar için.",
    features: {
      investorDatabase: "Global Yatırımcı Veritabanına Erişim",
      contactInfo: "Güncel Email ve LinkedIn İletişim Bilgileri",
      basicFilters: "Sektör ve Aşama (Stage) Filtreleme",
      crm: "Entegre Gelişmiş CRM Panosu",
      outreachAi: "Yapay Zeka Destekli Mail Şablonları (Outreach AI)",
      prioritySupport: "7/24 Öncelikli Müşteri Desteği",
      teamMembers: "Çoklu Ekip Üyesi Kullanımı (Sınırsız)"
    }
  }
};

en.landing.pricingPage = {
  ...en.landing.pricingPage,
  tiers: {
    startup: "Starter",
    startupDesc: "For early-stage startups just beginning their funding rounds.",
    pro: "Pro",
    proDesc: "For professional startups actively securing growth capital.",
    enterprise: "Enterprise",
    enterpriseDesc: "For scaling teams seeking unlimited access to our entire investor network.",
    features: {
      investorDatabase: "Access to Global Investor Database",
      contactInfo: "Up-to-date Email & LinkedIn Contact Info",
      basicFilters: "Industry and Stage Filtering",
      crm: "Integrated Advanced CRM Hub",
      outreachAi: "AI-Powered Direct Email Templates (Outreach AI)",
      prioritySupport: "24/7 Priority Customer Support",
      teamMembers: "Multi-user Team Access (Unlimited)"
    }
  }
};

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Translations successfully updated.");
