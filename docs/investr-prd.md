# Investr — Türkiye'nin İlk Yatırımcı Erişim Platformu
## Product Requirements Document (PRD)

> **Versiyon:** 1.0  
> **Tarih:** Mart 2026  
> **Durum:** MVP Geliştirme  
> **Stack:** Next.js 14 · Supabase · Tailwind CSS · Stripe · Resend

---

## 1. Vizyon ve Amaç

Türkiye'de her yıl binlerce girişim fon arıyor. Yatırımcılar dağınık, iletişim bilgileri erişilemez, süreç tamamen belirsiz. Angel Match ve benzeri global platformlar İngilizce ve Türkiye odaklı değil.

**Investr**, Türk startup kurucularına 1000+ Türk melek yatırımcı ve VC'ye doğrudan erişim, platform üzerinden email outreach ve süreç takibi sunan Türkiye'nin ilk ve tek yatırımcı veritabanı platformudur.

### Temel Prensip
Platform yalnızca bir **köprüdür.** Girişimci yatırımcıyı bulur, platform üzerinden email atar, yanıtı platformda görür. Görüşme ve yatırım anlaşması taraflar arasında gerçekleşir — platform bu süreçte yer almaz.

### Hedef Kitle
- Pre-seed ve seed aşamasındaki Türk girişimciler
- Yatırım arayan teknoloji startupları
- İlk kez yatırımcı arayan solo kurucular

---

## 2. UI/UX Felsefesi

> **"Giren kullanıcı 'bu neymiş böyle' desin."**

### Tasarım Yönü: Luxury Dark SaaS
- **Tema:** Koyu zemin `#0A0A0F`, ince altın/amber aksan `#C9A84C`, cam efekti (glassmorphism)
- **Tipografi:** Display için `Playfair Display` · Body için `DM Sans`
- **Animasyonlar:** Sayfa girişinde staggered reveal · hover'da smooth geçişler · skeleton loaderlar
- **Spatial:** Grid kıran elementler · asimetrik layout · generous negatif alan
- **Detaylar:** Subtle grain overlay · custom scrollbar · micro-interactions her etkileşimde

### UI Bileşen Kütüphanesi — 21st.dev MCP

> **KRİTİK ZORUNLULUK:** Tüm UI bileşenleri için `21st.dev MCP` kullanılmalıdır.
>
> - shadcn/ui bileşenlerini 21st.dev MCP üzerinden çek
> - Animasyonlu kartlar, modal pencereler, dropdown menüler, form elementleri
> - Tüm interaktif bileşenler bu kütüphaneden gelmelidir
> - Jenerik ve sıradan görünen hiçbir bileşen kabul edilmez
> - Her hover, transition ve animasyon polished hissettirmeli

### UX İlkeleri
- İlk 5 saniyede platformun değerini hissettir
- Yatırımcı kartları hover ile tam profil önizlemesi versin
- CRM board sürükle-bırak ile akıcı çalışsın
- Her boş durum (empty state) motivasyon verici olsun
- Loading states her zaman skeleton ile — asla spinner

---

## 3. Dil ve Lokalizasyon

Platform iki dilde çalışır:

| Route | Dil | Yatırımcı Odağı |
|-------|-----|-----------------|
| `/tr` | Türkçe | Türk melek yatırımcılar ve VC'ler |
| `/en` | İngilizce | Global yatırımcılar (ABD, UK, Avrupa) |

- Next.js `i18n` routing ile yönetilir
- Her dil için ayrı yatırımcı veritabanı segmenti
- Kullanıcı arayüzü, email şablonları ve bildirimler her dilde ayrı
- Varsayılan dil tarayıcı diline göre belirlenir

---

## 4. Ödeme Altyapısı

### Stripe
- Almanya'da bireysel Stripe hesabı ile kullanılır
- Şirket kurmak zorunlu değil — bireysel başvuru yeterli
- Gereksinimler: Alman kimliği + Alman banka hesabı (IBAN)
- Türk kullanıcılar EUR veya USD cinsinden kredi kartıyla ödeme yapabilir
- Ödeme doğrudan Alman banka hesabına aktarılır

