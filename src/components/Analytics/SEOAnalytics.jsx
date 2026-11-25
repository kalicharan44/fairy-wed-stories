import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeAllTracking, trackPageView } from '../../utils/analytics';

/** Lightweight compatibility component; only the Fairy-owned, explicitly configured analytics ID can run. */
export function SEOAnalytics() {
  const location = useLocation();

  useEffect(() => {
    initializeAllTracking();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return null;
}

export default SEOAnalytics;
