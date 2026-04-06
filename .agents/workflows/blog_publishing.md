---
description: GetInvestr Blog & Yayınlar İçerik Üretim Kuralları (Kesin Kurallar)
---

# GetInvestr Yayınlar (Blog) Ekleme Kuralları

Eğer kullanıcıdan "yeni bir haber ekle" veya "blog postu hazırla" gibi bir komut alırsan, aşağıdaki katı kalite ve format kurallarını harfiyen uygulamak zorundasın. GetInvestr platformu için içerik kalitesi ve premium görünüm en önemli önceliktir.

## 1. Temel Yapı ve Tasarım Akışı
- Her haber/blog yazısı mutlaka tam olarak **6 paragraftan** oluşmalıdır. (Daha az veya daha fazla olamaz).
- Her haber için **1 adet kapak görseli (`image`)** ve içeriğin aralarına serpiştirilmiş **4 adet detay görseli (`secondaryImages`)** kullanılmalıdır.
- Kullanılan görsellerin teması GetInvestr'ın premium "Dark Mode", "Sleek Venture Capital", "Fintech" ve "Modern Tech" estetiğine uygun olarak oluşturulmalıdır.

## 2. Asla Mükerrer (Kopya) İçerik ve Görsel Kullanmama Kuralı
- **KRİTİK KURAL:** Daha önce yayınlanan bir haberi veya o habere ait içerik metnini KESİNLİKLE tekrar kullanamazsın. 
- Her yeni haber için tamamen özgün, güncel ve spesifik bir metin (ve `id`) oluşturulmalıdır.
- Sadece metin değil, görseller de özgün olmalıdır. Mevcut görselleri "havuzdan seçmek" yerine, habere özel olarak yeni ve daha önce kullanılmamış görseller (`generate_image` aleti ile spesifik promptlarla) üretmelisin. Dosya isimleri özgün olmalı ve çakışmamalıdır. (Örn: `/blog/ai_startup_2026_q2_main.png`)

## 3. JSON Formatı ve Yapılandırma
Sisteme içerik eklerken güncellenmesi gereken `tr.json` ve `en.json` dosyalarındaki veri formatı aşağıdaki gibi olmalıdır:

```json
{
  "title": "Haber Başlığı",
  "content": "Paragraf 1 içeriği.\n\nParagraf 2 içeriği.\n\nParagraf 3 içeriği.\n\nParagraf 4 içeriği.\n\nParagraf 5 içeriği.\n\nParagraf 6 içeriği.",
  "author": "GetInvestr Ekibi / Research",
  "date": "Gün Ay Yıl",
  "readMinutes": 8,
  "image": "/blog/ozgun_kapak_resmi.png",
  "secondaryImages": [
    "/blog/ozgun_detay_1.png",
    "/blog/ozgun_detay_2.png",
    "/blog/ozgun_detay_3.png",
    "/blog/ozgun_detay_4.png"
  ],
  "category": "Kategori İsmi",
  "id": "Benzersiz Sayısal ID"
}
```

## 4. Adım Adım İşlem Sırası (Workflow)
1. **İçerik Stratejisi:** İstenen haber konusuna özel olarak 6 detaylı paragrafı planla ve hazırla (Hem Kapsamlı ve Profesyonel bir dil kullan).
2. **Görsel Üretimi:** Haber için 1 kapak, 4 iç görsel olmak üzere toplam 5 benzersiz görsel promptu oluştur ve `generate_image` kullanarak oluştur (daha önceki görselleri kontrol et ki çakışma olmasın).
3. **Kopyalama:** Üretilen görselleri `public/blog/` dizinine kopyala.
4. **Veritabanı (JSON) Güncellemesi:** Yeni yazıyı `i18n/messages/tr.json` ve `en.json` içinde `posts` array'inin **EN BAŞINA** (prepend) ekle.
5. **Git Uyumluluğu:** Değişiklikler yapıldıktan sonra tüm dosyaları `git add .`, `git commit` ve `git push` ile canlıya aktar.
