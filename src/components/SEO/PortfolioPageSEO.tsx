import type { ReactNode } from 'react';
import SEOHelmet from './SEOHelmet';

export default function PortfolioPageSEO({ children }: { children?: ReactNode; images?: unknown[] }) {
  return <SEOHelmet title="Wedding Inspiration | Fairy Wed Stories" description="Illustrative wedding inspiration for celebrations shaped around your story." noIndex>{children}</SEOHelmet>;
}
