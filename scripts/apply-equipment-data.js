const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, '..', 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');
const replacements = [
  ["['2A','Normal',2.5,48]", "['2A','Normal',1.7,42]"],
  ["['2B','Normal',2.2,46]", "['2B','Warning',3.1,41]"],
  ["['3A','Normal',2.3,47]", "['3A','Normal',1.4,82]"],
  ["['3B','Caution',4.8,58]", "['3B','Normal',1.6,86]"]
];
for (const [from, to] of replacements) {
  if (!app.includes(from)) throw new Error(`Expected equipment row not found: ${from}`);
  app = app.replace(from, to);
}
fs.writeFileSync(appPath, app);