### Abonelik Planları

| Plan | Fiyat | Hedef |
|------|-------|-------|
| Başlangıç | $29/ay | Erken aşama kurucular |
| Pro | $59/ay | Aktif fon arayan girişimler |
| Yıllık (Pro) | $499/yıl | 1 ay ücretsiz |

### Stripe Entegrasyon Detayları
- `stripe.checkout.session.create` ile ödeme oturumu
- `stripe.webhooks` ile abonelik durumu takibi
- Supabase `subscriptions` tablosu ile senkronize
- İptal, güncelleme ve iade Stripe portal üzerinden
- Her kullanıcı için `stripe_customer_id` Supabase'de saklanır

---

## 5. Teknik Mimari

### Stack
```
Frontend    → Next.js 14 (App Router)
Backend     → Next.js API Routes + Supabase Edge Functions
Veritabanı  → Supabase (PostgreSQL)
Auth        → Supabase Auth (email/password + Google OAuth)
Ödeme       → Stripe
Email       → Resend
UI          → Tailwind CSS + 21st.dev MCP bileşenleri
Deploy      → Vercel
Zamanlama   → Vercel Cron Jobs
```

### Klasör Yapısı
```
/app
  /[locale]              → i18n routing (tr / en)
    /(auth)
      /login
      /register
    /(dashboard)
      /investors          → Yatırımcı veritabanı
      /crm                → Fundraising CRM
      /outreach           → Email outreach
      /inbox              → Gelen yanıtlar
      /settings           → Profil ayarları
  /api
    /stripe               → Webhook + checkout
    /email                → Gönderim + webhook
    /investors            → Veritabanı CRUD
/components
  /ui                     → 21st.dev MCP bileşenleri
  /investors              → Yatırımcı kartları
  /crm                    → Kanban board
  /email                  → Email editörü
```

---

## 6. Veritabanı Şeması (Supabase)

### `users`
```sql
id                  uuid PRIMARY KEY
email               text UNIQUE
full_name           text
company_name        text
website             text
stripe_customer_id  text
plan                text DEFAULT 'free'   -- free | starter | pro
plan_expires_at     timestamp
locale              text DEFAULT 'tr'     -- tr | en
created_at          timestamp DEFAULT now()
```

### `investors`
```sql
id               uuid PRIMARY KEY
name             text NOT NULL
title            text                  -- Kurucu Ortak, CEO, Partner vb.
company          text                  -- Fon veya şirket adı
email            text                  -- Gizli, kullanıcıya gösterilmez
email_verified   boolean DEFAULT false
linkedin_url     text
website          text
location_city    text
location_country text DEFAULT 'TR'
investor_type    text[]                -- angel | vc | family_office | pe
sectors          text[]                -- saas | fintech | ai | gaming vb.
stages           text[]                -- pre_seed | seed | series_a | series_b
min_ticket       integer               -- USD cinsinden minimum check size
max_ticket       integer               -- USD cinsinden maksimum check size
portfolio        text[]                -- Yatırım yaptığı şirketler
bio              text
locale           text DEFAULT 'tr'     -- tr | en
is_active        boolean DEFAULT true
created_at       timestamp DEFAULT now()
updated_at       timestamp DEFAULT now()
```

### `investor_lists`
```sql
id           uuid PRIMARY KEY
user_id      uuid REFERENCES users(id)
investor_id  uuid REFERENCES investors(id)
crm_stage    text DEFAULT 'new'        -- new | contacted | replied | meeting | closed
notes        text
added_at     timestamp DEFAULT now()
last_contacted timestamp
```

### `email_threads`
```sql
id                uuid PRIMARY KEY
user_id           uuid REFERENCES users(id)
investor_id       uuid REFERENCES investors(id)
subject           text
status            text DEFAULT 'sent'  -- sent | delivered | opened | replied
reply_to_address  text                 -- user-{id}@mail.investr.co
sent_at           timestamp
replied_at        timestamp
created_at        timestamp DEFAULT now()
```

