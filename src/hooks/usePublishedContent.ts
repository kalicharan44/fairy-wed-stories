import { useEffect, useState, useSyncExternalStore } from 'react';
import type { RealtimeChannel } from '@supabase/supabase-js';
import { brandConfig } from '../config/brandConfig';
import { demoPortfolioItems, demoVenues } from '../data/demoCmsData';
import { getSupabaseClient, isCmsConfigured, isCmsEnabled, isCmsPartiallyConfigured } from '../lib/supabaseClient';
import { fetchPublishedPortfolio, fetchPublishedVenues } from '../services/cmsRepository';
import { portfolioToPublicItem, venueToPublicModel, type VenueViewModel } from '../types/cms';

const cacheDurationMs = 30_000;
type CmsPortfolioItem = NonNullable<ReturnType<typeof portfolioToPublicItem>>;
let portfolioCache: { at: number; items: CmsPortfolioItem[] } | null = null;
let venueCache: { at: number; items: VenueViewModel[] } | null = null;
type PublicPortfolioItem = (typeof demoPortfolioItems)[number] | CmsPortfolioItem;
type PublicSource = 'cms' | 'demo';
const portfolioDemoFallback = brandConfig.features.demoPortfolio ? demoPortfolioItems : [];
const venueDemoFallback = brandConfig.features.demoVenues ? demoVenues : [];
const partialConfigMessage = 'CMS configuration is incomplete. Set both VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.';

export function invalidateCmsPublicCache(): void {
  portfolioCache = null;
  venueCache = null;
  void refreshVenueStore();
}

export function usePublishedPortfolio(_fallback: PublicPortfolioItem[] = portfolioDemoFallback) {
  void _fallback;
  const [items, setItems] = useState<PublicPortfolioItem[]>(() => {
    if (isCmsConfigured) return portfolioCache?.items ?? [];
    return isCmsEnabled ? [] : portfolioDemoFallback;
  });
  const [source, setSource] = useState<PublicSource>(isCmsEnabled ? 'cms' : 'demo');
  const [loading, setLoading] = useState(isCmsConfigured);
  const [error, setError] = useState<string | null>(isCmsPartiallyConfigured ? partialConfigMessage : null);

  useEffect(() => {
    if (isCmsPartiallyConfigured) {
      setItems([]);
      setLoading(false);
      setError(partialConfigMessage);
      return;
    }
    if (!isCmsConfigured) {
      setItems(portfolioDemoFallback);
      setSource('demo');
      setLoading(false);
      return;
    }

    let active = true;
    if (portfolioCache && Date.now() - portfolioCache.at < cacheDurationMs) {
      setItems(portfolioCache.items);
      setSource('cms');
      setLoading(false);
      setError(null);
    } else {
      setLoading(true);
    }

    fetchPublishedPortfolio()
      .then((records) => {
        if (!active) return;
        const mapped = records.map(portfolioToPublicItem).filter((item): item is CmsPortfolioItem => Boolean(item));
        portfolioCache = { at: Date.now(), items: mapped };
        setItems(mapped);
        setSource('cms');
        setError(null);
      })
      .catch((cause: unknown) => {
        if (!active) return;
        const message = cause instanceof Error ? cause.message : 'Published portfolio content could not be loaded.';
        if (portfolioCache) {
          setItems(portfolioCache.items);
          setSource('cms');
        } else {
          setItems(portfolioDemoFallback);
          setSource('demo');
        }
        setError(message);
      })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  return { items, loading, error, source };
}

interface VenueStoreSnapshot {
  items: VenueViewModel[];
  source: PublicSource;
  loading: boolean;
  error: string | null;
}

let venueStore: VenueStoreSnapshot = {
  items: isCmsConfigured ? [] : isCmsEnabled ? [] : venueDemoFallback,
  source: isCmsEnabled ? 'cms' : 'demo',
  loading: isCmsConfigured,
  error: isCmsPartiallyConfigured ? partialConfigMessage : null,
};
const venueListeners = new Set<() => void>();
let venueRefresh: Promise<void> | null = null;
let venuePoll: ReturnType<typeof setInterval> | null = null;
let venueChannel: RealtimeChannel | null = null;

function updateVenueStore(next: VenueStoreSnapshot): void {
  venueStore = next;
  venueListeners.forEach((listener) => listener());
}

async function refreshVenueStore(): Promise<void> {
  if (!isCmsConfigured) return;
  if (venueRefresh) return venueRefresh;
  updateVenueStore({ ...venueStore, loading: true, error: null });
  venueRefresh = fetchPublishedVenues()
    .then((records) => {
      const mapped = records
        .filter((record) => record.category?.homepage_section === 'reception-halls' && record.category.is_active)
        .map(venueToPublicModel)
        .filter((venue) => Boolean(venue.src));
      venueCache = { at: Date.now(), items: mapped };
      updateVenueStore({ items: mapped, source: 'cms', loading: false, error: null });
    })
    .catch((cause: unknown) => {
      const message = cause instanceof Error ? cause.message : 'Published venue content could not be loaded.';
      updateVenueStore({
        items: venueCache?.items ?? venueDemoFallback,
        source: venueCache ? 'cms' : 'demo',
        loading: false,
        error: message,
      });
    })
    .finally(() => { venueRefresh = null; });
  return venueRefresh;
}

function subscribeToVenueStore(listener: () => void): () => void {
  venueListeners.add(listener);
  if (venueListeners.size === 1 && isCmsConfigured) {
    if (venueCache && Date.now() - venueCache.at < cacheDurationMs) {
      updateVenueStore({ items: venueCache.items, source: 'cms', loading: false, error: null });
    }
    void refreshVenueStore();
    const client = getSupabaseClient();
    venueChannel = client
      .channel('public-venue-content')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'venues' }, () => { void refreshVenueStore(); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'venue_media' }, () => { void refreshVenueStore(); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'media_assets' }, () => { void refreshVenueStore(); })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'venue_categories' }, () => { void refreshVenueStore(); })
      .subscribe();
    venuePoll = setInterval(() => { void refreshVenueStore(); }, 20_000);
    document.addEventListener('visibilitychange', refreshOnVisible);
  }
  return () => {
    venueListeners.delete(listener);
    if (venueListeners.size === 0) {
      if (venuePoll) clearInterval(venuePoll);
      venuePoll = null;
      document.removeEventListener('visibilitychange', refreshOnVisible);
      if (venueChannel) void getSupabaseClient().removeChannel(venueChannel);
      venueChannel = null;
    }
  };
}

function refreshOnVisible(): void {
  if (document.visibilityState === 'visible') void refreshVenueStore();
}

export function usePublishedVenues() {
  return useSyncExternalStore(subscribeToVenueStore, () => venueStore, () => venueStore);
}
