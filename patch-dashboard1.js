const fs = require('fs');
const path = require('path');

const applyReplacements = (file, map) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  for (const [k, v] of Object.entries(map)) {
    // Escaping to match exact strings
    const searchString = k;
    content = content.replace(searchString, v);
    // do it recursively for all occurences
    while(content.includes(searchString)) {
        content = content.replace(searchString, v);
    }
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
  "Aç": "t('expand')",
  "Profilim": "{t('profile')}",
  "Çıkış Yap": "{t('logout')}"
});

// Need to make sure `useTranslations` is imported in Sidebar and Navbar.
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
  "export default function SettingsPage() {": "import { useTranslations } from 'next-intl';\n\nexport default function SettingsPage() {",
  "  const [loading, setLoading] = useState(false);": "  const t = useTranslations('dashboard.settings');\n  const [loading, setLoading] = useState(false);",
  "label: 'Profil'": "label: t('profileTitle')",
  "label: 'Bildirimler'": "label: t('notificationsTitle')",
  "label: 'Güvenlik'": "label: t('securityTitle')",
  "Profil Fotoğrafı": "{t('profilePicture')}",
  "Değiştir": "{t('change')}",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Ad Soyad</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('fullName')}</label>",
  "placeholder=\"Ad Soyad\"": "placeholder={t('fullName')}",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Şirket Adı</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('company')}</label>",
  "placeholder=\"Şirket adı\"": "placeholder={t('company')}",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Email</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('email')}</label>",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Website</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('website')}</label>",
  "<label className=\"block text-sm font-medium text-foreground mb-1.5\">Hakkında</label>": "<label className=\"block text-sm font-medium text-foreground mb-1.5\">{t('about')}</label>",
  "placeholder=\"Girişiminiz hakkında kısa bir açıklama...\"": "placeholder={t('aboutPlaceholder')}",
  "Kaydedildi": "{t('saved')}",
  "{saving ? 'Kaydediliyor...' : 'Kaydet'}": "{saving ? '...' : t('save')}",
  "{t('title')}": "{t('title')}", // I already added title translation in Settings manually before
  "{t('subtitle')}": "{t('subtitle')}"
});

// 4. Inbox/page.tsx
applyReplacements('app/[locale]/(dashboard)/inbox/page.tsx', {
  "export default function InboxPage() {": "import { useTranslations } from 'next-intl';\n\nexport default function InboxPage() {",
  "  const [activeThread, setActiveThread] = useState<number | null>(null);": "  const t = useTranslations('dashboard.inbox');\n  const [activeThread, setActiveThread] = useState<number | null>(null);",
  "Gelen Kutusu\n": "{t('title')}\n",
  "Yatırımcılarla olan mesajlaşmalarınız": "{t('subtitle')}",
  "label: 'Tümü'": "label: t('all')",
  "label: 'Okunmamış'": "label: t('unread')",
  "label: 'Yanıtlandı'": "label: t('replied')",
  "label: 'Arşiv'": "label: t('archived')",
  "Henüz mesaj bulunmuyor.": "{t('noMessages')}",
  "placeholder=\"Yanıtınızı yazın...\"": "placeholder={t('replyPlaceholder')}",
  "Gönder": "{t('send')}"
});

console.log("Dashboard sub-components mostly patched");
