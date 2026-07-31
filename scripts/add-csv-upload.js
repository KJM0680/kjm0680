const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'dist');
const indexPath = path.join(root, 'index.html');
const appPath = path.join(root, 'app.js');
let index = fs.readFileSync(indexPath, 'utf8');
index = index.replace(
  '<button class="button secondary" data-action="prep">준비 시작</button>',
  '<button class="button secondary" data-action="prep">준비 시작</button><button class="button secondary" data-action="csv-upload">설비점검 업데이트</button><input type="file" accept=".csv,text/csv" data-csv-upload hidden />'
);
const uploadMarkup = '<button class="button secondary" data-action="csv-upload">설비점검 업데이트</button><input type="file" accept=".csv,text/csv" data-csv-upload hidden />';
index = index.replace(`${uploadMarkup}${uploadMarkup}`, uploadMarkup);
fs.writeFileSync(indexPath, index);

let app = fs.readFileSync(appPath, 'utf8');
const anchor = "function statusLabel(status){ return ({Normal:'정상',Warning:'경고',Caution:'주의',Critical:'위험',Info:'정보'})[status] || status; }";
const helpers = `${anchor}\n  function parseEquipmentCsv(text){\n    return text.split(/\\r?\\n/).map(line=>line.trim()).filter(Boolean).map(line=>{\n      const parts=line.split(',').map(value=>value.trim());\n      if(!/^[0-9]+[A-Z]$/.test(parts[0])) return null;\n      const vibrationValues=[parts[1]||'',parts[2]||''].join(' ').match(/[0-9]+(?:\\.[0-9]+)?/g)||[];\n      const vibration=vibrationValues.length?Math.max(...vibrationValues.map(Number)):Number(parts[1]);\n      const temperature=Number(parts[3]);\n      const status=({'정상':'Normal','경고':'Warning','주의':'Caution','위험':'Critical'})[parts[4]]||parts[4];\n      return Number.isFinite(vibration)&&Number.isFinite(temperature)?{id:parts[0],vibration,temperature,status}:null;\n    }).filter(Boolean);\n  }`;
if (!app.includes('function parseEquipmentCsv')) app = app.replace(anchor, helpers);
const actionAnchor = "const action=target.closest('[data-action]')?.dataset.action; if(action==='close-dialog')";
app = app.replace(actionAnchor, "const action=target.closest('[data-action]')?.dataset.action; if(action==='csv-upload'){$('[data-csv-upload]').click();return;} if(action==='close-dialog')");
const dialogAnchor = "  $('[data-dialog]').addEventListener('click'";
const uploadHandler = `  document.addEventListener('change',(event)=>{ if(!event.target.matches('[data-csv-upload]')) return; const file=event.target.files?.[0]; if(!file) return; const reader=new FileReader(); reader.onload=()=>{ const updates=parseEquipmentCsv(String(reader.result||'')); let count=0; updates.forEach(update=>{ const existing=state.equipment.find(item=>item.id===update.id); if(existing){Object.assign(existing,update);count++;} }); if(count){saveState();render();toast(\`\${count}개 설비 데이터가 업데이트되었습니다.\`);} else toast('업데이트할 설비 데이터를 찾지 못했습니다.',true); event.target.value=''; }; reader.readAsText(file,'UTF-8'); });\n`;
if (!app.includes("matches('[data-csv-upload]')")) app = app.replace(dialogAnchor, uploadHandler + dialogAnchor);
fs.writeFileSync(appPath, app);
