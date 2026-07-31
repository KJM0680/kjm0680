const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const app = fs.readFileSync('dist/app.js', 'utf8');

const updateButtons = (html.match(/data-action="csv-upload"/g) || []).length;
if (updateButtons !== 1) throw new Error(`설비점검 업데이트 버튼이 ${updateButtons}개입니다.`);
for (const key of ['material-large-blade','material-small-blade','material-facing-ring','material-retainer-ring','material-bearing']) {
  if (!html.includes(`data-material-monitor-key="${key}"`)) throw new Error(`자재 모니터 키 누락: ${key}`);
  if (!app.includes(key)) throw new Error(`자재 모니터 저장 키 누락: ${key}`);
}
if (!html.includes('<th>날짜</th>')) throw new Error('예비품 날짜 열이 없습니다.');
if (!app.includes('renderMaterialMonitor')) throw new Error('자재 모니터 렌더링 함수가 없습니다.');
console.log('자재 모니터·예비품 날짜 열 테스트 통과');
