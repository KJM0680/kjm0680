const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '..', 'dist', 'index.html');
let html = fs.readFileSync(file, 'utf8');
const mapButton = '<button class="nav-item" data-view="map">⌖ <span>설비 지도</span></button>';
if (!html.includes(mapButton)) throw new Error('설비 지도 메뉴를 찾을 수 없습니다.');
html = html.replace(mapButton, '');
fs.writeFileSync(file, html);
