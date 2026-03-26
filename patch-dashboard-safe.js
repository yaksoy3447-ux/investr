const fs = require('fs');

const applyReplacements = (file, map) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  for (const [k, v] of Object.entries(map)) {
    // using split join for pure string global replacements
    content = content.split(k).join(v);
  }
  fs.writeFileSync(file, content);
};

// 1. Sidebar.tsx
applyReplacements('components/layout/Sidebar.tsx', {
  "const [activeItem, setActiveItem] = useState('Yatırımcılar');": "const t = useTranslations('dashboard.sidebar');\n  const [activeItem, setActiveItem] = useState('Yatırımcılar');",
  "'Yatırımcılar'": "t('investors')",
  "'Email Outreach'": "t('outreach')",
  "'Gelen Kutusu'": "t('inbox')",
  "'Ayarlar'": "t('settings')",
  "{collapsed ? '' : 'Kapat'}": "{collapsed ? '' : t('collapse')}",
  "Aç": "{t('expand')}", // Fix
  "Profilim": "{t('profile')}",
  "Çıkış Yap": "{t('logout')}"
});

const ensureImport = (file) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes("import { useTranslations }")) {
    content = "import { useTranslations } from 'next-intl';\n" + content;
    fs.writeFileSync(file, content);
  }
};
ensureImport('components/layout/Sidebar.tsx');

// 2. Navbar.tsx
applyReplacements('components/layout/Navbar.tsx', {
  "export function Navbar({ collapsed, setCollapsed }: NavbarProps) {": "export function Navbar({ collapsed, setCollapsed }: NavbarProps) {\n  const t = useTranslations('dashboard.navbar');",
  "placeholder=\"Arama yapın...\"": "placeholder={t('search')}",
  "Bildirimler": "{t('notifications')}",
  "Yeni bildirim yok.": "{t('noNewNotifications')}"
});
ensureImport('components/layout/Navbar.tsx');

// 3. Settings/page.tsx
applyReplacements('app/[locale]/(dashboard)/settings/page.tsx', {
  "export default function SettingsPage() {": "export default function SettingsPage() {\n  const t = useTranslations('dashboard.settings');",
  "label: 'Profil'": "label: t('profileTitle')",
  "label: 'Bildirimler'": "label: t('notificationsTitle')",
  "label: 'Güvenlik'": "label: t('securityTitle')",
  "Profil Fotoğrafı": "{t('profilePicture')}",
  "Değiştir\n": "{t('change')}\n",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Ad Soyad</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('fullName')}</label>",
  "placeholder=\"Ad Soyad\"": "placeholder={t('fullName')}",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Şirket Adı</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('company')}</label>",
  "placeholder=\"Şirket adı\"": "placeholder={t('company')}",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Email</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('email')}</label>",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Website</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('website')}</label>",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Hakkında</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('about')}</label>",
  "placeholder=\"Girişiminiz hakkında kısa bir açıklama...\"": "placeholder={t('aboutPlaceholder')}",
  "Kaydedildi": "{t('saved')}",
  "{saving ? 'Kaydediliyor...' : 'Kaydet'}": "{saving ? '...' : t('save')}"
});
ensureImport('app/[locale]/(dashboard)/settings/page.tsx');

// 4. Inbox/page.tsx
applyReplacements('app/[locale]/(dashboard)/inbox/page.tsx', {
  "export default function InboxPage() {": "export default function InboxPage() {\n  const t = useTranslations('dashboard.inbox');",
  "Gelen Kutusu\n": "{t('title')}\n",
  "Yatırımcılarla olan mesajlaşmalarınız": "{t('subtitle')}",
  "label: 'Tümü'": "label: t('all')",
  "label: 'Okunmamış'": "label: t('unread')",
  "label: 'Yanıtlandı'": "label: t('replied')",
  "label: 'Arşiv'": "label: t('archived')",
  "Henüz mesaj bulunmuyor.": "{t('noMessages')}",
  "placeholder=\"Yanıtınızı yazın...\"": "placeholder={t('replyPlaceholder')}",
  "Gönder\n": "{t('send')}\n"
});
ensureImport('app/[locale]/(dashboard)/inbox/page.tsx');

