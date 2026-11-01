// build_apexgrind.cjs - Safe sync script
const fs = require('fs');
if (fs.existsSync('index.html')) {
  const content = fs.readFileSync('index.html', 'utf8');
  fs.writeFileSync('apexgrind.html', content);
  fs.writeFileSync('public/apexgrind.html', content);
  console.log('Synchronized index.html to apexgrind.html and public/apexgrind.html');
}
