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
                "title": "Biyoteknoloji Devrimi: BioGenic, Yapay Zeka Destekli Sentetik Biyoloji İçin 210 Milyon Dolar Topladı",
                "content": "2026 yılının en heyecan verici yatırım haberlerinden biri biyoteknoloji dünyasından geldi. BioGenic, moleküler biyoloji ile yapay zekayı birleştiren sentetik biyoloji platformunu küreselleştirmek amacıyla 210 milyon dolarlık devasa bir Seri B yatırım turunu tamamladı. Bu fonlama, ilaç geliştirme süreçlerinin dijitalleşmesi ve biyolojik tasarımın bir mühendislik disiplinine dönüşmesi yolunda dev bir adımı temsil ediyor.\n\nBioGenic'in geliştirdiği yapay zeka motoru, yeni molekülleri ve ilaç adaylarını geleneksel yöntemlere göre 10 kat daha hızlı tasarlayabiliyor. Eskiden yıllar süren laboratuvar simülasyonları, şirketin otonom 'bio-lab' birimlerinde artık aylar hatta haftalar içinde sonuçlanıyor. Bu hız, nadir hastalıklar ve kronik rahatsızlıklar için geliştirilen tedavilerin maliyetlerini de dramatik şekilde düşürüyor.\n\nYatırımın ana odağı, kişiselleştirilmiş tıp (personalized medicine) alanında yeni standartlar belirlemek. BioGenic, her hastanın kendi genetik yapısına özel olarak tasarlanan sentetik tedavilerin üretim kapasitesini artırmayı hedefliyor. 2026 sonuna kadar ABD ve Avrupa'da tam donanımlı 5 yeni otonom üretim merkezi açılması planlanıyor.\n\nVC (Venture Capital) dünyası için BioGenic'in başarısı, biyoteknolojinin artık bir 'yazılım' sektörü kadar ölçeklenebilir hale geldiğini kanıtlıyor. Yatırımcılar, şirketin sunduğu dijital biyoloji platformunun yıllık bazda %300 büyüme potansiyeline sahip olduğunu vurguluyor. Biyoteknoloji, 2026'nın en çok kazandıran yatırım temalarından biri olmaya aday.\n\nTeknolojik altyapıda kullanılan 'Generative Bio-Models', doğada bulunmayan ancak belirli hastalıkları hedefleyen tamamen yeni protein yapıları 'icat' edebiliyor. Bu yaratıcı potansiyel, tıp dünyasında 'tedavi edilemez' denilen hastalıklar için yepyeni bir umut ışığı yakıyor. BioGenic, sadece bir ilaç şirketi değil, biyolojinin 'kodunu' yeniden yazan bir teknoloji devi olma yolunda ilerliyor.\n\nÖzetle, 210 milyon dolarlık bu yatırım, sentetik biyolojinin küresel ekonominin ana sütunlarından biri haline geldiğinin ilanıdır. İnsan sağlığının geleceği artık laboratuvar tüplerinden çok, yapay zekanın işlediği karmaşık biyolojik verilerde şekilleniyor. BioGenic, bu yeni çağın mimarlarından biri olarak tarih yazmaya devam ediyor.",
                "author": "GetInvestr Research",
                "date": "07 Nisan 2026",
                "readMinutes": 12,
                "image": "/blog/biogenic_main.png",
                "secondaryImages": [
                    "/blog/biogenic_1.png",
                    "/blog/biogenic_2.png",
                    "/blog/biogenic_3.png",
                    "/blog/biogenic_4.png"
                ],
                "category": "Biyoteknoloji"
            },
            {
                "title": "Enerji Altyapısında Yapay Zeka: GridNext 85 Milyon Dolar Seri C Yatırımı Aldı",
                "content": "Yapay zeka devriminin en büyük kısıtlayıcısı olan enerji ihtiyacı, GridNext gibi yenilikçi altyapı girişimleriyle aşılıyor. Şirket, enerji şebekelerini otonom hale getiren ve veri merkezlerinin güç ihtiyacını optimize eden yazılım çözümleri için 85 milyon dolarlık Seri C yatırım turunu kapattı. Bu fonlama, 2026'nın en kritik teması olan 'Sürdürülebilir AI Altyapısı' için dönüm noktası niteliğinde.\n\nGridNext'in geliştirdiği otonom dağıtım sistemi, rüzgar ve güneş gibi yenilenebilir enerji kaynaklarını gerçek zamanlı olarak dengeliyor. Geleneksel şebekelerin aksine, yapay zeka destekli bu sistem, enerji dalgalanmalarını önceden tahmin ederek kesintisiz bir güç akışı sağlıyor. Bu teknoloji, özellikle giga-ölçekli veri merkezleri için enerji maliyetlerini %25 oranında düşürüyor.\n\nEndüstriyel uygulamalarda GridNext, geleceğin akıllı fabrikalarının ana enerji yöneticisi konumuna geliyor. Şirket, üretim hatlarındaki enerji tüketim verilerini analiz ederek en küçük verimlilik kayıplarını bile tespit edebiliyor. 2026 yılı itibarıyla, GridNext platformunun global çapta 50'den fazla endüstriyel tesiste aktif olarak kullanılması hedefleniyor.\n\nSürdürülebilirlik hedefleri, GridNext'in yatırımcıları ikna etmesindeki en güçlü argümanlardan biri oldu. Şirket, enerji şebekelerindeki karbon emisyonunu optimize eden algoritmalarıyla 'Net-Zero' hedeflerine doğrudan katkı sağlıyor. Yatırımcılar için GridNext, hem kârlılık hem de ESG (Çevresel, Sosyal, Yönetişim) kriterlerinde mükemmel bir uyum sunuyor.\n\nTeknolojik altyapı, merkezsiz (decentralized) bir enerji yönetim modelini savunuyor. GridNext, mikro-şebekelerin (micro-grids) birbiriyle 'konuşmasını' sağlayarak yerel enerji krizlerini global bir çözüme dönüştürüyor. Bu ağ etkisi, enerji güvenliğinin ulusal bir beka meselesi olduğu 2026 dünyasında stratejik bir değer taşıyor.\n\nSonuç olarak, 85 milyon dolarlık bu yatırım, GridNext'i 'Enerjinin Yapay Zekası' olarak konumlandırıyor. Veri merkezlerinden fabrikalara kadar her alanın kesintisiz ve temiz güce ihtiyaç duyduğu bu yeni dünyada, GridNext'in inşa ettiği otonom altyapı, refahın ve büyümenin anahtarı olacaktır.",
                "author": "GetInvestr Ekibi",
                "date": "07 Nisan 2026",
                "readMinutes": 9,
                "image": "/blog/gridnext_main.png",
                "secondaryImages": [
                    "/blog/gridnext_1.png",
                    "/blog/gridnext_2.png",
                    "/blog/gridnext_3.png",
                    "/blog/gridnext_4.png"
                ],
                "category": "Altyapı"
            },
            {
                "title": "B2B Ödemelerde Yeni Çağ: PayZero 45 Milyon Dolarlık Seri B Yatırımıyla Globalleşiyor",
                "content": "Fintech dünyası, geleneksel bankacılık sistemlerinin yavaşlığına karşı en güçlü hamlesini PayZero ile yapıyor. Şirket, sınır ötesi B2B ödemeleri anlık (real-time) hale getiren global altyapısını genişletmek amacıyla 45 milyon dolarlık Seri B yatırım aldığını duyurdu. Bu yatırım, geleneksel SWIFT tabanlı sistemlerin artık günümüzün hızlı iş dünyasına yetmediğinin en net göstergesi.\n\nPayZero'nun platformu, işletmelerin dünyanın herhangi bir yerindeki tedarikçilerine saniyeler içinde ödeme yapabilmesini sağlıyor. Eskiden günlerce süren ve yüksek komisyonlarla karşılaşılan para transferleri, şirketin 'Instant-Settlement' teknolojisiyle şeffaf ve düşük maliyetli bir sürece dönüşüyor. Bu hız, özellikle global ticaret yapan KOBİ'lerin işletme sermayesi döngüsünü inanılmaz oranda iyileştiriyor.\n\nGüvenlik ve regülasyon uyumu, PayZero'nun en güçlü olduğu alanların başında geliyor. Şirket, her işlemde yapay zeka destekli sahtecilik tespiti ve uyum kontrolü yaparak global finansın katı kurallarına tam uyum sağlıyor. 2026 sonuna kadar Orta Doğu ve Asya-Pasifik bölgelerinde 20 yeni pazarın finansal sistemine entegre olunması hedefleniyor.\n\nYatırımcılar için PayZero, finansın 'görünmez altyapısını' inşa eden en umut verici fintech girişimlerinden biri. Şirketin sunduğu API tabanlı mimari, modern ERP (Kurumsal Kaynak Planlama) sistemleriyle mükemmel bir uyum içinde çalışıyor. Bu teknolojik sadelik, PayZero'nun kurumsal adaptasyon hızını rakiplerine göre iki katına çıkarıyor.\n\nStratejik büyüme planları kapsamında, PayZero sadece para transferi değil, aynı zamanda 'akıllı fatura yönetimi' ve 'otonom borçlanma' gibi yeni finansal araçları da platformuna ekliyor. İşletmeler artık sadece para göndermekle kalmayıp, nakit akışlarını yapay zeka ile optimize edebilecekler. Bu dönüşüm, fintech sektöründe 'B2B bankacılığı' kavramını yeniden tanımlıyor.\n\nÖzetle, 45 milyon dolarlık bu yatırım, PayZero'yu küresel ticaretin yeni finansal otoyolu haline getiriyor. Sınırların kalktığı ama finansal engellerin hala durduğu bir dünyada, PayZero'nun sunduğu özgürlük, işletmelerin büyüme sınırlarını ortadan kaldıracaktır.",
                "author": "GetInvestr Research",
                "date": "07 Nisan 2026",
                "readMinutes": 8,
                "image": "/blog/payzero_main.png",
                "secondaryImages": [
                    "/blog/payzero_1.png",
                    "/blog/payzero_2.png",
                    "/blog/payzero_3.png",
                    "/blog/payzero_4.png"
                ],
                "category": "Fintech"
            },
            {
                "title": "Akıllı Şehirlerin Beyni: UrbanFlow AI, 12 Milyon Dolar Tohum Yatırımıyla Trafiği Otonomlaştırıyor",
                "content": "Geleceğin şehirlerini yönetmek artık sadece asfalt dökmek değil, veriyi doğru işlemekten geçiyor. UrbanFlow AI, şehir içi trafiği ve altyapıyı bir 'canlı organizma' gibi yöneten otonom sistemini hayata geçirmek için 12 milyon dolarlık rekor bir tohum yatırım aldığını açıkladı. Bu girişim, trafik ışıklarından çok daha fazlasını hedefleyen bir 'merkezi zeka' projesi.\n\nUrbanFlow AI'ın geliştirdiği sistem, trafik yoğunluğunu sadece takip etmekle kalmıyor, aynı zamanda merkezi olmayan (decentralized) bir akış kontrolüyle trafiği anlık olarak yönlendiriyor. Waymo ve diğer otonom araç ağlarıyla doğrudan iletişim kuran sistem, araçların birbiriyle ve şehirle senkronize hareket etmesini sağlıyor. Yapılan ilk testlerde, şehir içi ulaşım sürelerinde %40'a varan düşüşler kaydedildi.\n\nKentsel yaşam kalitesi üzerindeki etkisi, yatırımcıları ikna eden temel faktörlerden biri oldu. Daha az trafik, sadece zaman tasarrufu değil, aynı zamanda daha düşük yakıt tüketimi ve temiz bir hava demek. UrbanFlow AI, şehir sakinlerinin her gün trafikte boşa geçen saatlerini onlara geri vermeyi vaat eden bir 'zaman teknolojisi' girişimi olarak öne çıkıyor.\n\nVeri gizliliği ve 'Sovereign City' (Egemen Şehir) modeli, UrbanFlow'un mimarisinin kalbinde yer alıyor. Şehir yönetimleri, vatandaşların verilerini anonim kalarak işleyen ve yerel yönetimlerin kontrolünde kalan bir veri yönetim modeline kavuşuyor. Bu yaklaşım, teknoloji ile özgürlük arasındaki hassas dengenin korunmasını sağlıyor.\n\n2026 yılı sonu itibarıyla, UrbanFlow AI sisteminin üç büyük metropolün pilot bölgesinde tam kapasite ile devreye alınması planlanıyor. Tohum aşamasındaki bir girişimin bu kadar kısa sürede hayalden gerçeğe dönmesi, kentsel dönüşüm teknolojilerine (UrbanTech) olan küresel ilginin bir yansıması. Şehirler artık daha akıllı, daha hızlı ve daha yaşanabilir hale geliyor.\n\nSonuç olarak, 12 milyon dolarlık bu tohum yatırımı, UrbanFlow AI'ı geleceğin otonom şehirlerinin 'beyni' olmaya bir adım daha yaklaştırıyor. 2030 yılına kadar 'sıfır trafik sıkışıklığı' hedefine ulaşmak için atılan bu adım, modern şehircilik anlayışında devrim niteliğinde bir dönüm noktasıdır.",
                "author": "GetInvestr Research",
                "date": "07 Nisan 2026",
                "readMinutes": 10,
                "image": "/blog/urbanflow_main.png",
                "secondaryImages": [
                    "/blog/urbanflow_1.png",
                    "/blog/urbanflow_2.png",
                    "/blog/urbanflow_3.png",
                    "/blog/urbanflow_4.png"
                ],
                "category": "UrbanTech"
            }
        ]
    else:
        new_posts = [
            {
                "title": "Biotech Revolution: BioGenic Raises $210 Million for AI-Driven Synthetic Biology",
                "content": "One of the most exciting investment stories of 2026 comes from the biotech world. BioGenic completed a massive $210 million Series B funding round to globalize its synthetic biology platform that combines molecular biology with artificial intelligence. This funding represents a giant step toward the digitalization of drug development and the transformation of biological design into an engineering discipline.\n\nThe AI engine developed by BioGenic can design new molecules and drug candidates 10 times faster than traditional methods. Lab simulations that used to take years are now completed in months or even weeks in the company's autonomous 'bio-lab' units. This speed drastically reduces the costs of treatments developed for rare diseases and chronic conditions.\n\nThe investment aims to set new standards in personalized medicine. BioGenic wants to increase the production capacity of synthetic treatments designed specifically for each patient's genetic structure. Plans include opening 5 new fully equipped autonomous production centers in the US and Europe by terminal 2026.\n\nFor the VC world, BioGenic's success proves that biotechnology is now as scalable as a software sector. Investors emphasize that the digital biology platform has a 300% year-on-year growth potential. Biotech is set to be one of the most profitable investment themes of 2026.\n\n'Generative Bio-Models' used in the infrastructure can 'invent' entirely new protein structures that do not exist in nature but target specific diseases. This creative potential lights a new fire of hope for diseases labeled 'incurable' in medicine. BioGenic is progressing toward becoming a technology giant rewriting the 'code' of biology, not just a pharmaceutical company.\n\nIn summary, this $210 million investment marks synthetic biology as a core pillar of the global economy. The future of human health is shaped more by complex biological data processed by AI than by test tubes. BioGenic continues to make history as one of the architects of this new era.",
                "author": "GetInvestr Research",
                "date": "April 07, 2026",
                "readMinutes": 12,
                "image": "/blog/biogenic_main.png",
                "secondaryImages": [
                    "/blog/biogenic_1.png",
                    "/blog/biogenic_2.png",
                    "/blog/biogenic_3.png",
                    "/blog/biogenic_4.png"
                ],
                "category": "Biotechnology"
            },
            {
                "title": "AI in Energy Infrastructure: GridNext Secures $85 Million Series C Investment",
                "content": "Energy needs, the biggest limiter of the AI revolution, are being overcome by innovative infrastructure startups like GridNext. The company closed an $85 million Series C round for its software solutions that autonomize power grids and optimize the needs of data centers. This funding is a turning point for 'Sustainable AI Infrastructure,' the most critical theme of 2026.\n\nGridNext's autonomous distribution system real-time balances renewable energy sources like wind and solar. Unlike traditional grids, this AI-driven system anticipates energy fluctuations to ensure uninterrupted power. This technology reduces energy costs by 25% for giga-scale data centers.\n\nIn industrial applications, GridNext is becoming the main energy manager for smart factories of the future. The company analyzes usage data on production lines to detect even the smallest efficiency losses. By terminal 2026, the platform is targeted for active use in over 50 industrial facilities globally.\n\nSustainability goals were one of the strongest arguments convincing GridNext's investors. The company contributed directly to 'Net-Zero' goals with algorithms optimizing carbon emissions in grids. For investors, GridNext offers a perfect match in both profitability and ESG criteria.\n\nThe infrastructure advocates for a decentralized energy management model. GridNext turns local energy crises into global solutions by allowing micro-grids to 'talk' to each other. This network effect carries strategic value in the 2026 world, where energy security is a matter of national survival.\n\nIn conclusion, this $85 million investment positions GridNext as the 'AI of Energy.' In this new world where every field from data centers to factories needs interrupted and clean power, the autonomous infrastructure built by GridNext will be the key to prosperity and growth.",
                "author": "GetInvestr Team",
                "date": "April 07, 2026",
                "readMinutes": 9,
                "image": "/blog/gridnext_main.png",
                "secondaryImages": [
                    "/blog/gridnext_1.png",
                    "/blog/gridnext_2.png",
                    "/blog/gridnext_3.png",
                    "/blog/gridnext_4.png"
                ],
                "category": "Infrastructure"
            },
            {
                "title": "A New Era in B2B Payments: PayZero Globalizes with $45 Million Series B Investment",
                "content": "The fintech world makes its strongest move against slow traditional banking systems with PayZero. The company announced a $45 million Series B to expand its global infrastructure that makes cross-border B2B payments real-time. This investment is the clearest sign that traditional SWIFT-based systems are no longer sufficient for today's fast business world.\n\nPayZero's platform allows businesses to pay suppliers anywhere in the world in seconds. Money transfers that used to take days and face high commissions transform into a transparent and low-cost process with the company's 'Instant-Settlement' technology. This speed incredibly improves the working capital cycle of SMEs trading globally.\n\nSecurity and regulatory compliance are areas where PayZero is strongest. The company ensures full compliance with global finance's strict rules by using AI-driven fraud detection and compliance checks for every transaction. Integration into systems in 20 new markets across MENA and Asia-Pacific is targeted by terminal 2026.\n\nFor investors, PayZero is one of the most promising fintech startups building the 'invisible infrastructure' of finance. The API-based architecture offered works in perfect harmony with modern ERP systems. This simplicity doubles PayZero's corporate adoption speed compared to competitors.\n\nStrategic expansion plans also include adding 'smart invoice management' and 'autonomous borrowing' tools to the platform. Businesses will no longer just send money but can optimize cash flows with AI. This transformation redefines 'B2B banking' in the fintech sector.\n\nSummarily, this $45 million investment makes PayZero the new financial highway for global trade. In a world where borders are gone but financial barriers remain, the freedom PayZero offers will remove growth limits for businesses.",
                "author": "GetInvestr Research",
                "date": "April 07, 2026",
                "readMinutes": 8,
                "image": "/blog/payzero_main.png",
                "secondaryImages": [
                    "/blog/payzero_1.png",
                    "/blog/payzero_2.png",
                    "/blog/payzero_3.png",
                    "/blog/payzero_4.png"
                ],
                "category": "Fintech"
            },
            {
                "title": "Brain of Smart Cities: UrbanFlow AI Autonomizes Traffic with $12 Million Seed Funding",
                "content": "Managing cities of the future is no longer about just laying asphalt; it's about processing data correctly. UrbanFlow AI announced a record $12 million seed round to realize its autonomous system that manages city traffic and infrastructure like a 'living organism.' This project targets much more than just traffic lights; it's a 'central intelligence' project.\n\nUrbanFlow AI's system not only tracks density but directs traffic real-time with decentralized flow control. Communicating directly with Waymo and other autonomous vehicle networks, the system ensures vehicles move in sync with each other and the city. Initial tests recorded up to 40% drops in urban travel times.\n\nImpact on urban life quality was a key factor convincing investors. Less traffic means not just time savings but lower fuel consumption and cleaner air. UrbanFlow AI stands out as a 'time technology' startup promising to give residents back hours wasted in traffic every day.\n\nData privacy and the 'Sovereign City' model lie at the heart of UrbanFlow's architecture. City governments gain a data management model where citizen data is processed anonymously and remains under local control. This approach ensures the delicate balance between technology and freedom is maintained.\n\nBy terminal 2026, UrbanFlow AI target full-capacity deployment in pilot zones of three major metropolises. For a seed startup to turn from dream to reality so quickly reflects global interest in UrbanTech. Cities are becoming smarter, faster, and more livable.\n\nIn conclusion, this $12 million seed investment brings UrbanFlow AI one step closer to being the 'brain' of future autonomous cities. This step toward 'zero traffic congestion' by 2030 is a revolutionary turning point in modern urbanism.",
                "author": "GetInvestr Research",
                "date": "April 07, 2026",
                "readMinutes": 10,
                "image": "/blog/urbanflow_main.png",
                "secondaryImages": [
                    "/blog/urbanflow_1.png",
                    "/blog/urbanflow_2.png",
                    "/blog/urbanflow_3.png",
                    "/blog/urbanflow_4.png"
                ],
                "category": "UrbanTech"
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
print("Successfully prepended 4 new ultra-detailed posts for April 7, 2026.")
