import type { ReactNode } from 'react';
import SEOHelmet from './SEOHelmet';

export default function InvitationsPageSEO({ children }: { children?: ReactNode }) {
  return <SEOHelmet title="Wedding Invitations | Fairy Wed Stories" description="An interactive local wedding invitation preview." noIndex>{children}</SEOHelmet>;
}
