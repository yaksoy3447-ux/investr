const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// SocialProof
tr.landing.socialProof = { title: "YATIRIMCILARIMIZIN BULUNDUĞU AĞLAR" };
en.landing.socialProof = { title: "NETWORKS OUR INVESTORS BELONG TO" };

// Testimonials
tr.landing.testimonials = {
  title: "Girişimcilerin Başarı Hikayeleri",
  stories: [
    {
      name: "Ahmet Yılmaz",
      role: "Kurucu Ortak, TechVision Inc.",
      quote: "Investr sayesinde Series A turumuzu planladığımızdan 3 ay erken tamamladık. Yatırımcıların kalitesi gerçekten etkileyiciydi ve CRM panosu süreçleri çok hızlandırdı."
    },
    {
      name: "Ayşe Öz",
      role: "CEO, BioHealth Solutions",
      quote: "Melek yatırımcı ağlarına ulaşmak normalde aylarımızı alıyordu. Sektör spesifik filtreler sayesinde tam hedeflediğimiz profilleri bulduk ve yatırımı kapattık."
    },
    {
      name: "Mehmet Demir",
      role: "Kurucu, EcoSupply Chain",
      quote: "Uygulamanın arayüzü ve Outreach AI tek kelimeyle hayat kurtarıcı. Doğru mesajı, doğru zamanda, doğru yatırımcıya ulaştırarak tohum yatırım turumuzu tamamladık."
    }
  ]
};

en.landing.testimonials = {
  title: "Founder Success Stories",
  stories: [
    {
      name: "Ahmet Yilmaz",
      role: "Co-Founder, TechVision Inc.",
      quote: "Thanks to Investr, we closed our Series A round 3 months ahead of schedule. The quality of the investors was impressive and the CRM dashboard sped up the process."
    },
    {
      name: "Ayse Oz",
      role: "CEO, BioHealth Solutions",
      quote: "Reaching angel investor networks usually takes months. Thanks to industry-specific filters, we found our exact target profiles and secured funding."
    },
    {
      name: "Mehmet Demir",
      role: "Founder, EcoSupply Chain",
      quote: "The interface and Outreach AI are absolute lifesavers. By delivering the right message to the right investor at the right time, we successfully wrapped up our seed round."
    }
  ]
};

// Pricing Header FAQ
tr.landing.pricingPage.faqTitle = "Sıkça Sorulan Sorular";
en.landing.pricingPage.faqTitle = "Frequently Asked Questions";

// Auth
tr.auth = {
  welcomeBack: "Tekrar Hoş Geldiniz",
  emailLabel: "E-posta",
  emailPlaceholder: "ornek@sirket.com",
  passwordLabel: "Şifre",
  passwordPlaceholder: "••••••••",
  forgot: "Şifrenizi mi unuttunuz?",
  continue: "Devam Et",
  noAccountLabel: "Hesabınız yok mu?",
  noAccountLink: "Hemen oluşturun",
  socialProofText: "Binlerce yatırımcıyla bağlantı kurmak için",
  f1: "110,000+ yatırımcıya erişim",
  f2: "Sınırsız Email Gönderimi",
  f3: "CRM ile takiplerinizi hızlandırın",
  createAccount: "Girişimci Hesabınızı Oluşturun",
  fullName: "Ad Soyad",
  company: "Şirket adı",
  cpasswordLabel: "Şifre Tekrar",
  cpasswordPlaceholder: "••••••••",
  freeTrial: "Ücretsiz kaydol ve hemen keşfet.",
  alreadyAccount: "Zaten hesabınız var mı?",
  loginLink: "Giriş yap",
  terms1: "Kaydolduğunuzda",
  terms2: "Hizmet Şartları",
  terms3: "nı kabul etmiş sayılırsınız.",
  passMismatch: "Şifreler eşleşmiyor"
};

en.auth = {
  welcomeBack: "Welcome Back",
  emailLabel: "Email",
  emailPlaceholder: "example@company.com",
  passwordLabel: "Password",
  passwordPlaceholder: "••••••••",
  forgot: "Forgot Password?",
  continue: "Continue",
  noAccountLabel: "Don't have an account?",
  noAccountLink: "Create one now",
  socialProofText: "To connect with thousands of investors",
  f1: "Access 110,000+ investors",
  f2: "Unlimited Email Sending",
  f3: "Accelerate tracking with CRM",
  createAccount: "Create Your Founder Account",
  fullName: "Full Name",
  company: "Company Name",
  cpasswordLabel: "Confirm Password",
  cpasswordPlaceholder: "••••••••",
  freeTrial: "Sign up for free and explore.",
  alreadyAccount: "Already have an account?",
  loginLink: "Log in",
  terms1: "By signing up, you agree to our",
  terms2: "Terms of Service",
  terms3: ".",
  passMismatch: "Passwords do not match"
};


fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Success");
