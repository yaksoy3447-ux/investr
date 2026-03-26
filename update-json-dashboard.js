const fs = require('fs');

const trPath = 'i18n/messages/tr.json';
const enPath = 'i18n/messages/en.json';

const tr = JSON.parse(fs.readFileSync(trPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Sidebar & Navbar
tr.dashboard = {
  sidebar: {
    investors: "Yatırımcılar",
    crm: "CRM",
    outreach: "Email Outreach",
    inbox: "Gelen Kutusu",
    settings: "Ayarlar",
    collapse: "Kapat",
    expand: "Aç",
    profile: "Profilim",
    logout: "Çıkış Yap"
  },
  navbar: {
    search: "Arama yapın...",
    notifications: "Bildirimler",
    noNewNotifications: "Yeni bildirim yok."
  },
  investors: {
    title: "Yatırımcı Veritabanı",
    subtitle: "Dünya çapında binlerce yatırımcıyı keşfedin",
    searchPlaceholder: "İsim veya şirket ara...",
    investorType: "Yatırımcı Tipi",
    allTypes: "Tüm Tipler",
    angel: "Melek Yatırımcı",
    vc: "VC",
    pe: "PE",
    familyOffice: "Family Office",
    industry: "Sektör",
    allIndustries: "Tüm Sektörler",
    fintech: "FinTech",
    healthtech: "HealthTech",
    ecommerce: "E-ticaret",
    ai: "Yapay Zeka",
    ticketSize: "Yatırım Miktarı",
    allSizes: "Tümü",
    addToCrm: "CRM'e Ekle",
    added: "Eklendi",
    noResults: "Aramanızla eşleşen yatırımcı bulunamadı.",
    investorCount: "yatırımcı bulundu"
  },
  crm: {
    title: "Kanban Pano",
    subtitle: "Yatırımcılarla olan iletişim süreçlerinizi yönetin",
    addList: "+ Liste Ekle",
    emptyDescription: "Tüm yatırımcı süreçlerinizi tek ekrandan, sürükle-bırak yöntemiyle yönetin.",
    stages: {
      new: "Yeni",
      contacted: "İletişime Geçildi",
      meeting: "Toplantı Planlandı",
      due_diligence: "Due Diligence",
      negotiation: "Pazarlık",
      closed_won: "Yatırım Alındı",
      closed_lost: "Reddedildi"
    }
  },
  outreach: {
    title: "Email Gönderimi",
    subtitle: "Yatırımcılara kişiselleştirilmiş emailler gönderin",
    investorLabel: "Yatırımcı",
    selectInvestor: "Bir yatırımcı seçin...",
    subjectLabel: "Konu",
    subjectPlaceholder: "Email konusu...",
    contentLabel: "Email İçeriği",
    contentPlaceholder: "Sayın [İsim],\n\nGirişimimiz hakkında...",
    aiGenerate: "AI ile Oluştur",
    generating: "Oluşturuluyor...",
    sendEmail: "Email Gönder",
    sending: "Gönderiliyor...",
    historyTitle: "Gönderim Geçmişi",
    historyEmpty: "Henüz bir email gönderimi bulunmamaktadır."
  },
  inbox: {
    title: "Gelen Kutusu",
    subtitle: "Yatırımcılarla olan mesajlaşmalarınız",
    all: "Tümü",
    unread: "Okunmamış",
    replied: "Yanıtlandı",
    archived: "Arşiv",
    noMessages: "Henüz mesaj bulunmuyor.",
    replyPlaceholder: "Yanıtınızı yazın...",
    send: "Gönder"
  },
  settings: {
    title: "Profil Ayarları",
    subtitle: "Hesap ve tercihlerinizi yönetin",
    profileTitle: "Profil",
    notificationsTitle: "Bildirimler",
    securityTitle: "Güvenlik",
    profilePicture: "Profil Fotoğrafı",
    change: "Değiştir",
    fullName: "Ad Soyad",
    company: "Şirket Adı",
    email: "Email",
    website: "Website",
    about: "Hakkında",
    aboutPlaceholder: "Girişiminiz hakkında kısa bir açıklama...",
    save: "Kaydet",
    saved: "Kaydedildi"
  }
};

en.dashboard = {
  sidebar: {
    investors: "Investors",
    crm: "CRM",
    outreach: "Email Outreach",
    inbox: "Inbox",
    settings: "Settings",
    collapse: "Collapse",
    expand: "Expand",
    profile: "My Profile",
    logout: "Logout"
  },
  navbar: {
    search: "Search...",
    notifications: "Notifications",
    noNewNotifications: "No new notifications."
  },
  investors: {
    title: "Investor Database",
    subtitle: "Discover thousands of investors worldwide",
    searchPlaceholder: "Search name or company...",
    investorType: "Investor Type",
    allTypes: "All Types",
    angel: "Angel Investor",
    vc: "VC",
    pe: "PE",
    familyOffice: "Family Office",
    industry: "Industry",
    allIndustries: "All Industries",
    fintech: "FinTech",
    healthtech: "HealthTech",
    ecommerce: "E-commerce",
    ai: "Artificial Intelligence",
    ticketSize: "Ticket Size",
    allSizes: "All",
    addToCrm: "Add to CRM",
    added: "Added",
    noResults: "No investors matched your search.",
    investorCount: "investors found"
  },
  crm: {
    title: "Kanban Board",
    subtitle: "Manage your investor communication pipeline",
    addList: "+ Add List",
    emptyDescription: "Manage all your investor pipelines from a single screen with drag-and-drop.",
    stages: {
      new: "New",
      contacted: "Contacted",
      meeting: "Meeting Scheduled",
      due_diligence: "Due Diligence",
      negotiation: "Negotiating",
      closed_won: "Invested",
      closed_lost: "Rejected"
    }
  },
  outreach: {
    title: "Email Outreach",
    subtitle: "Send personalized emails to investors",
    investorLabel: "Investor",
    selectInvestor: "Select an investor...",
    subjectLabel: "Subject",
    subjectPlaceholder: "Email subject...",
    contentLabel: "Email Content",
    contentPlaceholder: "Dear [Name],\n\nRegarding our startup...",
    aiGenerate: "Generate with AI",
    generating: "Generating...",
    sendEmail: "Send Email",
    sending: "Sending...",
    historyTitle: "Outreach History",
    historyEmpty: "You haven't sent any emails yet."
  },
  inbox: {
    title: "Inbox",
    subtitle: "Your conversations with investors",
    all: "All",
    unread: "Unread",
    replied: "Replied",
    archived: "Archived",
    noMessages: "No messages yet.",
    replyPlaceholder: "Type your reply...",
    send: "Send"
  },
  settings: {
    title: "Profile Settings",
    subtitle: "Manage your account and preferences",
    profileTitle: "Profile",
    notificationsTitle: "Notifications",
    securityTitle: "Security",
    profilePicture: "Profile Picture",
    change: "Change",
    fullName: "Full Name",
    company: "Company Name",
    email: "Email",
    website: "Website",
    about: "About",
    aboutPlaceholder: "A brief description about your startup...",
    save: "Save",
    saved: "Saved"
  }
};

fs.writeFileSync(trPath, JSON.stringify(tr, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));

console.log("Dashboard translations injected");
