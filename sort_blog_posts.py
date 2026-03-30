import json
from datetime import datetime

tr_months = {
    'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04', 'Mayıs': '05', 'Haziran': '06',
    'Temmuz': '07', 'Ağustos': '08', 'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
}
en_months = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06',
    'July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12'
}

def parse_date(date_str, lang):
    try:
        if lang == 'tr':
            parts = date_str.split()
            if len(parts) == 3:
                day, month_str, year = parts
                month = tr_months.get(month_str, '01')
                return datetime.strptime(f"{day} {month} {year}", "%d %m %Y")
        elif lang == 'en':
            cleaned = date_str.replace(',', '')
            parts = cleaned.split()
            if len(parts) == 3:
                month_str, day, year = parts
                month = en_months.get(month_str, '01')
                return datetime.strptime(f"{day} {month} {year}", "%d %m %Y")
    except Exception as e:
        print(f"Error parsing date: {date_str} - {e}")
    return datetime(1970, 1, 1)

def sort_json(file_path, lang):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    posts = data['landing']['blog']['posts']
    posts.sort(key=lambda p: parse_date(p['date'], lang), reverse=True)
    data['landing']['blog']['posts'] = posts
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

sort_json(r'c:\Users\Yasin AKSOY\Yatırımcı platformu\investr\i18n\messages\tr.json', 'tr')
sort_json(r'c:\Users\Yasin AKSOY\Yatırımcı platformu\investr\i18n\messages\en.json', 'en')
print("JSON files sorted by date descending.")
