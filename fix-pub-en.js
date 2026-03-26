const fs = require('fs');
const enPath = 'i18n/messages/en.json';

let en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

// Updates to Publications 
if (en.nav && en.nav.blog) {
    en.nav.blog = "Publications";
}
if (en.landing && en.landing.header && en.landing.header.blog) {
    en.landing.header.blog = "Publications";
}
if (en.landing && en.landing.blog && en.landing.blog.title) {
    en.landing.blog.title = "Latest Venture Publications";
}

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
console.log("Updated Insights to Publications in en.json");
