const fs = require('fs');
const path = require('path');

const trPath = path.join(__dirname, 'i18n', 'messages', 'tr.json');
const enPath = path.join(__dirname, 'i18n', 'messages', 'en.json');

const trData = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

trData.pages.termsTitle = "Kullanım Koşulları (Terms of Service)";
trData.pages.termsContent = `Son Güncelleme: Mart 2026

GetInvestr'a hoş geldiniz! Platformumuza kayıt olarak ve hizmetlerimizi kullanarak aşağıdaki kuralları ("Kullanım Koşulları") kabul etmiş sayılırsınız. Lütfen bu metni dikkatle okuyun; çünkü bu sözleşme, yasal haklarınızı ve platformumuzu kullanırken uymanız gereken kuralları belirler.

1. HİZMETİN KAPSAMI
GetInvestr, girişimciler ve yatırım arayan şirketler için tasarlanmış global bir B2B Yatırımcı Veritabanı ve iletişim platformudur. Size sunduğumuz yatırımcı verileri, sürekli güncellenen harici ve dâhili analizlerin sonucudur. Platformumuz bir veri arama, filtreleme ve CRM (Müşteri İlişkileri Yönetimi) aracı olarak çalışır.

2. GİZLİLİK VE VERİ KULLANIMI (ANTİ-SCRAPING)
GetInvestr'ın asıl değeri, binlerce saatlik emeğin sonucu olan yatırımcı verileridir. Bu sebeple aşağıdaki eylemler KESİNLİKLE YASAKTIR:
• Veri Kopyalama: Platformumuzdaki yatırımcı iletişim bilgilerini (isim, soyisim, e-posta, şirket bilgileri vb.) alıp kendi adınıza ticari bir veritabanı olarak satmak veya üçüncü taraflarla kitleler halinde paylaşmak suçtur.
• Bot ve Otomasyon: Sitemiz üzerinde verileri hızla çekmek veya kopyalamak amacıyla otomatik yazılımlar (Bot, Scraper, Crawler vb.) kullanmak yasaktır. Sistemlerimiz bu tür aşırı trafikleri (anormal sayfa yenilemeleri) otomatik olarak tespit eder.
Bu kuralların ihlali durumunda GetInvestr, kullanıcının hesabını uyarı yapmaksızın ve ücret iadesi olmaksızın derhal dondurma hakkını saklı tutar.

3. ABONELİK, ÖDEMELER VE İADE POLİTİKASI (NO REFUNDS)
Dijital ve kopyalanabilir bir veri hizmeti sunduğumuz için geri ödeme politikalarımız sektör standartlarına tabidir:
• Abonelik İptali: Abonelik modelimiz aylık veya yıllıktır. Aboneliğinizi dilediğiniz zaman hesap ayarlarınızdan ("Settings") iptal edebilirsiniz. İptal ettiğinizde hesabınız dönemin sonuna kadar aktif kalır, ancak bir sonraki dönem için kartınızdan çekim yapılmaz.
• İadesizlik (No Refund) Kuralı: Veriye erişimin anında gerçekleştiği (dijital içerik) bir servis sunduğumuz için ÜCRETLİ ABONELİKLERDE GERİ ÖDEME (REFUND) YAPILMAMAKTADIR. Kartınızdan çekilen tutarın iadesi, kullanım yapmamış olsanız dahi mümkün değildir. Lütfen sistemi test etmek için ücretsiz/deneme sürümünüzü dikkatlice kullanın.
• Hatalı Çekimler: Eğer teknik bir hata nedeniyle hesabınızdan çifte çekim yapıldığını düşünüyorsanız, durumu 7 gün içerisinde destek ekibimize bildirmelisiniz.

4. HESAP GÜVENLİĞİ VE PAYLAŞIMI
Satın aldığınız veya ücretsiz oluşturduğunuz her bir GetInvestr hesabı tek bir kullanıcı içindir. Şifrenizi şirketin dışı veya içi fark etmeksizin çok sayıda kişiyle paylaşarak veri limitlerimizi delmeye çalışmak, hesap güvenliğinin ihlali sayılır ve hesabın kalıcı olarak kapatılmasıyla sonuçlanır.

5. VERİ DOĞRULUĞU (FERAGATNAME)
Sistemimizdeki yatırımcı profillerinin ve özellikle iletişim detaylarının (e-posta) doğruluğunu ve güncelliğini %99 oranında tutmak için devasa bir teknoloji kullanıyoruz. Ancak, yatırımcıların pozisyon veya şirket değiştirmesi sık karşılaşılan bir durumdur. Bu nedenle %100 doğruluğu veya yapacağınız başvurulara (pitch) yanıt alma garantisini veremeyiz. GetInvestr sadece sizin için bir iletişim köprüsü sunar, yatırımın sonucundan sorumlu değildir.

GetInvestr Platform Yönetimi
İletişim: support@getinvestr.com
`;

enData.pages.termsTitle = "Terms of Service";
enData.pages.termsContent = `Last Updated: March 2026

Welcome to GetInvestr! By registering on our platform and using our services, you agree to the following rules ("Terms of Service"). Please read this document carefully, as it establishes your legal rights and the rules you must follow while using our platform.

1. SCOPE OF SERVICE
GetInvestr is a global B2B Investor Database and outreach platform designed for founders and companies seeking capital. The investor data we provide is the result of continuously updated external and internal analysis. Our platform functions as a data search, filtering, and CRM tool.

2. FAIR USE AND ANTI-SCRAPING
The core value of GetInvestr lies in its investor data, which is the result of thousands of hours of effort. Therefore, the following actions are STRICTLY PROHIBITED:
• Data Reselling: It is forbidden to extract investor contact information (names, emails, company details, etc.) from our platform to sell or redistribute as your own commercial database.
• Bots and Automation: Using automated software (Bots, Scrapers, Crawlers, etc.) to rapidly extract or duplicate data from our site is prohibited. Our systems automatically detect such excessive traffic.
In the event of a violation of these rules, GetInvestr reserves the right to immediately suspend the user's account without warning and without any refund.

3. SUBSCRIPTIONS, BILLING & NO REFUND POLICY
Because we offer a digital, immediately accessible data service, our refund policies follow strict industry standards:
• Cancellation: Our subscription model is monthly or annual. You can cancel your subscription at any time from your account settings. Upon cancellation, your account will remain active until the end of the billing period, and you will not be charged for the following period.
• No Refund Rule: Due to the nature of providing immediate access to proprietary digital content, ALL PAID SUBSCRIPTIONS ARE NON-REFUNDABLE. Once a charge has been successfully processed, refunds cannot be issued, even in the case of non-usage. Please use the free tier or trial periods carefully to evaluate the system before upgrading.
• Billing Errors: If you believe you have been double-charged due to a technical error, you must notify our support team within 7 days.

4. ACCOUNT SECURITY AND SHARING
Each GetInvestr account you purchase or create is intended for a single user (or specified team limit). Attempting to bypass our data limits by sharing your password with multiple people, outside or inside your organization, is considered a breach of account security and will result in permanent account closure.

5. DATA ACCURACY DISCLAIMER
We utilize massive technological resources to maintain 99% accuracy and freshness of our investor profiles and contact details (emails). However, it is common for investors to change positions or firms. Therefore, we cannot guarantee 100% accuracy, nor can we guarantee responses to your outreach (pitches). GetInvestr merely provides an actionable communication bridge and is not responsible for investment outcomes.

GetInvestr Administration
Contact: support@getinvestr.com
`;

fs.writeFileSync(trPath, JSON.stringify(trData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
console.log('Terms of service text updated perfectly!');
