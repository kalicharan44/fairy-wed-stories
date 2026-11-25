/** Compatibility entry point; the preview uses the same owner-gated sitemap generator. */
import { generateSitemap } from './generateSitemap.js';

export function generateSitemaps() {
  return generateSitemap();
}

if (process.argv[1]?.endsWith('generateAdvancedSitemaps.js')) generateSitemaps();
