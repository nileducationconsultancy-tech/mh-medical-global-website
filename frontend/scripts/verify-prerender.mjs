import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function findHtml(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      findHtml(full, fileList);
    } else if (file.endsWith('.html') && !file.startsWith('google')) {
      fileList.push(full);
    }
  }
  return fileList;
}

const htmlFiles = findHtml(distDir);
console.log(`\n================ PRERENDER VERIFICATION ================`);
console.log(`Total HTML files found in dist/: ${htmlFiles.length}\n`);

let passed = 0;
let failed = 0;

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i);
  const relPath = path.relative(distDir, f);

  if (h1Match) {
    passed++;
    const cleanH1 = h1Match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const cleanTitle = titleMatch ? titleMatch[1].trim() : 'MISSING';
    const canonical = canonicalMatch ? canonicalMatch[1] : 'MISSING';
    console.log(`[PASS] ${relPath} (${sizeKB} KB)`);
    console.log(`       H1: "${cleanH1.slice(0, 70)}"`);
    console.log(`       Title: "${cleanTitle.slice(0, 60)}"`);
    console.log(`       Canonical: ${canonical}\n`);
  } else {
    failed++;
    console.log(`[FAIL NO H1] ${relPath} (${sizeKB} KB)\n`);
  }
}

console.log(`================ SUMMARY ================`);
console.log(`Passed: ${passed} / ${htmlFiles.length}`);
console.log(`Failed: ${failed} / ${htmlFiles.length}`);
console.log(`dist/index.html size: ${(Buffer.byteLength(fs.readFileSync(path.resolve(distDir, 'index.html')), 'utf8') / 1024).toFixed(1)} KB`);
console.log(`=========================================\n`);

if (failed > 0) {
  process.exit(1);
}
