import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All routes that need static HTML files
const routes = [
  '/',
  '/tools',
  '/warmup-calculator',
  '/warmup-guide',
  '/privacy',
  '/terms',
  '/tools/username-generator',
  '/tools/domain-generator',
  '/tools/person-generator',
  '/tools/subject-line-generator',
  '/tools/email-validator',
  '/tools/spam-analyzer',
  '/tools/sequence-planner',
  '/tools/utm-generator',
  '/tools/email-signature-generator',
  '/tools/spintax-generator',
  '/tools/email-preview',
  '/tools/ab-subject-line-tester',
  '/tools/best-send-time-calculator',
  '/tools/timezone-converter',
  '/tools/dns-record-generator',
  '/tools/template-generator'
];

const distDir = path.join(__dirname, '../dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

console.log('Generating static HTML files for SSG...');

routes.forEach(route => {
  if (route === '/') {
    console.log('✓ Root index.html already exists');
    return;
  }

  // Create directory structure for route
  const routePath = route.replace(/^\//, ''); // Remove leading slash
  const fullPath = path.join(distDir, routePath);
  
  // Create directories if they don't exist
  fs.mkdirSync(fullPath, { recursive: true });
  
  // Write index.html for this route
  const htmlPath = path.join(fullPath, 'index.html');
  fs.writeFileSync(htmlPath, indexHtml);
  
  console.log(`✓ Created ${route}/index.html`);
});

console.log(`\n🎉 Successfully generated ${routes.length} static HTML files!`);
console.log('Your site is now properly configured for SSG with individual HTML files for each route.');