### `email_messages`
```sql
id         uuid PRIMARY KEY
thread_id  uuid REFERENCES email_threads(id)
direction  text                         -- outbound | inbound
body       text
sent_at    timestamp DEFAULT now()
```

### `subscriptions`
```sql
id                     uuid PRIMARY KEY
user_id                uuid REFERENCES users(id)
stripe_subscription_id text UNIQUE
stripe_customer_id     text
plan                   text
status                 text             -- active | canceled | past_due
current_period_end     timestamp
created_at             timestamp DEFAULT now()
```

---

## 7. Sayfa ve Özellik Detayları

### 7.1 Landing Page (`/`)

**Amaç:** Ziyaretçiyi 5 saniyede ikna et, üye olmaya yönlendir.

**Bölümler:**

- **Hero:** Büyük başlık — "Türkiye'nin tüm yatırımcılarına tek platformdan ulaş" · CTA butonu · Blurred dashboard önizlemesi
- **Sosyal kanıt:** Yatırımcı sayısı · Aktif kullanıcı · Başarılı bağlantı sayısı (counter animasyonu ile)
- **Nasıl çalışır:** 3 adım — Ara · Email at · Takip et
- **Yatırımcı önizleme:** Bulanık/kilitli yatırımcı kartları — "Görmek için üye ol"
- **Fiyatlandırma:** Plan kartları · Stripe checkout bağlantısı
- **SSS:** Sık sorulan sorular
- **Footer:** Gizlilik politikası · Kullanım şartları · İletişim

**UI Notları:**
- Hero bölümünde parallax efekti
- Yatırımcı kartlarında glassmorphism
- Counter animasyonları scroll trigger ile
- CTA butonu pulse animasyonu ile dikkat çeksin

---

### 7.2 Kayıt / Giriş (`/register`, `/login`)

- Email + şifre ile kayıt
- Google OAuth ile giriş
- Kayıt sonrası plan seçimine yönlendir
- 7 günlük ücretsiz deneme — kredi kartı zorunlu değil başlangıçta

---

### 7.3 Investor Database (`/[locale]/investors`)

**Ana özellik — platformun kalbi.**

#### Filtreler (sol sidebar):
- Yatırımcı tipi (Melek / VC / Aile Ofisi / Özel Sermaye)
- Sektör (SaaS, Fintech, AI, Oyun, Sağlık, E-ticaret vb.)
- Yatırım aşaması (Pre-seed, Seed, Seri A, Seri B)
- Lokasyon (İstanbul, Ankara, İzmir, Diğer)
- Check size aralığı (slider)
- Doğrulanmış email filtresi

#### Yatırımcı Kartı Görünümü:
```
┌─────────────────────────────────┐
│  [Avatar]  İsim Soyisim         │
│            Unvan · Şirket       │
│                                 │
│  [Melek] [Tohum] [SaaS]        │
│                                 │
│  📍 İstanbul   ✉️ Doğrulanmış  │
│                                 │
│  [Listeye Ekle] [Email Gönder] │
└─────────────────────────────────┘
```

**Hover durumunda:**
- Kart büyür, detaylı profil açılır
- Portföy şirketleri görünür
- Bio ve son yatırım bilgisi görünür

#### Arama:
- Anlık arama (debounced, 300ms)
- İsim, şirket veya sektöre göre

#### Plan Kısıtlamaları:

| Özellik | Ücretsiz | Başlangıç | Pro |
|---------|----------|-----------|-----|
| Görüntülenebilir yatırımcı | 10 | Tümü | Tümü |
| Listeye ekleme | 5 | 50 | Sınırsız |
| Email gönderimi | - | 10/gün | 30/gün |
| CSV export | - | - | ✓ |

---

### 7.4 Fundraising CRM (`/[locale]/crm`)

**Kanban board — yatırımcı süreç takibi.**

