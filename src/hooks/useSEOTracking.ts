import { useCallback } from 'react';
import { brandConfig } from '../config/brandConfig';

type Track = (...args: unknown[]) => void;

/** Compatibility hook; tracking remains off until an approved Fairy analytics property is configured. */
export function useSEOTracking(_componentName?: string) {
  void _componentName;
  const track: Track = useCallback(() => undefined, []);
  return {
    trackEvent: track,
    trackWeddingInquiry: track,
    trackServiceView: track,
    trackEngagement: track,
    trackPortfolioInteraction: track,
  };
}

export function useServiceTracking(_serviceName: string) {
  void _serviceName;
  return { trackServiceView: useSEOTracking().trackServiceView };
}

export function usePortfolioTracking() {
  return { trackPortfolioInteraction: useSEOTracking().trackPortfolioInteraction };
}

export const analyticsTrackingEnabled = brandConfig.features.analytics;
export default useSEOTracking;
