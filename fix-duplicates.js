const fs = require('fs');

const fixDuplicates = (file, dupStr) => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(dupStr + "\\n", ""); // remove the duplicated line
  content = content.replace(dupStr, ""); // remove the duplicated line
  fs.writeFileSync(file, content);
};

fixDuplicates('app/[locale]/(dashboard)/investors/page.tsx', "const t = useTranslations('investors');");
fixDuplicates('app/[locale]/(dashboard)/outreach/page.tsx', "const t = useTranslations('outreach');");
fixDuplicates('app/[locale]/(dashboard)/inbox/page.tsx', "const t = useTranslations('inbox');");
fixDuplicates('app/[locale]/(dashboard)/crm/page.tsx', "const t = useTranslations('crm');");

console.log("Duplicate translations removed!");
