-- ========================================
-- Investr — Seed Investor Data
-- 12 Türk ekosistemi yatırımcısı
-- ========================================

INSERT INTO investors (id, name, title, company, email_verified, linkedin_url, location_city, location_country, investor_type, sectors, stages, min_ticket, max_ticket, portfolio, bio, locale, is_active) VALUES
(
  'a1b2c3d4-0001-4000-8000-000000000001',
  'Ali Koç', 'Kurucu Ortak', 'Koç Digital Ventures',
  true, 'https://linkedin.com/in/alikoc',
  'İstanbul', 'TR',
  ARRAY['vc'], ARRAY['fintech','saas','ai'], ARRAY['seed','series_a'],
  100000, 1000000,
  ARRAY['Getir','Trendyol','Iyzico'],
  'Türkiye''nin önde gelen teknoloji yatırımcılarından. Fintech ve SaaS alanında aktif.',
  'tr', true
),
(
  'a1b2c3d4-0002-4000-8000-000000000002',
  'Elif Yılmaz', 'Managing Partner', 'Bosphorus Ventures',
  true, 'https://linkedin.com/in/elifyilmaz',
  'İstanbul', 'TR',
  ARRAY['vc'], ARRAY['ecommerce','marketplace','logistics'], ARRAY['pre_seed','seed'],
  50000, 500000,
  ARRAY['HepsiBurada','Yemeksepeti'],
  'E-ticaret ve pazar yeri modellerinde uzman. Erken aşama yatırımcı.',
  'tr', true
),
(
  'a1b2c3d4-0003-4000-8000-000000000003',
  'Murat Demir', 'Angel Investor', 'Bağımsız',
  false, NULL,
  'Ankara', 'TR',
  ARRAY['angel'], ARRAY['health','deeptech'], ARRAY['pre_seed'],
  10000, 100000,
  ARRAY['MedTech Ankara'],
  'Sağlık teknolojilerine odaklanan melek yatırımcı. Ankara ekosisteminde aktif.',
  'tr', true
),
(
  'a1b2c3d4-0004-4000-8000-000000000004',
  'Zeynep Aksoy', 'General Partner', 'Anatolia Fund',
  true, 'https://linkedin.com/in/zeynepaksoy',
  'İstanbul', 'TR',
  ARRAY['vc'], ARRAY['gaming','social','ai'], ARRAY['seed','series_a','series_b'],
  200000, 2000000,
  ARRAY['Peak Games','Gram Games','Dream Games'],
  'Oyun ve sosyal medya startup''larına yatırım yapan deneyimli VC.',
  'tr', true
),
(
  'a1b2c3d4-0005-4000-8000-000000000005',
  'Can Başaran', 'CEO', 'FamilyO Capital',
  true, NULL,
  'İzmir', 'TR',
  ARRAY['family_office'], ARRAY['logistics','food','ecommerce'], ARRAY['seed','series_a'],
  500000, 5000000,
  ARRAY['Taze Mutfak','JetKurier'],
  'Ege bölgesinin en büyük aile ofislerinden. Lojistik ve gıda teknolojisine odaklı.',
  'tr', true
),
(
  'a1b2c3d4-0006-4000-8000-000000000006',
  'Selin Tunç', 'Partner', 'Seed Türkiye',
  false, 'https://linkedin.com/in/selintunc',
  'İstanbul', 'TR',
  ARRAY['vc'], ARRAY['edtech','saas'], ARRAY['pre_seed','seed'],
  25000, 250000,
  ARRAY['Udemy TR','KodlaBilim'],
  'Eğitim teknolojileri ve SaaS alanında aktif. Pre-seed odaklı.',
  'tr', true
),
(
  'a1b2c3d4-0007-4000-8000-000000000007',
  'Hakan Öztürk', 'Founder & Angel', 'Bağımsız',
  true, NULL,
  'İstanbul', 'TR',
  ARRAY['angel'], ARRAY['fintech','ai','saas'], ARRAY['pre_seed','seed'],
  15000, 150000,
  ARRAY['PayTR','Colendi'],
  'Eski fintech girişimcisi, şimdi melek yatırımcı. Yapay zeka odaklı fintech''lere ilgili.',
  'tr', true
),
(
  'a1b2c3d4-0008-4000-8000-000000000008',
  'Deniz Kaya', 'Investment Director', 'Turkven',
  true, 'https://linkedin.com/in/denizkaya',
  'İstanbul', 'TR',
  ARRAY['pe'], ARRAY['ecommerce','food','health'], ARRAY['series_a','series_b'],
  1000000, 10000000,
  ARRAY['Domino''s TR','Sağlıkçım'],
  'Büyüme aşaması odaklı özel sermaye yatırımcısı. E-ticaret ve sağlık sektöründe deneyimli.',
  'tr', true
),
(
  'a1b2c3d4-0009-4000-8000-000000000009',
  'Ayşe Çelik', 'Melek Yatırımcı', 'Galata Business Angels',
  true, NULL,
  'İstanbul', 'TR',
  ARRAY['angel'], ARRAY['social','edtech','marketplace'], ARRAY['pre_seed'],
  5000, 50000,
  ARRAY['SocialBuzz','EğitimX'],
  'Kadın girişimcilere odaklanan melek yatırımcı. Sosyal etki projeleri öncelikli.',
  'tr', true
),
(
  'a1b2c3d4-0010-4000-8000-000000000010',
  'Burak Şahin', 'VP Investments', 'İstanbul Venture Partners',
  true, 'https://linkedin.com/in/buraksahin',
  'İstanbul', 'TR',
  ARRAY['vc'], ARRAY['ai','deeptech','saas'], ARRAY['seed','series_a'],
  250000, 3000000,
  ARRAY['AIStartup','DeepSense','CloudTR'],
  'Yapay zeka ve derin teknoloji alanlarında uzman. Teknik due diligence konusunda güçlü.',
  'tr', true
),
(
  'a1b2c3d4-0011-4000-8000-000000000011',
  'Fatma Güneş', 'Kurucu', 'AngelEffect',
  true, NULL,
  'İstanbul', 'TR',
  ARRAY['angel'], ARRAY['health','food','social'], ARRAY['pre_seed','seed'],
  10000, 75000,
  ARRAY['FreshFarm','HealthApp'],
  'Kadın girişimciler için melek yatırım ağı kurucusu. Sürdürülebilirlik odaklı.',
  'tr', true
),
(
  'a1b2c3d4-0012-4000-8000-000000000012',
  'Emre Yıldız', 'Managing Director', 'Endeavor Catalyst TR',
  true, 'https://linkedin.com/in/emreyildiz',
  'İstanbul', 'TR',
  ARRAY['vc'], ARRAY['fintech','marketplace','logistics'], ARRAY['series_a','series_b'],
  500000, 5000000,
  ARRAY['Insider','Modanisa','BiTaksi'],
  'Büyüme aşaması VC. Türkiye''nin en hızlı büyüyen şirketlerine yatırım yapıyor.',
  'tr', true
);
