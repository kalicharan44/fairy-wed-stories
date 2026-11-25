/** Safe compatibility configuration. Public indexing stays off until the owner verifies the domain and content. */
const advancedSEOConfig = {
  business: {
    name: 'Fairy Wed Stories',
    description: 'Wedding planning, design, hospitality and destination inspiration.',
    websiteUrl: '',
    phoneNumber: '+91 86270 38442',
    email: null,
    address: null,
    socialLinks: { instagram: 'https://www.instagram.com/fairywedstories/' },
  },
  features: { enabled: false },
  analytics: { enabled: false, provider: null, id: null },
  localSEO: { enabled: false, serviceAreas: [] },
  sitemap: { enabled: false, baseUrl: '' },
  weddingBusiness: { packageTiers: [], serviceTypes: [] },
  internationalization: { enabled: false, weddingKeywordsByLanguage: { en: [] } },
  schemaMarkup: { enableLocalBusiness: false, enableService: false, enableReview: false, enableAggregateRating: false, enableEvent: false },
};

export const getBusinessInfo = () => advancedSEOConfig.business;
export const isFeatureEnabled = () => false;
export const getAnalyticsConfig = () => advancedSEOConfig.analytics;
export const getLocalSEOConfig = () => advancedSEOConfig.localSEO;
export const getSitemapConfig = () => advancedSEOConfig.sitemap;
export const getWeddingBusinessConfig = () => advancedSEOConfig.weddingBusiness;
export const getInternationalConfig = () => advancedSEOConfig.internationalization;
export const getWeddingPackageTiers = () => advancedSEOConfig.weddingBusiness.packageTiers;
export const getWeddingServiceAreas = () => advancedSEOConfig.localSEO.serviceAreas;
export const getWeddingKeywords = (language) => advancedSEOConfig.internationalization.weddingKeywordsByLanguage[language] || [];
export const getSchemaMarkupConfig = () => advancedSEOConfig.schemaMarkup;
export default advancedSEOConfig;
