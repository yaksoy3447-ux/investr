import json

files = ['i18n/messages/tr.json', 'i18n/messages/en.json']

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    posts = data['landing']['blog']['posts']
    
    # We update the recent 7 posts to have completely EMPTY secondary images
    # so they don't render the cover image a 2nd time inside the text.
    for i in range(7):
        posts[i]['secondaryImages'] = []
        
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("İkincil görseller tamamen kaldırıldı!")
