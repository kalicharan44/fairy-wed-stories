import type { ReactNode } from 'react';
import SEOHelmet from './SEOHelmet';

export default function BlogPageSEO({ children }: { children?: ReactNode; blogPost?: unknown }) {
  return <SEOHelmet title="The Journal | Fairy Wed Stories" description="Wedding inspiration and planning notes, coming soon." noIndex>{children}</SEOHelmet>;
}