#### Sütunlar:
```
[Yeni] → [İletişime Geçildi] → [Yanıt Verdi] → [Görüşme] → [Kapandı]
```

#### Kart Özellikleri:
- Yatırımcı adı ve şirketi
- Yatırımcı tipi ve aşama etiketleri
- Son iletişim tarihi
- Not ekleme butonu
- Sürükle-bırak ile sütun değiştirme

#### Ekstra Özellikler:
- Sütun başlığında yatırımcı sayısı
- Filtre: Bu haftaki aktivite · Yanıt bekleyenler
- Toplu işlem: Seçili kartlara email gönder

**UI Notları:**
- `@dnd-kit/core` ile sürükle-bırak
- Kart taşınırken smooth animasyon
- Sütun renkleri aşamaya göre farklı

---

### 7.5 Email Outreach (`/[locale]/outreach`)

**Platform üzerinden yatırımcıya email gönderimi.**

#### Email Akışı:
```
Kullanıcı email yazar
    ↓
Platform gönderir → from: outreach@investr.co
    ↓
Reply-to: user-{id}@mail.investr.co olarak ayarlanır
    ↓
Yatırımcı "Yanıtla" dediğinde platform adresine gelir
    ↓
Resend webhook yakalar
    ↓
Kullanıcının Inbox'ına düşer
```

> Yatırımcının email adresi hiçbir zaman kullanıcıya gösterilmez.

#### Email Editörü:
- Konu satırı alanı
- Zengin metin editörü (bold, italic, link)
- Kişiselleştirme: `{{investor_name}}`, `{{investor_company}}`
- AI email önerisi butonu (Pro plan)
- Gönderim öncesi önizleme

#### AI Email Generator (Pro — Anthropic API):
- Yatırımcının sektör ve portföyüne göre kişiselleştirilmiş taslak üretir
- Kullanıcı taslağı düzenleyip gönderir
- Anthropic Claude API ile entegre

#### Günlük Limit Yönetimi:
- Başlangıç planı: 10 email/gün
- Pro plan: 30 email/gün
- Limit dolduğunda upgrade CTA göster
- Gece yarısı UTC+0'da limit sıfırlanır

#### Spam Koruması:
- Resend ile gönderim (yüksek deliverability)
- SPF, DKIM, DMARC yapılandırması
- Günlük limit ile toplu spam engeli
- Bounce ve complaint takibi — tekrar eden sorunlarda hesap uyarısı

---

### 7.6 Inbox (`/[locale]/inbox`)

**Yatırımcılardan gelen yanıtlar.**

#### Liste Görünümü:
```
[Avatar] Yatırımcı Adı                2 saat önce
         Konu: Re: Girişimimiz hakkında
         "Merhaba, fikriniz ilginç gel..."
```

#### Detay Görünümü:
- Tüm email zinciri görünür
- Yanıt yaz butonu
- CRM'de ilgili kartı otomatik "Yanıt Verdi" sütununa taşı önerisi

---

### 7.7 Profile Settings (`/[locale]/settings`)

- Ad, şirket adı, web sitesi düzenleme
- Email ve şifre değişikliği
- Abonelik planı görüntüleme ve yükseltme
- Stripe Customer Portal bağlantısı (fatura geçmişi, iptal)
- Dil tercihi (TR / EN)
- Hesap silme (GDPR uyumlu)

---

## 8. Email Altyapısı (Resend)

### Yapılandırma:
```
Domain          : investr.co
Gönderim adresi : outreach@investr.co
Reply-to format : user-{user_id}@mail.investr.co
Webhook URL     : /api/email/webhook
```

### Sistem Emaillerı:

| Tür | Tetikleyici |
|-----|-------------|
| Hoş geldin | Kayıt sonrası |
| Abonelik onayı | Ödeme başarılı |
| Günlük limit uyarısı | 8/10 email gönderildi |
| Yeni yanıt bildirimi | Inbox'a yeni mesaj geldi |
| Deneme süresi bitiyor | 2 gün kala |
| Abonelik yenilendi | Her ay |

