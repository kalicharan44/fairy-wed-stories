import type { ReactNode } from 'react';
import SEOHelmet from './SEOHelmet';

export default function HomePageSEO({ children }: { children?: ReactNode; featuredWeddings?: unknown[] }) {
  return <SEOHelmet title="Fairy Wed Stories | Wedding Planning, Design & Destinations" description="Thoughtfully planned weddings, extraordinary destinations and celebrations that feel uniquely yours." noIndex>{children}</SEOHelmet>;
}
