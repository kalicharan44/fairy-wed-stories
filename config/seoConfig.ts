/** Compatibility facade for the active SEO metadata configured in src/config/brandConfig.ts. */
import { brandConfig } from '../src/config/brandConfig';

const siteUrl = brandConfig.seo.websiteUrl;

export const seoConfig = {
  site: {
    name: brandConfig.name,
    url: siteUrl,
    defaultTitle: brandConfig.seo.title,
    defaultDescription: brandConfig.seo.description,
    noIndex: brandConfig.seo.noIndex,
  },
  organization: {
    name: brandConfig.name,
    description: brandConfig.description,
    url: siteUrl,
    telephone: brandConfig.contact.phone,
    email: null,
    address: null,
    sameAs: [brandConfig.contact.instagram],
    logo: '',
  },
  pages: {
    home: { title: brandConfig.seo.title, description: brandConfig.seo.description, canonical: '/' },
    about: { title: `Our Approach | ${brandConfig.name}`, description: 'Proposed wedding planning and design approach.', canonical: '/about' },
    services: { title: `Wedding Planning & Design | ${brandConfig.name}`, description: 'Proposed wedding planning, design and hospitality services.', canonical: '/services' },
    portfolio: { title: `Wedding Inspiration | ${brandConfig.name}`, description: 'Illustrative wedding inspiration, not completed projects.', canonical: '/portfolio' },
    invitations: { title: `Wedding Invitations | ${brandConfig.name}`, description: 'Interactive local invitation preview.', canonical: '/invitations' },
    blog: { title: `The Journal | ${brandConfig.name}`, description: 'Wedding inspiration and planning notes, coming soon.', canonical: '/blog' },
    contact: { title: `Contact | ${brandConfig.name}`, description: 'Live enquiry delivery is not connected in this demonstration.', canonical: '/contact' },
  },
} as const;
