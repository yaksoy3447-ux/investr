const fs = require('fs');

const registerPath = 'app/[locale]/(auth)/register/page.tsx';
let registerSrc = fs.readFileSync(registerPath, 'utf8');

const replacements = [
  ['Hemen Bize Katıl', '{t(\\\'createAccount\\\')}'],
  ['Binlerce yatırımcıyla bağlantı kurmak için Türkiye\\\\\\\'nin en kapsamlı yatırımcı veritabanını keşfet.', '{t(\\\'socialProofText\\\')}'],
  ['[\\\'1000+ yatırımcıya erişim\\\', \\\'Platform üzerinden email gönder\\\', \\\'CRM ile takip et\\\']', "[t('f1'), t('f2'), t('f3')]"],
  ['Hesabını oluştur ve hemen başla', '{t(\\\'freeTrial\\\')}'],
  ['placeholder="Ad Soyad"', 'placeholder={t(\\\'fullName\\\')}'],
  ['placeholder="Şirket adı"', 'placeholder={t(\\\'company\\\')}'],
  ['placeholder="ornek@sirket.com"', 'placeholder={t(\\\'emailPlaceholder\\\')}'],
  ['placeholder="••••••"', 'placeholder={t(\\\'passwordPlaceholder\\\')}'],
  ["label className=\\\"block text-sm font-medium text-foreground mb-1.5\\\">{t('password')}", "label className=\\\"block text-sm font-medium text-foreground mb-1.5\\\">{t('passwordLabel')}"],
  ["label className=\\\"block text-sm font-medium text-foreground mb-1.5\\\">{t('confirmPassword')}", "label className=\\\"block text-sm font-medium text-foreground mb-1.5\\\">{t('cpasswordLabel')}"],
  ["{t('termsAgree')}", "{t('terms1')} <a href=\\\"/terms\\\" className=\\\"text-primary hover:underline\\\">{t('terms2')}</a> {t('terms3')}"],
  ["{loading ? 'Hesap oluşturuluyor...' : t('registerTitle')}", "{loading ? '...' : t('continue')}"],
  ["{t('hasAccount')}", "{t('alreadyAccount')}"],
  ["{t('loginTitle')}", "{t('loginLink')}"]
];

for (const [findStr, repStr] of replacements) {
  // Be careful, using split.join directly handles plain strings without regex escaping complications.
  // Wait, some strings have quotes escaping issues. I'll just use exact literal matching with standard replace if formatted correctly.
}