---

## 9. Geliştirme Fazları

### Faz 1 — MVP (4–5 hafta)
- [ ] Landing page (muazzam UI, 21st.dev MCP bileşenleri)
- [ ] Kayıt / Giriş (Supabase Auth + Google OAuth)
- [ ] Stripe abonelik entegrasyonu
- [ ] Yatırımcı veritabanı (başlangıç: 200–500 Türk yatırımcı)
- [ ] Filtreler ve anlık arama
- [ ] Yatırımcı listeye ekleme
- [ ] Fundraising CRM (Kanban board, sürükle-bırak)
- [ ] Temel profil ayarları

### Faz 2 — Email Outreach (2–3 hafta)
- [ ] Resend entegrasyonu
- [ ] Email gönderim sistemi (reply-to akışı)
- [ ] Inbox — gelen yanıtları yakala ve göster
- [ ] Email thread görünümü
- [ ] Günlük limit sistemi

### Faz 3 — Büyüme (3–4 hafta)
- [ ] AI email generator (Anthropic Claude API)
- [ ] CSV export (Pro plan)
- [ ] İngilizce versiyon + global yatırımcı veritabanı
- [ ] Referral sistemi
- [ ] Analytics dashboard

---

## 10. Veri Toplama Planı

### Başlangıç Veri Seti (Faz 1 lansmanı için):
- **Hedef:** 500–1000 Türk yatırımcı profili
- **Kaynaklar:**
  - Galata Business Angels üye listesi (halka açık)
  - Istanbul Startup Angels üye listesi
  - Keiretsu Forum Türkiye yatırımcıları
  - LinkedIn'den manuel araştırma
  - StartupCentrum 2024 yatırımcılar tablosu (Excel verisi mevcut)
  - GitHub `sumnulu/TurkeyStartup` repo verisi

### Veri Güncelleme Döngüsü:
- Kullanıcı "Hatalı bildir" butonu ile geri bildirim verebilir
- Aylık manuel kontrol döngüsü
- Email doğrulama: `email_verified = true` olan profiller öne çıkarılır

---

## 11. SEO Stratejisi

Ücretsiz organik trafik için statik sayfalar (SSG):

```
/tr/yatirimcilar/istanbul
/tr/yatirimcilar/melek-yatirimci
/tr/yatirimcilar/teknoloji
/tr/yatirimcilar/tohum-asamasi
/blog/turkiyede-yatirimci-nasil-bulunur
/blog/melek-yatirimci-nedir
/blog/seed-yatirim-nasil-alinir
```

Her sayfa Google tarafından indekslenir, organik trafik ücretsiz kullanıcı getirir.

---

## 12. Yatırımcı Opt-Out Sistemi

Platform üzerinden gönderilen her email yatırımcının isteği olmadan gönderilmektedir. Yatırımcıları korumak, platforma olan güveni sağlamak ve GDPR uyumluluğunu sürdürmek için kapsamlı bir opt-out sistemi zorunludur.

### Temel Prensip
Bir yatırımcı opt-out talebinde bulunduğunda, o yatırımcıya platform üzerinden **hiçbir kullanıcı bir daha email gönderemez.** Bu kural istisnasız uygulanır.

### Email Footer Zorunluluğu

Platform üzerinden gönderilen **her emailin** altında şu bölüm yer almalıdır:

```
---
Bu email Investr platformu üzerinden gönderilmiştir.
Bundan sonra bu platformdan email almak istemiyorsanız:
[Listemden Çıkar] → https://investr.co/optout?token={unique_token}
```

- Token her yatırımcı için benzersiz ve tahmin edilemez olmalı (UUID)
- Link tıklandığında onay sayfası göster — tek tıkla aktif olsun
- Footer Türkçe ve İngilizce olarak otomatik dil tespiti ile gösterilsin

### Veritabanı Güncellemesi

`investors` tablosuna iki yeni alan eklenir:

