const fs = require('fs');
const { globSync } = require('glob');
globSync('app/**/*.tsx').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  if (c.includes('rows=')) { 
     c = c.replace(/rows="(\d+)"/g, 'rows={$1}'); 
     changed = true; 
  }
  if (c.includes('tabIndex=')) { 
     c = c.replace(/tabIndex="(\d+)"/g, 'tabIndex={$1}'); 
     c = c.replace(/tabIndex="-1"/g, 'tabIndex={-1}');
     changed = true; 
  }
  
  if (changed) fs.writeFileSync(f, c);
});
console.log('Fixed numeric JSX props!');
