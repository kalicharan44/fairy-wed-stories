import type { ReactNode } from 'react';
import SEOHelmet from './SEOHelmet';

export default function AboutPageSEO({ children }: { children?: ReactNode }) {
  return <SEOHelmet title="Our Approach | Fairy Wed Stories" description="A proposed approach to wedding planning, design and guest hospitality." noIndex>{children}</SEOHelmet>;
}
