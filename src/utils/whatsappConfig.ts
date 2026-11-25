import { brandConfig } from '../config/brandConfig';

export interface ContactInquiry {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  venue: string;
  eventType: string;
  guestCount: string;
  budget: string;
  message: string;
}

export function generateWhatsAppMessage(formData: ContactInquiry): string {
  return encodeURIComponent(`Hello ${brandConfig.name},\n\n${formData.message}`);
}

export function generateVenueBookingMessage(venueName: string): string {
  return encodeURIComponent(`Hello ${brandConfig.name},\n\nI'd like to ask about the inspiration for ${venueName}.`);
}

export function openWhatsAppChat(_formData: ContactInquiry): boolean {
  if (!brandConfig.features.whatsapp || !brandConfig.contact.whatsapp) return false;
  window.open(`https://wa.me/${brandConfig.contact.whatsapp}?text=${generateWhatsAppMessage(_formData)}`, '_blank', 'noopener,noreferrer');
  return true;
}

export function openVenueBookingWhatsApp(venueName: string): boolean {
  if (!brandConfig.features.whatsapp || !brandConfig.contact.whatsapp) return false;
  window.open(`https://wa.me/${brandConfig.contact.whatsapp}?text=${generateVenueBookingMessage(venueName)}`, '_blank', 'noopener,noreferrer');
  return true;
}
