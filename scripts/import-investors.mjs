import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function importInvestors() {
  const filePath = 'C:/Users/Yasin AKSOY/Desktop/Yatirimci_Listesi_Master.xlsx';
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  console.log(`${data.length} kayıt okundu. Sütunlar:`, Object.keys(data[0] || {}));
  console.log('İlk kayıt örneği:', JSON.stringify(data[0], null, 2));

  let success = 0, skipped = 0, errors = 0;

  for (const item of data) {
    // E-posta sütununu esnek bul
    const email = item.Email || item.email || item['E-posta'] || item['e-posta'] || item.CONTACT || item.Contact;
    if (!email || !String(email).includes('@')) { skipped++; continue; }

    const name = (item.Ad || item.Name || item.name || item['VC NAME'] || '') + ' ' + (item.Soyad || item.Surname || '');

    const investorData = {
      name: name.trim() || 'Bilinmiyor',
      email: String(email).trim().toLowerCase(),
      sectors: [],
      investor_type: ['angel'],
      stages: ['seed'],
      location_country: item.Country || item.Ülke || 'Türkiye',
      location_city: item.City || item['HQ City'] || item.Şehir || null,
      website: item.Website || item.WEBSITE || item['Web Sitesi'] || null,
      linkedin_url: item.LinkedIn || item.linkedin_url || null,
      is_active: true,
      email_verified: false,
      locale: 'tr',
    };

    // Önce bu email var mı kontrol et
    const { data: existing } = await supabase
      .from('investors')
      .select('id')
      .eq('email', investorData.email)
      .maybeSingle();

    if (existing) {
      skipped++;
      continue; // Zaten var, atla
    }

    const { error } = await supabase
      .from('investors')
      .insert(investorData);

    if (error) {
      if (error.code === '23505') { skipped++; } // unique violation
      else { errors++; console.error(`Hata (${investorData.email}):`, error.message); }
    } else {
      success++;
    }
  }

  console.log(`\n=== AKTARIM RAPORU ===`);
  console.log(`Toplam okunan: ${data.length}`);
  console.log(`Başarıyla eklenen: ${success}`);
  console.log(`Zaten var (mükerrer): ${skipped}`);
  console.log(`Hata: ${errors}`);
}

importInvestors();
