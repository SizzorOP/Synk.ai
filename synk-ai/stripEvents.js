const fs = require('fs');
const { globSync } = require('glob');
globSync('app/**/*.tsx').forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;

  // Events
  if (c.includes('onclick='))    { c = c.replace(/onclick="[^"]*"/g, ''); changed = true; }
  if (c.includes('onclick='))    { c = c.replace(/onclick='[^']*'/g, ''); changed = true; }
  if (c.includes('onsubmit='))   { c = c.replace(/onsubmit="[^"]*"/g, ''); changed = true; }
  if (c.includes(' oninput='))   { c = c.replace(/ oninput="[^"]*"/g, ''); changed = true; }
  if (c.includes(' onchange='))  { c = c.replace(/ onchange="[^"]*"/g, ''); changed = true; }

  // SVG and casing
  if (c.includes('stop-color=')) { c = c.replace(/stop-color/g, 'stopColor'); changed = true; }
  if (c.includes('stop-opacity=')){c = c.replace(/stop-opacity/g, 'stopOpacity'); changed = true; }
  if (c.includes('fill-opacity=')){c = c.replace(/fill-opacity/g, 'fillOpacity'); changed = true; }
  if (c.includes('clip-rule='))  { c = c.replace(/clip-rule/g, 'clipRule'); changed = true; }
  if (c.includes('fill-rule='))  { c = c.replace(/fill-rule/g, 'fillRule'); changed = true; }
  if (c.includes('stroke-width=')){c = c.replace(/stroke-width/g, 'strokeWidth'); changed = true; }
  if (c.includes('stroke-linecap=')){c= c.replace(/stroke-linecap/g, 'strokeLinecap'); changed=true;}
  if (c.includes('stroke-linejoin=')){c=c.replace(/stroke-linejoin/g, 'strokeLinejoin'); changed=true;}

  if (c.includes('viewbox=')) { c = c.replace(/viewbox=/g, 'viewBox='); changed = true; }
  if (c.includes('<lineargradient')) { c = c.replace(/lineargradient/g, 'linearGradient'); changed = true; }
  if (c.includes(' tabindex=')) { c = c.replace(/ tabindex=/g, ' tabIndex='); changed = true; }
  if (c.includes(' readonly')) { c = c.replace(/ readonly/g, ' readOnly'); changed = true; }
  if (c.includes(' autoplay')) { c = c.replace(/ autoplay/g, ' autoPlay'); changed = true; }

  if (changed) fs.writeFileSync(f, c);
});
console.log('Fixed all JSX events & casing!');
