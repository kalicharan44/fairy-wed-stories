import SEOHelmet from './SEOHelmet';
import type { SEOHelmetProps } from './SEOHelmet';

export type SEOHeadProps = SEOHelmetProps;

export default function SEOHead(props: SEOHeadProps) {
  return <SEOHelmet {...props} />;
}
