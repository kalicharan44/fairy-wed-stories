import type { VenueViewModel } from '../types/cms';
import { demoPhotos, illustrativeLabel } from './demoMedia';

export interface DemoPortfolioItem {
  id: string;
  type: 'image';
  src: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  socialWallRow: 1 | 2 | 3;
  socialWallSortOrder: number;
}

const inspirationItems: Omit<DemoPortfolioItem, 'id' | 'socialWallRow' | 'socialWallSortOrder'>[] = [
  { type: 'image', src: demoPhotos.hero, title: 'A Ceremony in Full Color', description: 'An illustrative frame for floral scale, warm colour and a sense of occasion.', category: 'ceremony', tags: ['florals', 'ceremony'] },
  { type: 'image', src: demoPhotos.reception, title: 'Tables at Dusk', description: 'A study in table details, soft light and an intimate reception setting.', category: 'reception', tags: ['tablescape', 'reception'] },
  { type: 'image', src: demoPhotos.celebration, title: 'A Celebration in Bloom', description: 'An expressive visual cue for movement, colour and shared celebration.', category: 'ceremony', tags: ['florals', 'celebration'] },
  { type: 'image', src: demoPhotos.haldiWomen, title: 'A Moment in Marigold', description: 'A warm palette study for colour, ritual and joyful company.', category: 'celebration', tags: ['haldi', 'marigold'] },
  { type: 'image', src: demoPhotos.traditionalCouple, title: 'Joy in the Open Air', description: 'An illustrative direction for an intimate traditional ceremony.', category: 'ceremony', tags: ['traditional', 'ceremony'] },
  { type: 'image', src: demoPhotos.details, title: 'Hands & Heirlooms', description: 'A close reference for personal details, texture and tradition.', category: 'details', tags: ['mehndi', 'details'] },
  { type: 'image', src: demoPhotos.couple, title: 'A Vow by the Water', description: 'A visual starting point for a celebration shaped by its surroundings.', category: 'ceremony', tags: ['couple', 'celebration'] },
  { type: 'image', src: demoPhotos.haldi, title: 'Sunlit Celebration', description: 'An illustrative direction for a bright, informal gathering.', category: 'celebration', tags: ['haldi', 'florals'] },
  { type: 'image', src: demoPhotos.quietCeremony, title: 'A Quiet Ceremony', description: 'A monochrome study in anticipation, light and a considered entrance.', category: 'ceremony', tags: ['portrait', 'ceremony'] },
  { type: 'image', src: demoPhotos.cake, title: 'A Ritual Detail', description: 'A close study of traditional offerings and ceremonial detail.', category: 'details', tags: ['tradition', 'details'] },
  { type: 'image', src: demoPhotos.portrait, title: 'A Portrait in Red', description: 'A bridal portrait shaped by rich colour, textile and jewellery.', category: 'portrait', tags: ['bridal', 'portrait'] },
  { type: 'image', src: demoPhotos.ballroom, title: 'A Setting for the Evening', description: 'An illustrative stage composition with warm light and floral detail.', category: 'decor', tags: ['stage', 'florals'] },
];

export const demoPortfolioItems: DemoPortfolioItem[] = inspirationItems.map((item, index) => ({
  ...item,
  id: `fairy-inspiration-${String(index + 1).padStart(2, '0')}`,
  description: `${item.description} ${illustrativeLabel}.`,
  socialWallRow: ((index % 3) + 1) as 1 | 2 | 3,
  socialWallSortOrder: Math.floor(index / 3),
}));

export const demoVenues: VenueViewModel[] = [
  { id: 'inspiration-garden-setting', categorySlug: 'reception-halls', src: demoPhotos.garden, title: 'A Garden Ceremony Setting', description: `${illustrativeLabel}.`, features: [], gallery: [demoPhotos.garden] },
  { id: 'inspiration-evening-reception', categorySlug: 'reception-halls', src: demoPhotos.reception, title: 'An Intimate Reception Mood', description: `${illustrativeLabel}.`, features: [], gallery: [demoPhotos.reception] },
  { id: 'inspiration-open-air-celebration', categorySlug: 'reception-halls', src: demoPhotos.couple, title: 'An Open-Air Celebration Concept', description: `${illustrativeLabel}.`, features: [], gallery: [demoPhotos.couple] },
];
