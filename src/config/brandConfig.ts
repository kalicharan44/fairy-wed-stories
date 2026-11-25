import { demoPhotos } from '../data/demoMedia';

const demoMode = import.meta.env.VITE_DEMO_MODE !== 'false';

export const brandConfig = {
  name: 'Fairy Wed Stories',
  shortName: 'Fairy',
  tagline: 'Thoughtfully planned. Beautifully personal.',
  description: 'Wedding planning, design, hospitality and destination inspiration for celebrations shaped around your story.',
  logo: { src: `${import.meta.env.BASE_URL}images/brand/fairy-wed-stories-logo.png` },
  contact: {
    phone: '+91 86270 38442',
    phoneHref: 'tel:+918627038442',
    email: null as string | null,
    whatsapp: null as string | null,
    instagram: 'https://www.instagram.com/fairywedstories/',
  },
  locations: [
    { name: 'Delhi NCR', note: 'Directory-listed location · provisional', address: '301 A, Third Floor, Apra Plaza, Road No. 44, Near M2K Cinema, Mahindra Park, Rani Bagh, Pitampura, New Delhi, Delhi – 110034.' },
    { name: 'Margao, South Goa', note: 'Directory-listed location · provisional', address: 'Margao, South Goa' },
  ],
  serviceMarkets: ['Goa', 'Delhi NCR', 'Jaipur'],
  serviceGroups: [
    { id: 'planning', title: 'Wedding Planning & Coordination', description: 'A thoughtful plan for the people, traditions and details that shape your wedding.', items: ['Complete wedding planning', 'Wedding conceptualization', 'Timeline planning', 'Vendor coordination', 'Event execution'], image: demoPhotos.hero },
    { id: 'destinations', title: 'Destination Weddings', description: 'A destination-led celebration planned around place, travel and guest experience.', items: ['Destination selection', 'Venue discovery', 'Venue booking coordination', 'Destination wedding logistics', 'Celebration planning'], image: demoPhotos.couple },
    { id: 'design', title: 'Wedding Decor & Design', description: 'Visual direction that brings ceremony spaces and celebration rooms together.', items: ['Wedding styling', 'Floral concepts', 'Themed decorations', 'Ceremony design', 'Reception styling', 'Lighting coordination'], image: demoPhotos.haldi },
    { id: 'hospitality', title: 'Hospitality & Guest Management', description: 'Clear guest communications and thoughtful movement through each event.', items: ['Guest hospitality', 'Accommodation coordination', 'Guest arrivals and departures', 'Transportation', 'Guest transfers'], image: demoPhotos.reception },
    { id: 'celebrations', title: 'Entertainment & Celebrations', description: 'A considered flow for the gatherings, rituals and shared moments around the wedding.', items: ['Haldi', 'Mehendi', 'Sangeet', 'Cocktail celebrations', 'Wedding ceremonies', 'Receptions', 'DJ and entertainment coordination', 'Traditional band and baraat'], image: demoPhotos.haldiWomen },
    { id: 'curated-services', title: 'Curated Wedding Services', description: 'Specialist providers can be coordinated as part of the wider celebration plan.', items: ['Catering coordination', 'Photography', 'Videography', 'Wedding invitations', 'Bridal styling', 'Grooming', 'Wedding cakes', 'Trousseau packing'], image: demoPhotos.cake },
  ],
  destinations: {
    india: ['Goa', 'Jaipur', 'Jodhpur', 'Udaipur', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Bengaluru', 'Mussoorie', 'Nainital', 'Shimla', 'Manali', 'Agra', 'Pune', 'Lonavala'],
    international: ['Thailand', 'Dubai', 'Bali', 'Malaysia', 'Mauritius', 'Sri Lanka', 'Turkey', 'Maldives', 'France', 'Australia', 'Spain', 'Italy', 'Vietnam', 'Austria', 'Greece'],
  },
  theme: { colors: { champagneGold: '#B89A65', warmIvory: '#FAF7F0', softBeige: '#E8DED0', deepEspresso: '#30251F', mutedRose: '#C69A9A' } },
  seo: {
    title: 'Fairy Wed Stories | Wedding Planning, Design & Destinations',
    description: 'Thoughtfully planned weddings, extraordinary destinations and celebrations that feel uniquely yours.',
    websiteUrl: import.meta.env.VITE_SITE_URL?.trim() ?? '',
    noIndex: demoMode,
  },
  features: {
    demoMode,
    demoPortfolio: demoMode,
    demoVenues: demoMode,
    destinationInspiration: true,
    blog: true,
    invitations: true,
    testimonials: false,
    analytics: import.meta.env.VITE_ANALYTICS_ENABLED === 'true' && Boolean(import.meta.env.VITE_ANALYTICS_ID?.trim()) && !demoMode,
    // Keep external delivery disabled until Fairy-owned destinations are verified.
    liveContact: false,
    whatsapp: false,
    email: false,
  },
} as const;

export type BrandConfig = typeof brandConfig;
