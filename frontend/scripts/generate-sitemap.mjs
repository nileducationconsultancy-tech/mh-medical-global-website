import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import site config and data
const siteConfigPath = path.resolve(__dirname, '../src/config/site.js');
const universitiesPath = path.resolve(__dirname, '../src/data/universitiesData.js');
const blogPath = path.resolve(__dirname, '../src/data/blogData.js');
const cityPath = path.resolve(__dirname, '../src/data/cityGuidesData.js');

async function run() {
  const { siteConfig } = await import(`file://${siteConfigPath}`);
  const { universitiesData } = await import(`file://${universitiesPath}`);
  const { blogData } = await import(`file://${blogPath}`);
  const { cityGuidesData } = await import(`file://${cityPath}`);

  const baseUrl = siteConfig.siteUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().split('T')[0];

  const routes = [
    // Core Pillars & Hubs
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/mbbs-in-uzbekistan', priority: '0.95', changefreq: 'weekly' },
    { path: '/universities/uzbekistan', priority: '0.90', changefreq: 'weekly' },
    { path: '/compare-universities', priority: '0.80', changefreq: 'weekly' },
    { path: '/mbbs-fee-calculator', priority: '0.85', changefreq: 'monthly' },
    { path: '/mbbs-eligibility', priority: '0.80', changefreq: 'monthly' },

    // Regulatory & Guides
    { path: '/mbbs-admission-uzbekistan', priority: '0.80', changefreq: 'monthly' },
    { path: '/document-checklist', priority: '0.75', changefreq: 'monthly' },
    { path: '/uzbekistan-student-visa', priority: '0.80', changefreq: 'monthly' },
    { path: '/nmc-guidelines-for-mbbs-abroad', priority: '0.90', changefreq: 'monthly' },
    { path: '/government-vs-private-medical-universities-uzbekistan', priority: '0.85', changefreq: 'monthly' },

    // Trust & Legal
    { path: '/about-us', priority: '0.70', changefreq: 'monthly' },
    { path: '/contact', priority: '0.75', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.50', changefreq: 'yearly' },

    // Blog Index
    { path: '/blog', priority: '0.85', changefreq: 'weekly' }
  ];

  // Universities (Only include active non-draft universities)
  universitiesData.forEach((uni) => {
    if (!uni.isDraft && !uni.noindex) {
      routes.push({
        path: `/universities/uzbekistan/${uni.slug}`,
        priority: '0.85',
        changefreq: 'weekly'
      });
    }
  });

  // City Guides
  cityGuidesData.forEach((city) => {
    routes.push({
      path: `/${city.slug}`,
      priority: '0.75',
      changefreq: 'monthly'
    });
  });

  // Blog Posts
  blogData.forEach((post) => {
    routes.push({
      path: `/blog/${post.slug}`,
      priority: '0.80',
      changefreq: 'monthly'
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml.trim() + '\n', 'utf8');
  console.log(`[Sitemap] Generated sitemap with ${routes.length} URLs at ${sitemapPath}`);
}

run().catch((err) => {
  console.error('[Sitemap] Failed to generate sitemap:', err);
  process.exit(1);
});
