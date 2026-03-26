const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

let tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Nav linking
tr.nav.blog = "Yayınlar";
en.nav.blog = "Insights";

// Blog / News data
tr.landing.blog = {
  "title": "Girişim ve Yatırım Dünyasından Haberler",
  "subtitle": "Türkiye ekosistemindeki en güncel tohum yatırım haberleri, analizler ve kurucu rehberleri.",
  "readTime": "Okuma süresi",
  "min": "dakika",
  "posts": [
    {
      "id": 1,
      "title": "Türkiye'de 2024 Yılının En Çok Yatırım Alan 10 Fintech Girişimi",
      "author": "Investr Ekibi",
      "date": "15 Haziran 2024",
      "readMinutes": 5,
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      "category": "Fintech Özel"
    },
    {
      "id": 2,
      "title": "Tohum (Seed) Öncesi Yatırım Turuna Çıkarken Dikkat Edilmesi Gereken Kritik Metrikler",
      "author": "Yasin AKSOY",
      "date": "10 Haziran 2024",
      "readMinutes": 7,
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      "category": "Kurucu Rehberi"
    },
    {
      "id": 3,
      "title": "Sağlık Teknolojileri (HealthTech) Sektörüne İlgi Duyan En Aktif Melek Yatırımcılar",
      "author": "Investr Ekibi",
      "date": "05 Haziran 2024",
      "readMinutes": 4,
      "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      "category": "Sektör Analizi"
    }
  ]
};

en.landing.blog = {
  "title": "Latest Insights In Venture & Startups",
  "subtitle": "The most recent seed investment news, deep-dive ecosystem analytics, and founder guides.",
  "readTime": "Read time",
  "min": "min",
  "posts": [
    {
      "id": 1,
      "title": "Top 10 Fastest Growing Turkish Fintech Startups Securing Funds in 2024",
      "author": "Investr Editorial",
      "date": "June 15, 2024",
      "readMinutes": 5,
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      "category": "Fintech Special"
    },
    {
      "id": 2,
      "title": "Critical Metrics You Need to Prepare Before Securing a Pre-Seed Fund Round",
      "author": "Yasin AKSOY",
      "date": "June 10, 2024",
      "readMinutes": 7,
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      "category": "Founder's Guide"
    },
    {
      "id": 3,
      "title": "Actively Searching For HealthTech? Connect with These Top Tier Angel Investors",
      "author": "Investr Editorial",
      "date": "June 05, 2024",
      "readMinutes": 4,
      "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      "category": "Sector Analysis"
    }
  ]
};

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Added Blog i18n data!");
