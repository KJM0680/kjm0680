const fs = require('fs');
const css = fs.readFileSync('dist/styles.css', 'utf8');
if (!css.includes('grid-auto-flow:column')) throw new Error('설비 세로 우선 배치가 없습니다.');
console.log('설비 배치 순서 테스트 통과');
