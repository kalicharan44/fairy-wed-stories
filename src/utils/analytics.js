import { brandConfig } from '../config/brandConfig';

let started = false;

export function initializeAllTracking() {
  if (!brandConfig.features.analytics || started) return;
  const measurementId = import.meta.env.VITE_ANALYTICS_ID?.trim();
  if (!measurementId) return;
  started = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.append(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args) => window.dataLayer.push(args);
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { anonymize_ip: true });
}

export function trackPageView(path, title) {
  if (!brandConfig.features.analytics || !window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path, page_title: title });
}

export function trackFormSubmission() { /* Contact collection stays disabled in demonstration mode. */ }
export function trackCTAClick() { /* No analytics event is sent unless a Fairy-owned ID is configured. */ }
export function trackExternalLink() { /* No analytics event is sent unless a Fairy-owned ID is configured. */ }
export function trackCustomEvent() { /* No analytics event is sent unless a Fairy-owned ID is configured. */ }
