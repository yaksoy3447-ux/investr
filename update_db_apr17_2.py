import json
import shutil
import os
from data_tr_apr17_2 import posts_tr_apr17_2
from data_en_apr17_2 import posts_en_apr17_2

def merge_and_update(file_path_tr, file_path_en):
    with open(file_path_tr, 'r', encoding='utf-8') as f:
        data_tr = json.load(f)
    with open(file_path_en, 'r', encoding='utf-8') as f:
        data_en = json.load(f)

    # TR json
    posts_db_tr = data_tr['landing']['blog']['posts']
    max_id_tr = max([p['id'] for p in posts_db_tr]) if len(posts_db_tr) > 0 else 0
    for p in reversed(posts_tr_apr17_2):
        max_id_tr += 1
        p['id'] = max_id_tr
        posts_db_tr.insert(0, p)
    with open(file_path_tr, 'w', encoding='utf-8') as f:
        json.dump(data_tr, f, ensure_ascii=False, indent=2)

    # EN json
    posts_db_en = data_en['landing']['blog']['posts']
    max_id_en = max([p['id'] for p in posts_db_en]) if len(posts_db_en) > 0 else 0
    for p in reversed(posts_en_apr17_2):
        max_id_en += 1
        p['id'] = max_id_en
        posts_db_en.insert(0, p)
    with open(file_path_en, 'w', encoding='utf-8') as f:
        json.dump(data_en, f, ensure_ascii=False, indent=2)

merge_and_update('i18n/messages/tr.json', 'i18n/messages/en.json')

# Create image placeholders
names = ["joyful_health", "vasuki_ai"]
src_img = "public/blog/wayve_ai_main.png"
if os.path.exists(src_img):
    for n in names:
        shutil.copy(src_img, f"public/blog/{n}_main.png")
        for i in range(1, 5):
            shutil.copy(src_img, f"public/blog/{n}_{i}.png")
print("JSON databases successfully updated and image placeholders created for the remaining 2 articles.")
