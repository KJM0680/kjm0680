const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const app = fs.readFileSync('dist/app.js', 'utf8');
if (!html.includes('data-spare-monitor')) throw new Error('예비품 모니터가 없습니다.');
if (!html.includes('수리 완료')) throw new Error('수리 완료 표시가 없습니다.');
if (!app.includes('startDate')) throw new Error('수리 시작일 데이터가 없습니다.');
if (!app.includes('completedDate')) throw new Error('수리 완료일 데이터가 없습니다.');
if (!app.includes('sortByLatestDate')) throw new Error('최신 날짜 정렬이 없습니다.');
console.log('예비품 모니터 테스트 통과');
