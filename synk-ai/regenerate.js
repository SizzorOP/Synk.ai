const { execSync } = require('child_process');

console.log('Running convert.mjs...');
execSync('node convert.mjs', { stdio: 'inherit' });

console.log('Running stripEvents.js...');
execSync('node stripEvents.js', { stdio: 'inherit' });

console.log('Running fixStyleStrs.js...');
execSync('node fixStyleStrs.js', { stdio: 'inherit' });

console.log('Running fixNumbers.js...');
execSync('node fixNumbers.js', { stdio: 'inherit' });

console.log('Running fixSVG.js...');
execSync('node fixSVG.js', { stdio: 'inherit' });

console.log('Running fixBool.js...');
execSync('node fixBool.js', { stdio: 'inherit' });

// Now selectively map a hrefs inside the generated files
const fs = require('fs');
const { globSync } = require('glob');

function getHrefFromText(text) {
  const t = text.toLowerCase().trim();
  if (t.includes('login') || t.includes('sign in')) return '/login';
  if (t.includes('get started') || t.includes('sign up') || t.includes('join')) return '/signup';
  if (t.includes('developer') && (t.includes('signup') || t.includes('profile'))) return '/signup/developer';
  if (t.includes('onboarding')) return '/onboarding';
  if (t.includes('dashboard') || t.includes('home')) return '/freelancer-dashboard';
  if (t.includes('terminal')) return '/synk-terminal';
  if (t.includes('portfolio') || t.includes('profile')) return '/portfolio';
  if (t.includes('talent') || t.includes('job') || t.includes('browse') || t.includes('find work')) return '/browse-jobs';
  if (t.includes('workspace') || t.includes('project')) return '/workspace';
  if (t.includes('chat') || t.includes('message')) return '/chat';
  if (t.includes('earning') || t.includes('contract')) return '/earnings';
  if (t.includes('community')) return '/community';
  if (t.includes('admin') || t.includes('insight')) return '/admin';
  if (t.includes('setting')) return '/settings';
  if (t.includes('role')) return '/role-selection';
  if (t.includes('synk.ai')) return '/'; 
  return '/'; // Fallback
}

globSync('app/**/*.tsx').forEach(f => {
  if (f.includes('layout.tsx')) return;
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;

  if (c.includes('<a ')) {
    changed = true;
    if (!c.includes('next/link')) {
       c = "import Link from 'next/link';\n" + c;
    }
    
    // Replace <a ...>...</a> mapping innerText safely
    c = c.replace(/<a ([^>]*)>([\s\S]*?)<\/a>/g, (match, attrs, inner) => {
      let restOfAttrs = attrs.replace(/href=(["'])(.*?)\1/, '');
      let cleanedInnerContext = inner.replace(/<[^>]*>/g, '').trim();
      let newHref = getHrefFromText(cleanedInnerContext || inner);
      return `<Link href="${newHref}"${restOfAttrs}>${inner}</Link>`;
    });
  }
  
  // also fix <br> tags while we're at it, earlier we did it via CLI
  c = c.replace(/<br>/g, '<br />');

  // and remove <script>
  c = c.replace(/<script[\s\S]*?<\/script>/g, '');

  fs.writeFileSync(f, c);
});
console.log('Navigation Linked!');

