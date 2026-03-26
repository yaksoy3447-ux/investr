const fs = require('fs');

const registerPath = 'app/[locale]/(auth)/register/page.tsx';
let content = fs.readFileSync(registerPath, 'utf8');

// Using literal JS string replacement
content = content.replace("Hemen Bize Katıl", "{t('createAccount')}");
content = content.replace("Binlerce yatırımcıyla bağlantı kurmak için Türkiye'nin en kapsamlı yatırımcı veritabanını keşfet.", "{t('socialProofText')}");
content = content.replace("['1000+ yatırımcıya erişim', 'Platform üzerinden email gönder', 'CRM ile takip et'].map", "[t('f1'), t('f2'), t('f3')].map");
content = content.replace("Hesabını oluştur ve hemen başla", "{t('freeTrial')}");
content = content.replace('placeholder="Ad Soyad"', "placeholder={t('fullName')}");
content = content.replace('placeholder="Şirket adı"', "placeholder={t('company')}");
content = content.replace('placeholder="ornek@sirket.com"', "placeholder={t('emailPlaceholder')}");
content = content.replace('placeholder="••••••"', "placeholder={t('passwordPlaceholder')}");
content = content.replace('placeholder="••••••"', "placeholder={t('passwordPlaceholder')}");

const pLabelOld = "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('password')}</label>";
const pLabelNew = "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('passwordLabel')}</label>";
content = content.replace(pLabelOld, pLabelNew);

const cpLabelOld = "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('confirmPassword')}</label>";
const cpLabelNew = "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('cpasswordLabel')}</label>";
content = content.replace(cpLabelOld, cpLabelNew);

content = content.replace("{t('termsAgree')}", "{t('terms1')} <Link href='/terms' className='text-primary hover:underline'>{t('terms2')}</Link> {t('terms3')}");
content = content.replace("{loading ? 'Hesap oluşturuluyor...' : t('registerTitle')}", "{loading ? '...' : t('continue')}");
content = content.replace("{t('hasAccount')}", "{t('alreadyAccount')}");
content = content.replace("{t('loginTitle')}", "{t('loginLink')}");

fs.writeFileSync(registerPath, content);
console.log("Register successfully patched");
