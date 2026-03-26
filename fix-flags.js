const fs = require('fs');
const path = require('path');

const files = [
  'components/layout/Navbar.tsx',
  'components/landing/LandingHeader.tsx'
];

files.forEach(file => {
  const fullPath = path.join('c:/Users/Yasin AKSOY/Yatırımcı platformu/investr', file);
  let content = fs.readFileSync(fullPath, 'utf8');
  content = content.replace(/🇹🇷 Türkçe/g, 'TR Türkçe');
  content = content.replace(/🇬🇧 English/g, 'EN English');
  fs.writeFileSync(fullPath, content);
});

console.log("Fixed unicode flags for Windows!");
