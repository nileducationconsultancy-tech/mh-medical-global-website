import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const checkFiles = [
  'index.html',
  'mbbs-in-uzbekistan/index.html',
  'universities/uzbekistan/tashkent-medical-academy/index.html',
  'mbbs-fee-calculator/index.html',
  'blog/index.html'
];

for (const file of checkFiles) {
  const full = path.join(distDir, file);
  const html = fs.readFileSync(full, 'utf8');
  const matches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
  console.log(`\n=== File: ${file} (Found ${matches.length} JSON-LD blocks) ===`);
  matches.forEach((m, idx) => {
    const jsonStr = m.replace('<script type="application/ld+json">', '').replace('</script>', '');
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed['@graph']) {
        const types = parsed['@graph'].map(g => g['@type']).join(', ');
        console.log(`  [Block ${idx + 1}] @graph with types: ${types}`);
      } else {
        const types = Array.isArray(parsed) ? parsed.map(p => p['@type']).join(', ') : parsed['@type'];
        console.log(`  [Block ${idx + 1}] @type: ${types}`);
      }
    } catch (e) {
      console.log(`  [Block ${idx + 1}] Parse error: ${e.message}`);
    }
  });
}
