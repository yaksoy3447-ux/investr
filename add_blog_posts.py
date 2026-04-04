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
                "title": "2026'nın İlk Çeyreğinde Küresel Girişim Sermayesi 300 Milyar Dolara Ulaştı",
                "content": "2026 yılının ilk üç ayı, teknoloji dünyasında tarihi bir dönüm noktası oldu. Yapay zeka yatırımlarının başı çektiği süreçte, küresel çapta toplamda 300 milyar doların üzerinde fon girişimlerle buluştu. OpenAI'ın devasa fonlama turu bu büyümenin ana motoruyken, Anthropic ve xAI gibi devler de milyarlarca dolarlık yeni yatırımlar kapattı. Yatırımcılar artık sadece AI uygulamalarına değil, veri merkezleri ve özel yarı iletkenler gibi altyapı katmanlarına devasa sermayeler ayırıyor.",
                "author": "GetInvestr Research",
                "date": "03 Nisan 2026",
                "readMinutes": 3,
                "image": "/blog/global_funding_2026.png",
                "category": "Küresel Yatırım"
            },
            {
                "title": "Finans Dünyasında Dev Satın Alma: Capital One, Brex'i 5,15 Milyar Dolara Bünyesine Katıyor",
                "content": "Fintech ekosistemi, 2026'nın en büyük birleşme haberlerinden biriyle sarsıldı. Bankacılık devi Capital One, popüler kurumsal harcama yönetimi platformu Brex'i 5,15 milyar dolar bedelle satın alacağını duyurdu. Bu stratejik hamle, geleneksel bankalar ile çevik fintech platformları arasındaki sınırların giderek belirsizleştiğini gösteriyor. Satın almanın ardından Brex'in inovatif finansal araçlarının Capital One'ın KOBİ bankacılığı operasyonlarına entegre edilmesi bekleniyor.",
                "author": "GetInvestr Ekibi",
                "date": "02 Nisan 2026",
                "readMinutes": 4,
                "image": "/blog/capital_one_brex_2026.png",
                "category": "Fintech"
            },
            {
                "title": "Yapay Zeka Destekli Finansal Altyapı: Cloak, B Serisinde 375 Milyon Dolar Topladı",
                "content": "Fintech güvenliğine odaklanan 'AI-Native' girişim Cloak, B serisi yatırım turunda 375 milyon dolar fon sağlayarak piyasa değerlemesini milyar doların üzerine taşıdı. 2026'da hız kazanan 'fiziksel-dijital AI' ve 'güvenli finansal raylar' trendinin en güçlü temsilcilerinden biri olan Cloak, finansal verilerin korunması ve otonom dolandırıcılık tespiti alanında yeni bir standart belirliyor. Şirket, bu fonu küresel genişleme ve Ar-Ge çalışmaları için kullanacak.",
                "author": "GetInvestr Research",
                "date": "01 Nisan 2026",
                "readMinutes": 5,
                "image": "/blog/cloak_security_2026.png",
                "category": "AI Güvenlik"
            }
        ]
    else:
        new_posts = [
            {
                "title": "Global Venture Funding Hits Record $300 Billion in Q1 2026",
                "content": "The first quarter of 2026 marked a historic milestone for the technology world. Driven by the AI boom, global venture capital funding surpassed $300 billion in just three months. While OpenAI's massive funding rounds were a key driver, other giants like Anthropic and xAI also secured multi-billion dollar investments. Investors are now shifting significant capital toward the infrastructure layer, including data centers and specialized semiconductors, moving beyond just applied AI models.",
                "author": "GetInvestr Research",
                "date": "April 03, 2026",
                "readMinutes": 3,
                "image": "/blog/global_funding_2026.png",
                "category": "Global Investment"
            },
            {
                "title": "FinTech Giant Deal: Capital One to Acquire Brex for $5.15 Billion",
                "content": "The fintech ecosystem was shaken by one of the largest merger announcements of 2026. Banking giant Capital One has announced its acquisition of Brex, the popular corporate spend management platform, for $5.15 billion. This strategic move highlights the blurring lines between traditional banking and agile fintech platforms. Following the acquisition, Brex's innovative financial tools are expected to be fully integrated into Capital One's SME banking operations.",
                "author": "GetInvestr Team",
                "date": "April 02, 2026",
                "readMinutes": 4,
                "image": "/blog/capital_one_brex_2026.png",
                "category": "Fintech"
            },
            {
                "title": "AI-Native Financial Infrastructure: Cloak Raises $375M in Series B",
                "content": "Cloak, an 'AI-Native' startup focused on fintech security, has secured $375 million in its Series B funding round, pushing its valuation well above the billion-dollar mark. As a prime beneficiary of the 2026 trend toward 'physical-digital AI' and 'secure financial rails,' Cloak is setting new standards in financial data protection and autonomous fraud detection. The company plans to use the new capital for aggressive global expansion and intensive R&D efforts.",
                "author": "GetInvestr Research",
                "date": "April 01, 2026",
                "readMinutes": 5,
                "image": "/blog/cloak_security_2026.png",
                "category": "AI Security"
            }
        ]
        
    for p in new_posts:
        max_id += 1
        p['id'] = max_id
        
    # Prepend new posts so they appear first
    data['landing']['blog']['posts'] = new_posts + data['landing']['blog']['posts']
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

update_json('tr', r'c:\Users\Yasin AKSOY\Yatırımcı platformu\investr\i18n\messages\tr.json')
update_json('en', r'c:\Users\Yasin AKSOY\Yatırımcı platformu\investr\i18n\messages\en.json')
print("Successfully prepended 3 new posts localized in TR and EN.")
