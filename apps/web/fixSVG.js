const fs = require('fs');
const { globSync } = require('glob');
globSync('app/**/*.tsx').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  if (c.includes('preserveaspectratio=')) { c = c.replace(/preserveaspectratio=/g, 'preserveAspectRatio='); changed = true; }
  
  if (changed) fs.writeFileSync(f, c);
});
console.log('Fixed SVG aspect ratio bugs!');
