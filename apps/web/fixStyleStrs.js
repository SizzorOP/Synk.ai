const fs = require('fs');
const { globSync } = require('glob');
globSync('app/**/*.tsx').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  
  // Example we want to fix: style='background-image: url("...");'
  // Or: style="background-image: url('...');"
  const regex = /style=(["'])(.*?)\1/g;
  c = c.replace(regex, (match, quote, content) => {
    changed = true;
    if (content.includes('background-image')) {
      let urlMatch = content.match(/url\((.*?)\)/);
      if (urlMatch) {
         let url = urlMatch[1].replace(/&quot;/g, "'").replace(/^["']|["']$/g, "");
         return `style={{ backgroundImage: \`url('\${"${url}"}')\` }}`;
      }
    }
    if (content.includes('width:') && content.includes('%')) {
        let pct = content.match(/width:\s*(\d+%)/);
        if (pct) return `style={{ width: '${pct[1]}' }}`;
    }
    return ``; // Strip other inline styles safely
  });
  
  if (changed) fs.writeFileSync(f, c);
});
console.log('Fixed JSX style string issues!');
