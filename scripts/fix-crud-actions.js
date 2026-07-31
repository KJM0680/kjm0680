const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, '..', 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');
const anchor = "const action=target.closest('[data-action]')?.dataset.action;";
const extra = "const materialEdit=target.closest('[data-material-edit]'); if(materialEdit){openMaterialForm(materialEdit.dataset.materialEdit);return;} const materialDelete=target.closest('[data-material-delete]'); if(materialDelete){state.materials=state.materials.filter(row=>row.id!==materialDelete.dataset.materialDelete);saveState();render();return;} const spareEdit=target.closest('[data-spare-edit]'); if(spareEdit){openSpareForm(spareEdit.dataset.spareEdit);return;} const spareDelete=target.closest('[data-spare-delete]'); if(spareDelete){state.spares=state.spares.filter(row=>row.id!==spareDelete.dataset.spareDelete);saveState();render();return;} ";
if (!app.includes("target.closest('[data-material-edit]')")) app = app.replace(anchor, extra + anchor);
fs.writeFileSync(appPath, app);
