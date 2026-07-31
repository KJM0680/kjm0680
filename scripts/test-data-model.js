const fs = require('fs');
const app = fs.readFileSync('dist/app.js', 'utf8');
if (!app.includes('parseMaterialsCsv')) throw new Error('자재 CSV 파서 없음');
if (!app.includes('parseSparesCsv')) throw new Error('예비품 CSV 파서 없음');
if (!app.includes('materials:[]')) throw new Error('자재 상태 없음');
if (!app.includes('spares:[]')) throw new Error('예비품 상태 없음');
console.log('데이터 모델 테스트 통과');
