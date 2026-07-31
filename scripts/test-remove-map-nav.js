const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
if (html.includes('data-view="map"')) throw new Error('설비 지도 메뉴가 아직 남아 있습니다.');
console.log('설비 지도 메뉴 제거 테스트 통과');
