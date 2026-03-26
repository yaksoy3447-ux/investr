import requests

URL = 'https://onpbafutloyixmovblfo.supabase.co/rest/v1/investors'
KEY = 'sb_publishable_DGhdahtBQ4sbUlUI-bQFVQ_uTJxHulT'
HEADERS = {
    'apikey': KEY,
    'Authorization': f'Bearer {KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

investor_data = {
    "name": "Yasin Aksoy",
    "title": "Start-up Hunter / Melek Yatırımcı",
    "company": "GetInvestr",
    "email": "yaksoy3447@gmail.com",
    "email_verified": True,
    "linkedin_url": "https://linkedin.com/in/yasin-aksoy",
    "website": "https://getinvestr.com",
    "location_city": "İstanbul",
    "location_country": "TR",
    "investor_type": ["angel"],
    "sectors": ["fintech", "ai", "ecommerce"],
    "stages": ["seed", "series_a"],
    "min_ticket": 10000,
    "max_ticket": 500000,
    "portfolio": ["GetInvestr"],
    "bio": "GetInvestr platformunun kurucusu, AI teknolojilerine ve yenilikçi finans şirketlerine yatırım yapmakla ilgileniyor.",
    "locale": "tr",
    "is_active": True
}

res = requests.post(URL, headers=HEADERS, json=[investor_data])
if res.status_code in [200, 201]:
    print("✅ Yasin Aksoy başarıyla yatırımcı veri tabanına eklendi!")
else:
    print("Hata:", res.status_code, res.text)
