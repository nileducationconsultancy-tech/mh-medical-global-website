import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const keyRoutes = [
  { path: 'index.html', route: '/' },
  { path: 'mbbs-in-uzbekistan/index.html', route: '/mbbs-in-uzbekistan' },
  { path: 'universities/uzbekistan/tashkent-medical-academy/index.html', route: '/universities/uzbekistan/tashkent-medical-academy' },
  { path: 'universities/uzbekistan/samarkand-state-medical-university/index.html', route: '/universities/uzbekistan/samarkand-state-medical-university' },
  { path: 'mbbs-fee-calculator/index.html', route: '/mbbs-fee-calculator' },
  { path: 'nmc-guidelines-for-mbbs-abroad/index.html', route: '/nmc-guidelines-for-mbbs-abroad' }
];

console.log('--- EXACT METADATA AUDIT ---');
for (const item of keyRoutes) {
  const fullPath = path.resolve(distDir, item.path);
  const html = fs.readFileSync(fullPath, 'utf8');

  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [])[1];
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]?.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || [])[1];

  console.log(`\nRoute: ${item.route}`);
  console.log(`  Title:       ${title}`);
  console.log(`  Description: ${desc}`);
  console.log(`  H1:          ${h1}`);
  console.log(`  Canonical:   ${canonical}`);
}
