import type { ReactNode } from 'react';
import SEOHelmet from './SEOHelmet';

export default function ContactPageSEO({ children }: { children?: ReactNode }) {
  return <SEOHelmet title="Contact | Fairy Wed Stories" description="Contact details are provisional; live enquiry delivery is not connected in this demonstration." noIndex>{children}</SEOHelmet>;
}
