const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const appPath = path.join(root, 'dist', 'app.js');
const source = fs.readFileSync(path.join(__dirname, 'spare-functions.txt'), 'utf8');
const block = (name) => source.match(new RegExp(`/\\*${name}_START\\*/([\\s\\S]*?)/\\*${name}_END\\*/`))[1];
let app = fs.readFileSync(appPath, 'utf8');
function replaceBetween(start, end, value){ const a=app.indexOf(start); const b=app.indexOf(end,a); if(a<0||b<0) throw new Error(`Cannot find ${start}`); app=app.slice(0,a)+value+'\n'+app.slice(b); }
replaceBetween('  function renderMaterials(){','  function renderSpares(){',block('MATERIALS'));
replaceBetween('  function renderSpares(){','  function mergeByName',block('SPARES'));
replaceBetween('  function openSpareForm(','  function openInspection',block('FORM'));
app = app.replace('renderMaterials(); renderSpares();', 'renderMaterials(); renderSpares(); renderSpareMonitor();');
const monitorClick = "const monitor=target.closest('[data-spare-monitor-key]'); if(monitor){ const key=monitor.dataset.spareMonitorKey; const current=state.spareMonitor?.[key]??0; const next=prompt('수량을 입력하세요.',String(current)); if(next!==null&&/^\\d+$/.test(next)){state.spareMonitor={...state.spareMonitor,[key]:Number(next)};saveState();renderSpareMonitor();} return;} ";
if (!app.includes('data-spare-monitor-key')) app = app.replace("const action=target.closest('[data-action]')?.dataset.action;", monitorClick+"const action=target.closest('[data-action]')?.dataset.action;");
app = app.replace("repairStatus:String(data.get('repairStatus')||'수리 필요'),memo:String(data.get('memo')||'').trim()", "repairStatus:String(data.get('repairStatus')||'수리 필요'),startDate:String(data.get('startDate')||''),completedDate:String(data.get('completedDate')||''),memo:String(data.get('memo')||'').trim()");
fs.writeFileSync(appPath, app);
