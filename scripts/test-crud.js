const fs = require('fs');
const app = fs.readFileSync('dist/app.js', 'utf8');
for (const name of ['renderMaterials','renderSpares','data-material-form','data-spare-form']) {
  if (!app.includes(name)) throw new Error(`${name} 없음`);
}
console.log('CRUD 코드 테스트 통과');
