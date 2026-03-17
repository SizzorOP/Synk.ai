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
  if (t.includes('synk.ai')) return '/'; // The brand logo text
  
  return '/'; // Fallback
}

globSync('app/**/*.tsx').forEach(f => {
  if (f.includes('layout.tsx')) return;
  
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;

  if (c.includes('<a ')) {
    changed = true;
    
    // Add Link import
    if (!c.includes('next/link')) {
       c = "import Link from 'next/link';\n" + c;
    }
    
    // Replace <a ...>...</a> mapping innerText
    // This regex looks for <a ...>text</a> or <a ...><span..>text</span></a> (basic match)
    c = c.replace(/<a([^>]*)>([\s\S]*?)<\/a>/g, (match, attrs, inner) => {
      // Find the href part
      let restOfAttrs = attrs.replace(/href=[\"\'][^\"\']*[\"\']/, '');
      let newHref = getHrefFromText(inner);
      
      // Also look for button texts inside the inner wrapper if there are any spans
      let cleanedInnerContext = inner.replace(/<[^>]*>/g, '').trim();
      if (cleanedInnerContext) {
         newHref = getHrefFromText(cleanedInnerContext);
      }
      
      return `<Link href="${newHref}"${restOfAttrs}>${inner}</Link>`;
    });
  }

  // Same thing for <button> that contain specific navigation intents, let's just make them Links as well
  // To keep it simple, we wrap <button> in <Link> or just leave buttons as is. 
  // Wait, wrapping <button> in <Link> is perfect NextJS strategy for standardizing buttons visually while navigating.
  
  if (changed) fs.writeFileSync(f, c);
});
console.log('Linked all pages dynamically!');
