import { brandConfig } from '../config/brandConfig';

/** Reusable slot kept for authentic owner-approved reviews only. */
export default function Testimonials() {
  if (!brandConfig.features.testimonials) return null;
  return null;
}
