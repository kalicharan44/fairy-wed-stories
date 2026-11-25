import type { ReactNode } from 'react';
import SEOHelmet from './SEOHelmet';

export default function ServicesPageSEO({ children }: { children?: ReactNode; serviceName?: string; location?: string }) {
  return <SEOHelmet title="Wedding Planning & Design | Fairy Wed Stories" description="Proposed wedding planning, destination, design and hospitality services." noIndex>{children}</SEOHelmet>;
}