```sql
opted_out        boolean DEFAULT false
opted_out_at     timestamp
opted_out_token  text UNIQUE    -- UUID, email footer linkinde kullanılır
```

### Opt-Out Akışı

```
Yatırımcı footer'daki linke tıklar
    ↓
/optout?token=xxx sayfası açılır
    ↓
"Bu emaili bir daha almak istemiyorsanız onaylayın" gösterilir
    ↓
Yatırımcı onaylar
    ↓
investors tablosunda opted_out = true yapılır
    ↓
Onay sayfası: "Listemizden çıkarıldınız. Bir daha email almayacaksınız."
```

### Email Gönderim Kontrolü

Her email gönderimi öncesinde sistem şu kontrolü yapar:

```
investor.opted_out === true → Email gönderilmez, kullanıcıya uyarı gösterilir:
"Bu yatırımcı platform üzerinden email almak istemediğini belirtti."
```

Opt-out yapan yatırımcı kartı veritabanında gizlenmez — kullanıcı profili görmeye devam eder. Sadece email gönderimi engellenir.

### Hatalı Bildir Butonu

Her yatırımcı kartında "Hatalı bildir" butonu bulunur. Kullanıcı şunları bildirebilir:
- Email adresi geçersiz / bounce aldı
- Bilgiler güncel değil
- Yatırımcı artık aktif değil

Bildirilen profiller admin panelinde inceleme kuyruğuna düşer.

### Admin Paneli

Opt-out ve bildirim yönetimi için basit bir admin sayfası:

```
/admin/investors
  → Opt-out yapan yatırımcılar listesi
  → Hatalı bildirim kuyruğu
  → Yatırımcı profil düzenleme
  → Toplu veri güncelleme
```

Admin sayfası sadece `role = admin` olan kullanıcılara açık olmalıdır.

---

## 13. Güvenlik ve Gizlilik

- Yatırımcı email adresleri **hiçbir zaman** kullanıcıya gösterilmez
- Tüm API rotaları auth middleware ile korunur
- Row Level Security (RLS) Supabase'de aktif — kullanıcı sadece kendi verisine erişir
- Kullanıcı verisi üçüncü taraflarla paylaşılmaz
- GDPR uyumlu: kullanıcı tüm verisini silebilir
- Rate limiting tüm API rotalarında aktif
- Opt-out sistemi zorunlu — yatırımcı talebi anında uygulanır

---

## 14. Çevre Değişkenleri (.env)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PRO_PRICE_ID=
STRIPE_PRO_YEARLY_PRICE_ID=

# Resend
RESEND_API_KEY=
RESEND_WEBHOOK_SECRET=
EMAIL_FROM=outreach@investr.co
EMAIL_REPLY_DOMAIN=mail.investr.co

# Anthropic (Faz 3)
ANTHROPIC_API_KEY=

# App
NEXT_PUBLIC_APP_URL=https://investr.co
```

---

## 15. Başarı Metrikleri

| Metrik | Faz 1 Hedefi | 6. Ay Hedefi |
|--------|-------------|--------------|
| Kayıtlı kullanıcı | 200 | 1000 |
| Ücretli abonelik | 30 | 150 |
| MRR | $870 | $5,850 |
| Günlük aktif kullanıcı | 20 | 100 |
| Gönderilen email | 500/ay | 5000/ay |
| Churn rate | <%10 | <%7 |

---

## 16. Referans ve Kaynaklar

- **Benchmark:** [angelmatch.io](https://angelmatch.io)
- **UI Bileşenleri:** [21st.dev MCP](https://21st.dev/mcp)
- **Email Servisi:** [resend.com](https://resend.com)
- **Ödeme:** [stripe.com](https://stripe.com)
- **Veritabanı:** [supabase.com](https://supabase.com)
- **Deploy:** [vercel.com](https://vercel.com)
- **Türkiye Yatırımcı Verisi:** StartupCentrum 2024 Raporu · GitHub `sumnulu/TurkeyStartup`
- **Sürükle-Bırak:** [@dnd-kit/core](https://dndkit.com)
