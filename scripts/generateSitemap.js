import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export function generateSitemap() {
  const baseUrl = process.env.VITE_SITE_URL?.trim().replace(/\/$/, '');
  const contentApproved = process.env.VITE_PUBLIC_CONTENT_APPROVED === 'true';
  const publicDir = path.join(projectRoot, '..', 'public');
  const robotsPath = path.join(publicDir, 'robots.txt');
  fs.mkdirSync(publicDir, { recursive: true });

  if (!baseUrl || !contentApproved) {
    fs.writeFileSync(robotsPath, '# Client preview: keep this unindexed until the official domain and content are approved.\nUser-agent: *\nDisallow: /\n');
    console.log('Skipped sitemap generation: set the official VITE_SITE_URL and owner-approved VITE_PUBLIC_CONTENT_APPROVED=true after the content is ready.');
    return false;
  }

  const routes = ['/', '/about', '/services', '/portfolio', '/contact'];
  const entries = routes.map((route) => `  <url><loc>${baseUrl}${route}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  fs.writeFileSync(robotsPath, `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${baseUrl}/sitemap.xml\n`);
  console.log(`Generated sitemap for ${routes.length} approved public routes.`);
  return true;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateSitemap();
