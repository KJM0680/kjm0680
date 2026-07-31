const fs = require('fs');
const app = fs.readFileSync('dist/app.js', 'utf8');
for (const text of ["target.closest('[data-material-edit]')", "target.closest('[data-material-delete]')", "target.closest('[data-spare-edit]')", "target.closest('[data-spare-delete]')"]) {
  if (!app.includes(text)) throw new Error(`버튼 처리 코드가 없습니다: ${text}`);
}
console.log('수정·삭제 버튼 테스트 통과');
