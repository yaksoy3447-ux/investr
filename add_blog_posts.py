import json
import os

def update_json(lang, file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    posts = data['landing']['blog']['posts']
    max_id = max([p['id'] for p in posts]) if len(posts) > 0 else 0
    
    if lang == 'tr':
        new_posts = [
            {
                "title": "Otonom Sürüşte Devrim: Waymo 2026'nın İlk Çeyreğinde 16 Milyar Dolar Yatırım Aldı",
                "content": "2026 yılı, otonom araç teknolojilerinin laboratuvarlardan çıkıp küresel şehirlerin ana taşımacılık unsuru haline geldiği yıl olarak tarihe geçiyor. Google'ın ana kuruluşu Alphabet bünyesindeki Waymo, sürücüsüz araç filosunu dünya çapında 20 yeni metropole yaymak amacıyla tam 16 milyar dolarlık devasa bir yatırım turunu kapattığını duyurdu. Bu rekor fonlama, şirketin L4 seviyesindeki otonom sürüş kapasitesini ticari ölçekte kanıtladığının en somut göstergesi oldu.\n\nTeknolojik açıdan Waymo, altıncı nesil Lidar ve sensör füzyon sistemleriyle hata payını sıfıra yakın bir seviyeye indirmeyi başardı. Yeni nesil sensörler, aşırı hava koşullarında bile milimetrik hassasiyetle çevreyi algılayabiliyor. Bu teknolojik üstünlük, otonom araçların sadece güneşli California yollarında değil, yoğun kar yağışlı Kuzey Avrupa şehirlerinde de güvenle hizmet vermesini sağlıyor.\n\nStratejik büyüme planları kapsamında Waymo, sadece kendi araç üretimini artırmakla kalmıyor, aynı zamanda küresel otomotiv devlerine yazılım lisanslama modelini de devreye alıyor. 2026 sonuna kadar Londra, Berlin, Riyad ve Tokyo sokaklarında Waymo logolu robotaksilerin görülmesi hedefleniyor. Bu genişleme, geleneksel taksi ve toplu taşıma modellerini kökten sarsacak bir değişimin habercisi.\n\nYatırımcılar için Waymo'nun başarısı, donanım ve yazılımın mükemmel uyumuyla gelen operasyonel verimlilikten kaynaklanıyor. Şirket, operasyonel maliyetlerini geçtiğimiz yıla oranla %40 düşürerek kârlılık yolunda dev bir adım attı. Otonom sürüş artık sadece bir 'hype' değil, yatırımcılar için yıllık bazda milyarlarca dolarlık getiri potansiyeli sunan rüştünü ispatlamış bir sektör.\n\nDüzenleyici kurumlarla (regülatörlerle) kurulan yakın ilişkiler de bu yatırımın önünü açan kritik faktörler arasında yer alıyor. Waymo, milyonlarca kilometrelik sürüş verisini şeffaf bir şekilde paylaşarak otonom sistemlerin insan sürücülere oranla %70 daha güvenli olduğunu kanıtladı. Bu güvenlik verileri, hükümetleri otonom araç yasal düzenlemelerini hızlandırma konusunda ikna eden en güçlü argüman haline geldi.\n\nSonuç olarak, 16 milyar dolarlık bu tarihi yatırım, otonom mobilite dünyasında kazananın artık belli olduğunu hissettiriyor. Waymo, sadece bir teknoloji şirketi değil, geleceğin akıllı şehirlerinin ana altyapı sağlayıcısı olma yolunda emin adımlarla ilerliyor. 2026 yılı, direksiyon başında kimsenin olmadığı yeni bir ulaşım çağının resmen başladığı yıl olarak hatırlanacak.",
                "author": "GetInvestr Research",
                "date": "06 Nisan 2026",
                "readMinutes": 10,
                "image": "/blog/waymo_main.png",
                "secondaryImages": [
                    "/blog/waymo_1.png",
                    "/blog/waymo_2.png",
                    "/blog/waymo_3.png",
                    "/blog/ai_1.png"
                ],
                "category": "Otonom Sistemler"
            },
            {
                "title": "İnsan ve Makine Sinerjisi: Wearable Robotics Sağlık Teknolojilerinde Yeni Bir Çığır Açıyor",
                "content": "Giyilebilir teknolojiler ve yapay zeka, bugün artık sadece kolumuzdaki saatlerden ibaret değil. İtalya merkezli Wearable Robotics, nöromotor rehabilitasyon süreçlerinde devrim yaratan dış iskelet (exoskeleton) sistemlerini küreselleştirmek için 5 milyon Euro değerindeki Seri A yatırım turunu başarıyla tamamladı. Bu gelişme, 'Fiziksel Yapay Zeka' (Physical AI) kavramının sağlık sektöründeki en somut ve umut verici uygulamalarından biri olarak kabul ediliyor.\n\nWearable Robotics'in geliştirdiği dış iskeletler, felçli veya nörolojik rahatsızlıkları olan hastaların yeniden yürümesini sağlamakla kalmıyor, aynı zamanda yapay zeka sayesinde hastanın hareket niyetini saliseler içinde algılayarak motor becerilerin gelişimine destek oluyor. Karbon fiber yapısı ve hafifliği ile öne çıkan sistem, hastanelerdeki uzun rehabilitasyon süreçlerini %50'ye varan oranlarda hızlandırabiliyor.\n\nYatırımın ana odağı, bu teknolojiyi sadece Avrupa ile sınırlı tutmayıp Kuzey Amerika ve Asya pazarlarındaki büyük rehabilitasyon merkezlerine entegre etmek. 2026 yılı itibarıyla, giyilebilir robotların ev tipi modellerinin de onay süreçlerinden geçmesi bekleniyor. Bu, hastaların klinik ortam dışında da kendi başlarına egzersiz yapabilmelerine olanak tanıyacak.\n\nTeknolojik altyapıda kullanılan 'Active-Feedback' algoritmaları, her hastanın kas gücüne ve yorgunluk seviyesine göre direnç ayarlaması yapabiliyor. Bu kişiselleştirilmiş tedavi yaklaşımı, Wearable Robotics'i rakiplerinden ayıran en temel özellik. Yatırımcılar, şirketin sunduğu yazılım tabanlı tedavi protokollerinin veri odaklı başarısına büyük güven duyuyor.\n\nSağlık sigortası devlerinin de bu tür robotik sistemleri kapsama alma konusundaki istekliliği, sektörün büyüme potansiyelini katlıyor. Wearable Robotics, sadece bir donanım üreticisi değil, aynı zamanda rehabilitasyon verilerini analiz ederek doktorlara karar destek mekanizmaları sunan bir veri platformuna dönüşüyor. Geleceğin hastanelerinde her köşede bir robotik yardımcı görmek artık sürpriz olmayacak.\n\nSonuç olarak, 5 milyon Euro'luk bu başlangıç yatırımı, Wearable Robotics için sadece bir basamak. İnsan vücudunun limitlerini yapay zeka ile genişleten bu vizyon, nörolojik iyileşme süreçlerinde yeni bir altın standart belirliyor. Fiziksel robotik ve medikal zekanın birleşimi, milyonlarca insanın hayat kalitesini artıracak bir geleceğin kapılarını aralıyor.",
                "author": "GetInvestr Ekibi",
                "date": "06 Nisan 2026",
                "readMinutes": 8,
                "image": "/blog/wearable_main.png",
                "secondaryImages": [
                    "/blog/robotic_1.png",
                    "/blog/ai_1.png",
                    "/blog/waymo_3.png",
                    "/blog/wearable_main.png"
                ],
                "category": "HealthTech"
            },
            {
                "title": "Finansın Geleceği: Vestwell 385 Milyon Dolarlık Yatırımla KOBİ Tasarruflarını Dönüştürüyor",
                "content": "Fintech dünyası 2026'da yeni bir olgunluk evresine girdi. Sadece ödeme sistemleri değil, kurumsal tasarruf ve emeklilik (401k) altyapıları da dijital devrimden nasibini alıyor. Vestwell, B2B finansal altyapı çözümlerini küresel ölçekte genişletmek ve KOBİ'lerin çalışanlarına sunduğu finansal yan hakları modernize etmek için 385 milyon dolarlık rekor bir Seri D yatırımı aldığını duyurdu.\n\nVestwell'in başarısının temelinde, karmaşık ve eski (legacy) bankacılık sistemlerini modern bulut tabanlı API mimarileriyle değiştirmesi yatıyor. Bu altyapı sayesinde şirketler, çalışanlarına saniyeler içinde emeklilik planı oluşturabiliyor ve vergi avantajlı tasarruf modellerini yönetebiliyor. Sistemin arkasındaki yapay zeka moturu, her çalışanın finansal profiline göre optimize edilmiş yatırım önerileri sunuyor.\n\nBu devasa yatırımın stratejik hedefleri arasında, sadece ABD pazarı ile sınırlı kalmayıp Avrupa ve gelişmekte olan piyasalara 'finansal kapsayıcılık' getirmek bulunuyor. Özellikle KOBİ'lerin ağır operasyonel maliyetler nedeniyle uzak durduğu birçok finansal ürün, Vestwell sayesinde ulaşılabilir hale geliyor. Bu, global ekonominin bel kemiği olan küçük işletmeler için büyük bir rekabet avantajı demek.\n\nFintech yatırımcıları, 2026'nın seçici piyasa koşullarında Vestwell gibi kârlılık potansiyeli yüksek ve ölçeklenebilir altyapı şirketlerine yöneliyor. Şirketin yıllık bazda işlem hacmini %200 artırmış olması, fon yöneticilerini bu büyük tura ikna eden en güçlü veri oldu. Vestwell, artık sadece bir yazılım şirketi değil, bir finansal otoyol inşa edicisi konumunda.\n\nTeknolojik entegrasyon kabiliyeti, platformu rakiplerinden bir adım öne çıkarıyor. Vestwell, dünyanın en büyük bordro (payroll) ve İK yönetim sistemleriyle tam entegre çalışarak şirketlerin operasyonel yükünü sıfıra indiriyor. Bu 'görünmez finans' (invisible finance) modeli, son kullanıcının karmaşık işlemlerle uğraşmadan birikim yapabilmesini sağlıyor.\n\nÖzetle, 385 milyon dolarlık bu yatırım, tasarruf teknolojilerinin (SavingsTech) artık ana akım bir finansal güç olduğunu kanıtlıyor. Vestwell'in çizdiği yol haritası, gelecekte her bireyin ve her işletmenin bankalara bağımlılığını azaltarak kendi finansal kaderini teknoloji ile yönettiği bir dünya vaat ediyor.",
                "author": "GetInvestr Research",
                "date": "05 Nisan 2026",
                "readMinutes": 9,
                "image": "/blog/vestwell_main.png",
                "secondaryImages": [
                    "/blog/coins_1.png",
                    "/blog/ai_1.png",
                    "/blog/waymo_2.png",
                    "/blog/vestwell_main.png"
                ],
                "category": "Fintech"
            },
            {
                "title": "2026 Q1 Piyasa Nabzı: Küresel Girişim Sermayesinde 300 Milyar Dolarlık Tarihi Rekor",
                "content": "2026 yılının ilk çeyreği, teknoloji ve yatırım tarihine 'Büyük Konsolidasyon' ve 'Yapay Zeka Patlaması' olarak geçti. Küresel girişim sermayesi (VC) dünyası, yılın ilk üç ayında gerçekleşen toplam 300 milyar dolarlık fonlama ile tüm zamanların en yüksek çeyrek verisine ulaştı. Bu rakam, sadece bir büyüme göstergesi değil, aynı zamanda sermayenin kritik teknoloji alanlarında ne kadar derinlemesine yoğunlaştığının bir kanıtı.\n\nPazarın lokomotifi hiç kuşkusuz Yapay Zeka (AI) oldu. Toplam yatırımların %80'inden fazlası AI tabanlı girişimlere aktı. Ancak bu dönemde 'genel amaçlı' modellerden ziyade, Waymo gibi otonom sistemler veya endüstriyel robotik gibi 'fiziksel dünyaya dokunan' yapay zeka uygulamaları yatırımcıların iştahını en çok kabartan alanlar oldu.\n\nÇeyrek verilerinin en dikkat çekici yanı, sermaye konsantrasyonu. Toplam 300 milyar doların yaklaşık %65'i sadece dört dev isim tarafından toplandı: OpenAI (122 Milyar $), Anthropic (30 Milyar $), xAI (20 Milyar $) ve Waymo (16 Milyar $). Bu 'Goliath' tipi yatırım turları, küçük ölçekli girişimlerin fona erişimdeki zorluklarını artırırken, pazarın devler arasındaki bir teknoloji savaşına dönüştüğünü gösteriyor.\n\nBölgesel bazda bakıldığında, ABD dominasyonu devam etse de Avrupa ve Orta Doğu (MENA) bölgelerinin teknoloji hub'larında belirgin bir yükseliş gözlemlendi. Özellikle enerji ve iklim teknolojileri (Cleantech) alanındaki yatırımlar, mega AI turlarının ardından en büyük ikinci payı aldı. Yatırımcıların ESG (Çevresel, Sosyal, Yönetişim) kriterlerine bağlılığı, donanım odaklı deep-tech projelerinin de yüksek değerlemelerle fon bulmasını sağladı.\n\nExit (çıkış) stratejilerinde de 2026'nın ilk çeyreği umut verici oldu. Halka arz (IPO) piyasasının yeniden ısınması ve ikincil pazarların (secondary markets) kurumsallaşması, yatırımcılar için uzun süredir beklenen likidite penceresini araladı. Uzmanlar, Q1'deki bu devasa sermaye girişinin Q2 ve Q3'te büyük bir satın alma ve birleşme (M&A) dalgasını tetikleyeceğini öngörüyor.\n\nGenel değerlendirmede, 2026 Q1 piyasası bize şunu söylüyor: Artık 'büyüme odaklı' değil, 'altyapı ve verimlilik odaklı' bir yatırım çağındayız. 300 milyar dolarlık bu rekor, insanlığın teknolojik dönüşümünü finanse eden devasa bir motor gibi çalışmaya devam ediyor. Gelecek, bu sermayeyi doğru teknolojiyle buluşturanların olacak.",
                "author": "GetInvestr Research",
                "date": "04 Nisan 2026",
                "readMinutes": 12,
                "image": "/blog/recap_main.png",
                "secondaryImages": [
                    "/blog/coins_1.png",
                    "/blog/waymo_2.png",
                    "/blog/ai_1.png",
                    "/blog/recap_main.png"
                ],
                "category": "Piyasa Analizi"
            }
        ]
    else:
        new_posts = [
            {
                "title": "Autonomous Revolution: Waymo Secures $16 Billion in Q1 2026 Funding",
                "content": "2026 is shaping up to be the year autonomous vehicle technology moved from laboratories to become a staple of global urban transport. Waymo, under Google's parent company Alphabet, announced the closing of a massive $16 billion funding round aimed at expanding its driverless fleet to 20 new global metropolises. This record funding is a concrete demonstration that the company has proven its L4 autonomous driving capabilities on a commercial scale.\n\nTechnologically, Waymo has achieved near-zero error margins with its sixth-generation Lidar and sensor fusion systems. These next-gen sensors can perceive their surroundings with millimetric precision even in extreme weather. This technological edge ensures autonomous vehicles can operate safely not just on sunny California roads but also in heavy snow throughout Northern European cities.\n\nStrategic expansion plans see Waymo not only increasing its own vehicle production but also launching a software licensing model for global automotive giants. By terminal 2026, Waymo-branded robotaxis are targeted to be visible on streets in London, Berlin, Riyadh, and Tokyo. This expansion signals a fundamental shift that will shake traditional taxi and public transport models to their core.\n\nFor investors, Waymo's success stems from operational efficiency brought by the perfect harmony of hardware and software. The company took a giant step toward profitability by reducing operational costs by 40% compared to last year. Autonomous driving is no longer just 'hype' but a proven sector offering billions in annual return potential for investors.\n\nClose relationships with regulatory bodies are also critical factors that have cleared the path for this investment. Waymo transparently shared millions of miles of driving data to prove its autonomous systems are 70% safer than human drivers. This safety data has become the strongest argument convincing governments to accelerate autonomous vehicle legal frameworks.\n\nIn conclusion, this historic $16 billion investment makes it feel like the winner in the autonomous mobility world is now clear. Waymo is not just a technology company; it is taking confident steps toward becoming a core infrastructure provider for future smart cities. 2026 will be remembered as the year a new era of transport, with nobody at the wheel, officially began.",
                "author": "GetInvestr Research",
                "date": "April 06, 2026",
                "readMinutes": 10,
                "image": "/blog/waymo_main.png",
                "secondaryImages": [
                    "/blog/waymo_1.png",
                    "/blog/waymo_2.png",
                    "/blog/waymo_3.png",
                    "/blog/ai_1.png"
                ],
                "category": "Autonomous Systems"
            },
            {
                "title": "Human-Machine Sinergy: Wearable Robotics Breaks New Ground in HealthTech",
                "content": "Wearable technology and AI today are no longer just watches on our wrists. Italy-based Wearable Robotics successfully completed a 5 million Euro Series A round to globalize its exoskeleton systems, which are revolutionizing neuromotor rehabilitation. This development is seen as one of the most concrete and promising applications of 'Physical AI' in the healthcare sector.\n\nExoskeletons developed by Wearable Robotics not only enable paralyzed patients or those with neurological conditions to walk again but also, thanks to AI, detect the patient's movement intention within milliseconds to support motor skill development. Standing out for its carbon fiber structure and lightness, the system can accelerate long hospital rehabilitation processes by up to 50%.\n\nThe investment will focus on integrating this technology not just in Europe but into major rehabilitation centers in North American and Asian markets. By terminal 2026, home models of wearable robots are expected to go through approval processes. This will allow patients to exercise independently outside clinical environments.\n\n'Active-Feedback' algorithms used in the technological infrastructure can adjust resistance based on each patient's muscle strength and fatigue level. This personalized treatment approach is the most fundamental feature separating Wearable Robotics from its competitors. Investors have great trust in the data-driven success of the company's software-based treatment protocols.\n\nEagerness from health insurance giants to cover such robotic systems is multiplying the sector's growth potential. Wearable Robotics is not just a hardware manufacturer but is transforming into a data platform offering decision-support mechanisms to doctors by analyzing rehabilitation data. In hospitals of the future, seeing a robotic helper in every corner will no longer be a surprise.\n\nIn conclusion, this 5 million Euro Series A is just a stepping stone for Wearable Robotics. This vision of extending the limits of the human body with AI is setting a new gold standard in neurological recovery processes. The union of physical robotics and medical intelligence opens the door to a future increasing life quality for millions.",
                "author": "GetInvestr Team",
                "date": "April 06, 2026",
                "readMinutes": 8,
                "image": "/blog/wearable_main.png",
                "secondaryImages": [
                    "/blog/robotic_1.png",
                    "/blog/ai_1.png",
                    "/blog/waymo_3.png",
                    "/blog/wearable_main.png"
                ],
                "category": "HealthTech"
            },
            {
                "title": "The Future of Finance: Vestwell Transforms SME Savings with $385 Million Investment",
                "content": "The fintech world entered a new phase of maturity in 2026. Not just payment systems but corporate savings and retirement (401k) infrastructures are taking their share of the digital revolution. Vestwell announced the closing of a record $385 million Series D round to expand its B2B financial infrastructure solutions globally and modernize the financial benefits SMEs offer their employees.\n\nAt the core of Vestwell's success lies the replacement of complex and legacy banking systems with modern cloud-based API architectures. Thanks to this infrastructure, companies can create retirement plans and manage tax-advantaged savings models for employees in seconds. An AI engine powering the system provides investment recommendations optimized for each employee's financial profile.\n\nStrategic goals of this massive investment include bringing 'financial inclusion' not just to the US market but to Europe and emerging markets. Many financial products that SMEs avoided due to heavy operational costs become accessible through Vestwell. This means a huge competitive advantage for small businesses, the backbone of the global economy.\n\nFintech investors in 2026's selective market conditions are turning toward high-profit potential and scalable infrastructure companies like Vestwell. The company's 200% year-on-year transaction volume growth was the strongest data convincing fund managers of this large round. Vestwell is now positioned as a financial highway builder, not just a software company.\n\nTechnological integration capability puts the platform a step ahead of competitors. Vestwell works fully integrated with the world's largest payroll and HR management systems, reducing the operational burden on companies to zero. This 'invisible finance' model allows the end user to save without dealing with complex transactions.\n\nSummarily, this $385 million investment proves that savings technology (SavingsTech) is now a mainstream financial power. Vestwell's roadmap promises a world where every individual and business manages its own financial fate with technology, reducing dependence on banks.",
                "author": "GetInvestr Research",
                "date": "April 05, 2026",
                "readMinutes": 9,
                "image": "/blog/vestwell_main.png",
                "secondaryImages": [
                    "/blog/coins_1.png",
                    "/blog/ai_1.png",
                    "/blog/waymo_2.png",
                    "/blog/vestwell_main.png"
                ],
                "category": "Fintech"
            },
            {
                "title": "Q1 2026 Market Pulse: Historical $300 Billion Record in Global Venture Capital",
                "content": "The first quarter of 2026 went down in technology and investment history as the 'Great Consolidation' and 'AI Explosion.' The global venture capital (VC) world reached its highest ever quarterly data with a total of $300 billion in funding occurring in just the first three months of the year. This figure is not just a growth indicator but proof of how deeply capital is concentrating in critical technology areas.\n\nThe market locomotive was undoubtedly Artificial Intelligence (AI). More than 80% of total investments flowed into AI-based startups. However, during this period, investors' appetites were most whetted by 'physical-world' AI applications like Waymo's autonomous systems or industrial robotics, rather than just 'general-purpose' models.\n\nMost striking about the quarterly data is capital concentration. Approximately 65% of the total $300 billion was collected by just four giant names: OpenAI ($122 Billion), Anthropic ($30 Billion), xAI ($20 Billion), and Waymo ($16 Billion). These 'Goliath-type' investment rounds show the market is transforming into a technology war between giants while increasing funding accessibility difficulties for small-scale startups.\n\nRegionally, while US dominance continues, a clear rise was observed in technology hubs across Europe and the Middle East (MENA). Investments in energy and climate tech (Cleantech) took the second largest share after the mega AI rounds. Investor commitment to ESG (Environmental, Social, Governance) criteria ensured deep-tech hardware projects also found funding at high valuations.\n\nIn exit strategies, Q1 2026 was also promising. The reheating of the IPO market and the institutionalization of secondary markets opened the long-awaited liquidity window for investors. Experts predict this massive capital inflow in Q1 will trigger a large wave of acquisitions and mergers (M&A) in Q2 and Q3.\n\nOverall, the Q1 2026 market tells us this: We are now in an investment era focused on 'infrastructure and efficiency,' not just 'growth.' This record $300 billion works like a massive engine financing humanity's technological transformation. The future will belong to those who match this capital with the right technology.",
                "author": "GetInvestr Research",
                "date": "April 04, 2026",
                "readMinutes": 12,
                "image": "/blog/recap_main.png",
                "secondaryImages": [
                    "/blog/coins_1.png",
                    "/blog/waymo_2.png",
                    "/blog/ai_1.png",
                    "/blog/recap_main.png"
                ],
                "category": "Market Analysis"
            }
        ]
        
    for p in new_posts:
        max_id += 1
        p['id'] = max_id
        
    # Prepend new posts
    data['landing']['blog']['posts'] = new_posts + data['landing']['blog']['posts']
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

update_json('tr', r'c:\Users\Yasin AKSOY\Yatırımcı platformu\investr\i18n\messages\tr.json')
update_json('en', r'c:\Users\Yasin AKSOY\Yatırımcı platformu\investr\i18n\messages\en.json')
print("Successfully prepended 4 new ultra-detailed posts (6 paragraphs + 4 images each).")
