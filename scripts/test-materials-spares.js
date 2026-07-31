const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const css = fs.readFileSync('dist/styles.css', 'utf8');
if (!html.includes('data-view="materials"')) throw new Error('자재관리 메뉴 없음');
if (!html.includes('data-view="spares"')) throw new Error('예비품관리 메뉴 없음');
if (!html.includes('data-material-list')) throw new Error('자재 목록 없음');
if (!html.includes('data-spare-list')) throw new Error('예비품 목록 없음');
if (!css.includes('grid-template-columns:repeat(5,1fr)')) throw new Error('설비 5열 스타일 없음');
console.log('화면 구조 테스트 통과');
