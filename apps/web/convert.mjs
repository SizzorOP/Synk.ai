import fs from 'fs';
import path from 'path';

const htmlDir = 'c:\\Automation\\newjob\\synk-ai\\stitch-assets\\html';
const appDir = 'c:\\Automation\\newjob\\synk-ai\\app';

const routes = {
  'synk.ai-landing-page.html': '', 
  'login---split-screen-visual.html': 'login',
  'signup---split-screen-visual.html': 'signup',
  'developer-signup.html': 'signup/developer',
  'ai-onboarding-flow.html': 'onboarding',
  'role-selection.html': 'role-selection',
  'freelancer-dashboard.html': 'freelancer-dashboard',
  'synk-terminal-dashboard.html': 'synk-terminal',
  'talent-portfolio-portfolio-first.html': 'portfolio',
  'browse-jobs.html': 'browse-jobs',
  'project-workspace.html': 'workspace',
  'smart-chat.html': 'chat',
  'earnings-contracts.html': 'earnings',
  'community-discovery.html': 'community',
  'admin-insights-portal.html': 'admin',
  'system-settings.html': 'settings'
};

fs.readdirSync(htmlDir).forEach(file => {
  if (!routes.hasOwnProperty(file)) return;
  const content = fs.readFileSync(path.join(htmlDir, file), 'utf8');
  
  let bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return;
  let bodyHTML = bodyMatch[1];
  
  // Transform to JSX
  let jsx = bodyHTML
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
    .replace(/<img([^>]*)>/g, (match, p1) => {
      if (p1.trim().endsWith('/')) return match;
      return `<img${p1} />`;
    })
    .replace(/<input([^>]*)>/g, (match, p1) => {
      if (p1.trim().endsWith('/')) return match;
      return `<input${p1} />`;
    })
    .replace(/<hr([^>]*)>/g, (match, p1) => {
        if (p1.trim().endsWith('/')) return match;
        return `<hr${p1} />`;
    })
    .replace(/style="([^"]*)"/g, (match, p1) => {
        if (p1.includes('background-image')) {
            let urlVal = p1.match(/url\((.*?)\)/);
            if (urlVal) {
               return `style={{ backgroundImage: \`url(\${${urlVal[1].replace(/&quot;/g, "'")}.replace(/^'|'$/g, "")})\` }}`;
            }
        }
        return match; 
    });

  const routePath = routes[file];
  const destDir = path.join(appDir, routePath);
  fs.mkdirSync(destDir, { recursive: true });
  
  const componentStr = `export default function Page() {\n  return (\n    <div className="bg-background-dark font-display text-slate-100 selection:bg-primary/30 selection:text-primary min-h-screen">\n${jsx}\n    </div>\n  );\n}\n`;
  fs.writeFileSync(path.join(destDir, 'page.tsx'), componentStr);
  console.log('Generated route: /' + routePath);
});
