const fs = require('fs');
const { globSync } = require('glob');
globSync('app/**/*.tsx').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  if (c.match(/required="[^"]*"/)) { c = c.replace(/required="[^"]*"/g, 'required'); changed = true; }
  if (c.match(/disabled="[^"]*"/)) { c = c.replace(/disabled="[^"]*"/g, 'disabled'); changed = true; }
  if (c.match(/checked="[^"]*"/)) { c = c.replace(/checked="[^"]*"/g, 'defaultChecked'); changed = true; }
  
  if (changed) fs.writeFileSync(f, c);
});
console.log('Fixed bool inputs!');
