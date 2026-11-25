import type { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { brandConfig } from '../../config/brandConfig';

export interface SEOHelmetProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  noIndex?: boolean;
}

/** Small metadata wrapper; canonical links appear only after the owner confirms the official domain. */
export default function SEOHelmet({ children, title, description, noIndex = false }: SEOHelmetProps) {
  const pageTitle = title ?? brandConfig.seo.title;
  const pageDescription = description ?? brandConfig.seo.description;
  const canonical = brandConfig.seo.websiteUrl ? new URL(window.location.pathname, brandConfig.seo.websiteUrl).toString() : undefined;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {(noIndex || brandConfig.seo.noIndex) && <meta name="robots" content="noindex, nofollow" />}
        {canonical && <link rel="canonical" href={canonical} />}
      </Helmet>
      {children}
    </>
  );
}
