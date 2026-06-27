const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'homepage.html',
  'app.js',
  'app.min.js',
  'data.js'
];

filesToPatch.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace API lists
    content = content.replace(/\/api\/colleges/g, 'api/colleges.json');
    // Replace API details (fixes the .json part that gets appended to colleges.json/${id})
    // We already replaced /api/colleges with api/colleges.json, so /api/colleges/${id} became api/colleges.json/${id}
    // We need to carefully regex replace.
    // Let's reload content and do it properly.
    content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Details first
    content = content.replace(/\/api\/colleges\/\$\{([^}]+)\}/g, 'api/colleges/${$1}.json');
    // 2. Lists next
    content = content.replace(/\/api\/colleges/g, 'api/colleges.json');
    
    // The previous two steps will turn `/api/colleges/${id}` into `api/colleges.json/${id}.json` because the second replace matches the first part.
    // So let's do it with a more specific regex.
    content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/'\/api\/colleges'/g, "'api/colleges.json'");
    content = content.replace(/"\/api\/colleges"/g, '"api/colleges.json"');
    content = content.replace(/`\/api\/colleges`/g, "`api/colleges.json`");
    
    content = content.replace(/`\/api\/colleges\/\$\{([^}]+)\}`/g, "`api/colleges/${$1}.json`");
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${file}`);
  }
});
