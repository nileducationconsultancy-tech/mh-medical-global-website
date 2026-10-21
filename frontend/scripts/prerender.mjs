import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { universitiesData } from '../src/data/universitiesData.js';
import { blogData } from '../src/data/blogData.js';
import { cityGuidesData } from '../src/data/cityGuidesData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const distSsrDir = path.resolve(__dirname, '../dist-ssr');
const templatePath = path.resolve(distDir, 'index.html');

async function prerender() {
  console.log('[Prerender] Starting static HTML generation...');

  if (!fs.existsSync(templatePath)) {
    throw new Error(`[Prerender] Template index.html not found in ${distDir}. Run client build first.`);
  }

  const rawTemplate = fs.readFileSync(templatePath, 'utf8');

  // Import SSR bundle
  const ssrEntryPath = path.resolve(distSsrDir, 'entry-server.js');
  if (!fs.existsSync(ssrEntryPath)) {
    throw new Error(`[Prerender] SSR entry not found in ${ssrEntryPath}. Run SSR build first.`);
  }
  const { render } = await import(`file://${ssrEntryPath.replace(/\\/g, '/')}`);

  // Collect all routes (both active and draft for noindex inspection)
  const routes = [
    '/',
    '/mbbs-in-uzbekistan',
    '/universities/uzbekistan',
    ...universitiesData.map(u => `/universities/uzbekistan/${u.slug}`),
    '/compare-universities',
    '/mbbs-fee-calculator',
    '/mbbs-eligibility',
    '/mbbs-admission-uzbekistan',
    '/document-checklist',
    '/uzbekistan-student-visa',
    '/nmc-guidelines-for-mbbs-abroad',
    '/government-vs-private-medical-universities-uzbekistan',
    ...cityGuidesData.map(c => `/${c.slug}`),
    '/blog',
    ...blogData.map(b => `/blog/${b.slug}`),
    '/about-us',
    '/contact',
    '/privacy-policy',
    '/404'
  ];

  console.log(`[Prerender] Found ${routes.length} routes to render.`);

  for (const route of routes) {
    try {
      const { appHtml, headState } = render(route);

      if (route === '/404') {
        headState.title = headState.title || "404: Page Not Found | MH GLOBAL EDUCATION CONSULTANT";
        headState.description = headState.description || "The requested page could not be found.";
        headState.robots = "noindex, nofollow";
      }

      let html = rawTemplate;

      // 1. Inject app HTML
      html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

      // 2. Head Tags Injection
      const headTags = [];

      // Title
      if (headState.title) {
        html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${headState.title}</title>`);
      }

      // Meta Description
      if (headState.description) {
        html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/, `<meta name="description" content="${headState.description.replace(/"/g, '&quot;')}" />`);
      }

      // Meta Robots
      if (headState.robots) {
        headTags.push(`<meta name="robots" content="${headState.robots}" />`);
      }

      // Canonical
      if (headState.canonicalUrl) {
        headTags.push(`<link rel="canonical" href="${headState.canonicalUrl}" />`);
      }

      // Open Graph
      if (headState.og) {
        if (headState.og.title) {
          html = html.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:title" content="${headState.og.title.replace(/"/g, '&quot;')}" />`);
        }
        if (headState.og.description) {
          html = html.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:description" content="${headState.og.description.replace(/"/g, '&quot;')}" />`);
        }
        if (headState.og.url) {
          headTags.push(`<meta property="og:url" content="${headState.og.url}" />`);
        }
        if (headState.og.image) {
          html = html.replace(/<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:image" content="${headState.og.image}" />`);
        }
        if (headState.og.type) {
          html = html.replace(/<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/, `<meta property="og:type" content="${headState.og.type}" />`);
        }
      }

      // Twitter Cards
      if (headState.twitter) {
        headTags.push('<meta name="twitter:card" content="summary_large_image" />');
        if (headState.twitter.title) {
          headTags.push(`<meta name="twitter:title" content="${headState.twitter.title.replace(/"/g, '&quot;')}" />`);
        }
        if (headState.twitter.description) {
          headTags.push(`<meta name="twitter:description" content="${headState.twitter.description.replace(/"/g, '&quot;')}" />`);
        }
        if (headState.twitter.image) {
          headTags.push(`<meta name="twitter:image" content="${headState.twitter.image}" />`);
        }
      }

      // Schemas (JSON-LD)
      if (headState.schemas && headState.schemas.length > 0) {
        for (const schema of headState.schemas) {
          headTags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
        }
      }

      // Insert accumulated head tags right before </head>
      if (headTags.length > 0) {
        html = html.replace('</head>', `  ${headTags.join('\n    ')}\n  </head>`);
      }

      // Determine output file path
      let outFilePath;
      if (route === '/') {
        outFilePath = path.resolve(distDir, 'index.html');
      } else if (route === '/404') {
        outFilePath = path.resolve(distDir, '404.html');
      } else {
        const routeDir = path.resolve(distDir, route.replace(/^\//, ''));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        outFilePath = path.resolve(routeDir, 'index.html');
      }

      fs.writeFileSync(outFilePath, html, 'utf8');
      const sizeKB = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
      console.log(`  ✓ Rendered ${route} -> ${path.relative(distDir, outFilePath)} (${sizeKB} KB)`);
    } catch (err) {
      console.error(`  ✗ Error rendering ${route}:`, err);
      throw err;
    }
  }

  // Clean up dist-ssr
  try {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
    console.log('[Prerender] Cleaned up temporary dist-ssr directory.');
  } catch (err) {
    console.warn('[Prerender] Could not remove dist-ssr:', err.message);
  }

  console.log('[Prerender] Completed successfully for all routes.');
}

prerender().catch(err => {
  console.error('[Prerender] Fatal error:', err);
  process.exit(1);
});
