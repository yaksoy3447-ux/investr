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
                "title": "2025 Yılında Türkiye Startup Ekosistemi 1,4 Milyar Dolar Yatırım Aldı",
                "content": "KPMG Türkiye ve 212 iş birliğiyle hazırlanan 'Türkiye Startup Yatırımları' raporu yayınlandı. Rapora göre, Türkiye startup ekosistemi 2025 yılında toplam 360 işlemle 1,4 milyar dolar yatırım almayı başardı.\n\nMega ölçekli yatırım turlarının veya 'decacorn' statüsüne ulaşan girişimlerin yokluğuna rağmen, bu rakam pazarın dayanıklılığını ve büyüme potansiyelini bir kez daha kanıtladı. Uzmanlar, küresel ekonomik daralmanın yaşandığı bu dönemde yatırımcıların daha seçici davrandığını, ancak iş modeli sağlam girişimlere olan ilginin azalmadığını vurguluyor.\n\nÖzellikle erken aşama (seed) yatırımlarda hareketliliğin devam ettiği pazarda, GetInvestr gibi platformların melek yatırımcı ve VC'lere erişimi kolaylaştırmasının ekosistem büyümesine ivme kazandırması bekleniyor.",
                "author": "GetInvestr Ekibi",
                "date": "29 Mart 2026",
                "readMinutes": 3,
                "image": "/blog/turkiye_yatirim_2026.png",
                "category": "Ekosistem"
            },
            {
                "title": "Türkiye Fintech Sektöründe Mega Büyüme: 2025'te 214 Milyon Dolar Yatırım",
                "content": "Türkiye'de finansal teknolojiler (Fintech) sektörü, yatırım ekosisteminin lokomotifi olmaya devam ediyor. Açıklanan son verilere göre fintech girişimleri, geçtiğimiz yıl boyunca toplam 214 milyon dolar yatırım çekerek en çok fonlanan sektörlerin başında geldi.\n\nSektörün ulaştığı olgunluk seviyesi, yatırımcıların dijital cüzdan, gömülü finans (embedded finance), B2B ödeme çözümleri ve regtech (düzenleyici teknolojiler) alanlarına yönelik ilgisini yansıtıyor. Açık bankacılık düzenlemelerinin de etkisiyle, pazardaki oyuncuların sayısı hızla artarken inovasyon daha tabana yayılıyor.\n\nYabancı VC'lerin (Venture Capital) Türk fintech'lerine olan ilgisi de giderek büyüyor. GetInvestr verilerine göre, global yatırım fonlarının Türkiye merkezli finansal teknoloji şirketleriyle kurduğu etkileşim son bir yılda iki katına çıkmış durumda.",
                "author": "GetInvestr Ekibi",
                "date": "28 Mart 2026",
                "readMinutes": 4,
                "image": "/blog/fintech_buyume_2026.png",
                "category": "Fintech"
            },
            {
                "title": "Global AI Yatırımları Mart 2026'da Zirve Yaptı: Yeni Trend 'Ajan (Agent)' Teknolojileri",
                "content": "2026 yılının ilk çeyreğini geride bırakırken, küresel girişim sermayesi (VC) dünyasında Yapay Zeka rüzgarı esmeye devam ediyor. Yalnızca Mart ayının son haftasında bile yapay zeka altyapısına odaklanan startuplar milyonlarca dolar fon aldı.\n\nÖne çıkan yatırımlar arasında, AI destekli kişisel hafıza platformu Littlebird'ün 11 milyon dolarlık, AI tabanlı insan kaynakları (HCM) yazılımı Novaworks'ün 8 milyon dolarlık ve yapay zeka tasarım ajanı Moda'nın 7.5 milyon dolarlık tohum (seed) yatırımları bulunuyor.\n\nYatırımcıların odak noktası değişiyor: Artık mevcut ürünlere basit AI özellikleri ekleyen girişimler yerine, yapay zekayı iş akışlarını uçtan uca otomatize etmek (AI Agents) için kullanan çekirdek (core) teknoloji girişimleri daha yüksek yatırım değerlemeleriyle fona ulaşıyor.",
                "author": "GetInvestr Research",
                "date": "27 Mart 2026",
                "readMinutes": 5,
                "image": "/blog/ai_yatirim_2026.png",
                "category": "Global Yatırım"
            },
            {
                "title": "İklim Teknolojilerine (Cleantech) İlgi Büyüyor: Helix Earth 12 Milyon Dolar Tohum Yatırımı Aldı",
                "content": "Sürdürülebilirlik ve karbon emisyonu azaltma hedefleri, girişimcilik ekosisteminde yeni fırsatlar yaratırken VC'lerin radarı Enerji ve İklim Teknolojileri'ne (Cleantech) dönmüş durumda.\n\nMart ayının en büyük tohum turlarından birini gerçekleştiren Helix Earth, HVAC sistemlerinin enerji verimliliğini dönüştürmek amacıyla 12 milyon dolar tutarında aşırı talep gören (oversubscribed) bir tohum yatırım (Seed 2) aldı.\n\nDonanım odaklı girişimlerin yatırım almasının genellikle yazılıma (SaaS) kıyasla daha zor olduğu düşünülse de, iklim kriziyle mücadele eden ve somut çözümler sunan 'DeepTech' girişimleri rekor seviyelerde fon toplamayı sürdürüyor. Yatırımcıların ESG (Çevresel, Sosyal, Yönetişim) kriterlerini portföylerinde ön sıralara alması, önümüzdeki çeyreklerde cleantech ve enerji startuplarına akacak sermayenin katlanarak artacağına işaret ediyor.",
                "author": "GetInvestr Research",
                "date": "26 Mart 2026",
                "readMinutes": 3,
                "image": "/blog/cleantech_enerji_2026.png",
                "category": "Cleantech & DeepTech"
            }
        ]
    else:
        new_posts = [
            {
                "title": "Turkish Startup Ecosystem Raised $1.4 Billion in 2025",
                "content": "According to the newly published 'Turkey Startup Investments' report in collaboration with KPMG Turkey and 212, the Turkish startup ecosystem successfully raised a total of $1.4 billion across 360 investments in 2025.\n\nDespite the absence of mega-rounds or newly minted decacorns, this figure once again proved the resilience and strong growth potential of the market. Experts highlight that while investors have become more selective during periods of global economic tightening, interest in startups with solid, proven business models remains unwavering.\n\nThe ecosystem is witnessing continued activity, especially in early-stage (seed) investments. Platforms like GetInvestr are expected to further accelerate early-stage growth by bridging the gap between innovative founders and active angel networks or VCs globally.",
                "author": "GetInvestr Team",
                "date": "March 29, 2026",
                "readMinutes": 3,
                "image": "/blog/turkiye_yatirim_2026.png",
                "category": "Ecosystem"
            },
            {
                "title": "Mega Growth in Fintech: $214 Million Investment in Turkey",
                "content": "Financial technology (Fintech) continues to be the locomotive of the investment ecosystem in Turkey. According to recent data, fintech startups attracted $214 million in funding last year, ranking among the top verticals.\n\nThis maturity level reflects investors' growing interest in digital wallets, embedded finance, B2B payment solutions, and regulatory technologies (regtech). Supported by open banking regulations, the number of innovative players is scaling fast across the market.\n\nForeign VCs' engagement with Turkish fintech is also snowballing. GetInvestr data reveals that interactions between global investment funds and Turkey-based fintech companies have doubled over the past year.",
                "author": "GetInvestr Team",
                "date": "March 28, 2026",
                "readMinutes": 4,
                "image": "/blog/fintech_buyume_2026.png",
                "category": "Fintech"
            },
            {
                "title": "Global AI Funding Peaks in March 2026: The Rise of 'Agentic' Technologies",
                "content": "As we close the first quarter of 2026, the Artificial Intelligence frenzy continues unabated in the global VC landscape. In the final week of March alone, startups focusing on AI infrastructure raised millions.\n\nStandout seed investments included AI personal memory platform Littlebird ($11M), AI-native Human Capital Management platform Novaworks ($8M), and AI design agent Moda ($7.5M).\n\nInvestors are fundamentally shifting their thesis: Rather than funding startups that simply bolt AI features onto existing products, capital is aggressively flowing toward core technologies utilizing AI to automate end-to-end workflows (AI Agents) and disrupt traditional paradigms.",
                "author": "GetInvestr Research",
                "date": "March 27, 2026",
                "readMinutes": 5,
                "image": "/blog/ai_yatirim_2026.png",
                "category": "Global Investment"
            },
            {
                "title": "Cleantech Surtge: Helix Earth Secures $12 Million Seed Funding",
                "content": "Sustainability and carbon reduction goals are creating lucrative new opportunities in the startup ecosystem, shifting the VC radar heavily toward Energy and Climate Tech (Cleantech).\n\nIn one of March's largest seed rounds, Helix Earth secured $12 million in an oversubscribed Seed 2 round to transform HVAC energy efficiency.\n\nWhile hardware-focused startups are generally perceived as harder to fund compared to SaaS, 'DeepTech' ventures tackling the severe climate crisis with tangible solutions are breaking funding records. The growing emphasis on ESG (Environmental, Social, Governance) criteria ensures that capital allocated to cleantech and energy startups will multiply in the coming quarters.",
                "author": "GetInvestr Research",
                "date": "March 26, 2026",
                "readMinutes": 3,
                "image": "/blog/cleantech_enerji_2026.png",
                "category": "Cleantech & DeepTech"
            }
        ]
        
    for p in new_posts:
        max_id += 1
        p['id'] = max_id
        
    data['landing']['blog']['posts'].extend(new_posts)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

update_json('tr', r'c:\Users\Yasin AKSOY\Yatırımcı platformu\investr\i18n\messages\tr.json')
update_json('en', r'c:\Users\Yasin AKSOY\Yatırımcı platformu\investr\i18n\messages\en.json')
print("Successfully appended 4 new posts localized in TR and EN.")
