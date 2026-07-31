const fs = require('fs');
const path = require('path');
const cssPath = path.join(__dirname, '..', 'dist', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');
const fix = 'dialog [data-dialog-body]{padding:18px 20px 22px}dialog [data-dialog-body] .detail-list{margin-top:0;gap:0}dialog [data-dialog-body] .detail-list div{min-height:48px;padding:12px 0;align-items:center}dialog [data-dialog-body] .detail-list strong{margin-left:18px;text-align:right}';
if (!css.includes(fix)) fs.writeFileSync(cssPath, `${css}\n${fix}`);
