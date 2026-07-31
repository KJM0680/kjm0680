const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, '..', 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');
const close = app.lastIndexOf('})();');
const start = app.indexOf("  document.addEventListener('submit',(event)=>{ if(event.target.matches('[data-material-form]'))", close);
if (start >= 0) {
  const handler = app.slice(start, -1).trim();
  app = app.slice(0, start).trimEnd();
  const end = app.lastIndexOf('})();');
  app = `${app.slice(0, end)}\n${handler}\n${app.slice(end)}`;
  fs.writeFileSync(appPath, app);
}
