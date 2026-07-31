const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', 'dist');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
for (const name of ['data-material-upload','data-spare-upload']) {
  if (!html.includes(name)) throw new Error(`${name} 파일 입력이 없습니다.`);
}
for (const name of ['FileReader','parseMaterialsCsv','parseSparesCsv','mergeByName']) {
  if (!app.includes(name)) throw new Error(`${name} 업로드 기능이 없습니다.`);
}
if (!app.includes('localStorage.setItem(KEY')) throw new Error('업로드 데이터 저장이 없습니다.');
console.log('CSV 업로드 테스트 통과');
