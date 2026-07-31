const fs = require('fs');
const app = fs.readFileSync('dist/app.js', 'utf8');
const close = app.indexOf('})();');
const handler = app.lastIndexOf("document.addEventListener('submit'");
if (close < 0 || handler < 0 || handler > close) throw new Error('자재 저장 핸들러가 앱 내부에 없습니다.');
console.log('자재 저장 범위 테스트 통과');
