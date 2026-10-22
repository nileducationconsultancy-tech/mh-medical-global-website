import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const servicePath = path.resolve(__dirname, '../src/services/googleSheetService.js');
const envPath = path.resolve(__dirname, '../.env');

const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbz1VKH-FJGbHBwh4YfCkR5nabyLnPyitw2U2N9-qgPLcA9El3JPhwjFPn61ZdKVOoH0yA/exec';

let serviceCode = fs.readFileSync(servicePath, 'utf8');

if (!serviceCode.includes('const DEFAULT_WEBHOOK_URL')) {
  serviceCode = serviceCode.replace(
    'const DEFAULT_WEBHOOK_STORAGE_KEY =',
    `const DEFAULT_WEBHOOK_URL = "${WEBHOOK_URL}";\nconst DEFAULT_WEBHOOK_STORAGE_KEY =`
  );
  serviceCode = serviceCode.replace(
    /import\.meta\.env\.VITE_GOOGLE_SHEET_WEBHOOK_URL\s*\|\|\s*""/,
    `import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL`
  );
  fs.writeFileSync(servicePath, serviceCode, 'utf8');
  console.log('[Update] googleSheetService.js updated with default webhook URL.');
}

// Write .env
fs.writeFileSync(envPath, `VITE_GOOGLE_SHEET_WEBHOOK_URL=${WEBHOOK_URL}\n`, 'utf8');
console.log('[Update] frontend/.env created with VITE_GOOGLE_SHEET_WEBHOOK_URL.');
