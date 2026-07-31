const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const sidebar = html.match(/<aside class="sidebar">([\s\S]*?)<\/aside>/)?.[1] || '';
const topbar = html.match(/<header class="topbar">([\s\S]*?)<\/header>/)?.[1] || '';
if (sidebar.includes('data-view="alerts"')) throw new Error('알림센터가 왼쪽 메뉴에 남아 있습니다.');
if (!topbar.includes('data-view="alerts"')) throw new Error('알림센터 상단 메뉴가 없습니다.');
console.log('알림센터 상단 메뉴 테스트 통과');