// 5. CRM/page.tsx
applyReplacements('app/[locale]/(dashboard)/crm/page.tsx', {
  "export default function KanbanPage() {": "export default function KanbanPage() {\n  const t = useTranslations('dashboard.crm');",
  "Kanban Pano\n": "{t('title')}\n",
  "Yatırımcılarla olan iletişim süreçlerinizi yönetin": "{t('subtitle')}",
  "+ Liste Ekle": "{t('addList')}",
  "Tüm yatırımcı süreçlerinizi tek ekrandan, sürükle-bırak yöntemiyle yönetin.": "{t('emptyDescription')}",
  "{ id: 'new', title: 'Yeni' }": "{ id: 'new', title: t('stages.new') }",
  "{ id: 'contacted', title: 'İletişime Geçildi' }": "{ id: 'contacted', title: t('stages.contacted') }",
  "{ id: 'meeting', title: 'Toplantı Planlandı' }": "{ id: 'meeting', title: t('stages.meeting') }",
  "{ id: 'due_diligence', title: 'Due Diligence' }": "{ id: 'due_diligence', title: t('stages.due_diligence') }",
  "{ id: 'negotiation', title: 'Pazarlık' }": "{ id: 'negotiation', title: t('stages.negotiation') }",
  "{ id: 'closed_won', title: 'Yatırım Alındı' }": "{ id: 'closed_won', title: t('stages.closed_won') }",
  "{ id: 'closed_lost', title: 'Reddedildi' }": "{ id: 'closed_lost', title: t('stages.closed_lost') }"
});
ensureImport('app/[locale]/(dashboard)/crm/page.tsx');

// 6. Outreach/page.tsx
applyReplacements('app/[locale]/(dashboard)/outreach/page.tsx', {
  "export default function OutreachPage() {": "export default function OutreachPage() {\n  const t = useTranslations('dashboard.outreach');",
  "Email Gönderimi\n": "{t('title')}\n",
  "Yatırımcılara kişiselleştirilmiş emailler gönderin": "{t('subtitle')}",
  "Yatırımcı</label>": "{t('investorLabel')}</label>",
  "<option value=\"\">Bir yatırımcı seçin...</option>": "<option value=\"\">{t('selectInvestor')}</option>",
  "Konu</label>": "{t('subjectLabel')}</label>",
  "placeholder=\"Email konusu...\"": "placeholder={t('subjectPlaceholder')}",
  "Email İçeriği</label>": "{t('contentLabel')}</label>",
  "Sayın [İsim],\\n\\nGirişimimiz hakkında...": "{t('contentPlaceholder')}",
  "AI ile Oluştur\n": "{t('aiGenerate')}\n",
  "{generating ? 'Oluşturuluyor...' : 'AI ile Oluştur'}": "{generating ? t('generating') : t('aiGenerate')}",
  "{sending ? 'Gönderiliyor...' : 'Email Gönder'}": "{sending ? t('sending') : t('sendEmail')}",
  "Gönderim Geçmişi": "{t('historyTitle')}",
  "Henüz bir email gönderimi bulunmamaktadır.": "{t('historyEmpty')}"
});
ensureImport('app/[locale]/(dashboard)/outreach/page.tsx');

// 7. Investors/page.tsx
applyReplacements('app/[locale]/(dashboard)/investors/page.tsx', {
  "export default function InvestorsPage() {": "export default function InvestorsPage() {\n  const t = useTranslations('dashboard.investors');",
  "Yatırımcı Veritabanı\n": "{t('title')}\n",
  "Dünya çapında binlerce yatırımcıyı keşfedin": "{t('subtitle')}",
  "placeholder=\"İsim veya şirket ara...\"": "placeholder={t('searchPlaceholder')}",
  "label: 'Tüm Tipler'": "label: t('allTypes')",
  "label: 'Melek Yatırımcı'": "label: t('angel')",
  "label: 'Tüm Sektörler'": "label: t('allIndustries')",
  "label: 'E-ticaret'": "label: t('ecommerce')",
  "label: 'Yapay Zeka'": "label: t('ai')",
  "label: 'Yatırım Miktarı'": "label: t('ticketSize')",
  "label: 'Tümü'": "label: t('allSizes')",
  "CRM'e Ekle": "{t('addToCrm')}",
  "{added.has(investor.id) ? 'Eklendi' : 'CRM\\'e Ekle'}": "{added.has(investor.id) ? t('added') : t('addToCrm')}",
  "Aramanızla eşleşen yatırımcı bulunamadı.": "{t('noResults')}",
  "yatırımcı bulundu": " {t('investorCount')}"
});
ensureImport('app/[locale]/(dashboard)/investors/page.tsx');

console.log("Dashboard components successfully translated.");
