import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/** Compatibility hook; the shared analytics module is hard-off until an approved Fairy ID is supplied. */
export const useGoogleAnalytics = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);
};

export const gtagEvent = () => undefined;
