const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'dist');
const indexPath = path.join(root, 'index.html');
const cssPath = path.join(root, 'styles.css');
let index = fs.readFileSync(indexPath, 'utf8');
const mapNav = '<button class="nav-item" data-view="map">⌖ <span>설비 지도</span></button>';
const managementNav = `${mapNav}<button class="nav-item" data-view="materials">▤ <span>자재관리</span></button><button class="nav-item" data-view="spares">⚙ <span>예비품관리</span></button>`;
if (!index.includes('data-view="materials"')) index = index.replace(mapNav, managementNav);
const sections = `
      <section id="materialsView" class="view" aria-labelledby="materialsTitle"><div class="page-head"><div><p class="eyebrow">자재관리</p><h1 id="materialsTitle">자재관리</h1><p class="muted">구매 중인 자재의 수량과 납기일을 관리합니다.</p></div><div class="button-row"><button class="button secondary" data-action="material-csv">CSV 불러오기</button><input type="file" accept=".csv,text/csv" data-material-upload hidden /><button class="button primary" data-action="new-material">자재 등록</button></div></div><div class="management-card"><div class="table-wrap"><table class="management-table"><thead><tr><th>자재명</th><th>수량</th><th>납기일</th><th>상태</th><th>관리</th></tr></thead><tbody data-material-list></tbody></table></div></div></section>
      <section id="sparesView" class="view" aria-labelledby="sparesTitle"><div class="page-head"><div><p class="eyebrow">예비품관리</p><h1 id="sparesTitle">예비품관리</h1><p class="muted">수리 상태별 예비품을 등록하고 관리합니다.</p></div><div class="button-row"><button class="button secondary" data-action="spare-csv">CSV 불러오기</button><input type="file" accept=".csv,text/csv" data-spare-upload hidden /><button class="button primary" data-action="new-spare">예비품 등록</button></div></div><div class="management-card"><div class="table-wrap"><table class="management-table"><thead><tr><th>예비품명</th><th>수량</th><th>수리상태</th><th>메모</th><th>관리</th></tr></thead><tbody data-spare-list></tbody></table></div></div></section>`;
if (!index.includes('id="materialsView"')) index = index.replace('    </main>', `${sections}\n    </main>`);
fs.writeFileSync(indexPath, index);

let css = fs.readFileSync(cssPath, 'utf8');
css = css.replace('.equipment-grid{display:grid;grid-template-columns:repeat(3,1fr)', '.equipment-grid{display:grid;grid-template-columns:repeat(5,1fr)');
css = css.replace('.equipment-grid{grid-template-columns:repeat(2,1fr)}.map-layout', '.equipment-grid{grid-template-columns:repeat(3,1fr)}.map-layout');
const extra = '.management-card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);padding:18px}.table-wrap{overflow-x:auto}.management-table{width:100%;border-collapse:collapse;min-width:650px}.management-table th,.management-table td{text-align:left;padding:13px 12px;border-bottom:1px solid #e5ece9}.management-table th{color:var(--muted);font-size:12px}.management-table td{font-weight:600}.management-table .empty-state{margin:30px 0;text-align:center}.row-actions{display:flex;gap:6px}.status-material-purchasing{background:var(--warning-soft);color:var(--warning)}.status-material-received,.status-spare-complete{background:var(--primary-soft);color:var(--primary)}.status-spare-needed,.status-spare-progress{background:var(--danger-soft);color:var(--danger)}@media(max-width:620px){.management-card{padding:10px}.management-table{min-width:560px}}';
if (!css.includes('.management-card')) css += `\n${extra}`;
fs.writeFileSync(cssPath, css);
