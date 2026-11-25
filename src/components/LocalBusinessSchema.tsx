import { Helmet } from 'react-helmet-async';
import { brandConfig } from '../config/brandConfig';

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brandConfig.name,
    description: brandConfig.description,
    ...(brandConfig.seo.websiteUrl ? { url: brandConfig.seo.websiteUrl } : {}),
  };

  return <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>;
}
