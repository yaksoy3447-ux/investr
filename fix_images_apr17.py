import json

files = ['i18n/messages/tr.json', 'i18n/messages/en.json']

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    posts = data['landing']['blog']['posts']
    
    # We prepended 7 posts recently, so they are at index 0 through 6
    # We update their secondaryImages to only contain the main image.
    for i in range(7):
        main_img = posts[i]['image']
        posts[i]['secondaryImages'] = [main_img]
        
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Veritabanlari basariyla guncellendi!")
