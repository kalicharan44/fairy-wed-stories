import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Grid2X2, LayoutGrid, X } from 'lucide-react';
import { brandConfig } from '../config/brandConfig';
import { illustrativeLabel } from '../data/demoMedia';
import { demoPortfolioItems } from '../data/demoCmsData';
import { usePublishedPortfolio } from '../hooks/usePublishedContent';
import type { RibbonImage } from './ImmersiveImageRibbon';
import ImmersiveImageRibbon from './ImmersiveImageRibbon';

type PortfolioItem = (typeof demoPortfolioItems)[number] & { gallery?: string[] };

export default function Portfolio() {
  const { items, loading, error, source } = usePublishedPortfolio(demoPortfolioItems);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'masonry' | 'grid'>('masonry');
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const records = items as PortfolioItem[];
  const categories = useMemo(() => ['all', ...Array.from(new Set(records.map((item) => item.category)))], [records]);
  const filteredItems = useMemo(() => records.filter((item) => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const searchable = `${item.title} ${item.description} ${(item.tags ?? []).join(' ')}`.toLowerCase();
    return matchesCategory && searchable.includes(query.trim().toLowerCase());
  }), [records, filter, query]);
  const selectedItem = filteredItems.find((item) => item.id === selectedId) ?? records.find((item) => item.id === selectedId) ?? null;
  const isIllustrative = source === 'demo';

  const close = useCallback(() => setSelectedId(null), []);
  const moveLightbox = useCallback((direction: -1 | 1) => {
    if (!selectedItem || !filteredItems.length) return;
    const index = filteredItems.findIndex((item) => item.id === selectedItem.id);
    const next = (index + direction + filteredItems.length) % filteredItems.length;
    setSelectedId(filteredItems[next].id);
  }, [filteredItems, selectedItem]);

  useEffect(() => {
    if (selectedId === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') moveLightbox(-1);
      if (event.key === 'ArrowRight') moveLightbox(1);
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKey); };
  }, [selectedId, close, moveLightbox]);

  const ribbonItems = useMemo<RibbonImage[]>(() => filteredItems.slice(0, 8).map((item, index) => ({
    id: item.id,
    src: item.src,
    alt: `${item.title}${isIllustrative ? ` · ${illustrativeLabel}` : ''}`,
    aspect: (index % 3 === 0 ? 'portrait' : index % 3 === 1 ? 'landscape' : 'square') as RibbonImage['aspect'],
    portfolioItemId: item.id,
  })), [filteredItems, isIllustrative]);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#faf7f0] pt-24 text-[#30251f] sm:pt-28">
      <section className="px-5 pb-9 pt-8 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#96784a]">A visual story in motion</p>
          <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <h1 className="font-serif text-[clamp(2.8rem,10vw,6rem)] leading-[0.95] tracking-[-0.05em]">Love, captured <span className="italic text-[#96784a]">in every frame.</span></h1>
            <p className="max-w-xl text-sm leading-6 text-[#62574d] sm:text-base sm:leading-7">A collection of visual references for wedding planning, celebration design and destination experiences.</p>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-2 border-y border-[#d8c9b4] py-3 text-[10px] leading-5 text-[#62574d] sm:text-xs">
            <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-[#755b38]">{isIllustrative ? 'Illustrative inspiration' : 'Published Fairy Wed Stories work'}</span>
            {isIllustrative && <span>· No completed Fairy projects, couples, venues or dates are represented.</span>}
            {error && <span role="status">· Published content is temporarily unavailable.{brandConfig.features.demoMode ? ' Clearly labelled illustrative images remain visible.' : ''}</span>}
          </div>
        </div>
      </section>

      {ribbonItems.length > 0 && <ImmersiveImageRibbon items={ribbonItems} eyebrow="Swipe through the frames" title="A moodboard of moments" description={isIllustrative ? illustrativeLabel : 'Approved published celebration imagery.'} ariaLabel="Wedding inspiration image ribbon" variant="portfolio" onItemClick={(item) => setSelectedId(item.portfolioItemId ?? item.id)} />}

      <section className="px-5 pb-10 pt-6 sm:px-8 sm:pb-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-col gap-3 sm:mb-7 sm:flex-row sm:items-center sm:justify-between">
            <label className="block w-full sm:max-w-sm"><span className="sr-only">Search wedding inspiration</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search inspiration" className="min-h-12 w-full border-b border-[#b8a78f] bg-transparent px-1 text-sm outline-none placeholder:text-[#85796e] focus:border-[#96784a] focus:ring-0" /></label>
            <div className="hidden items-center gap-2 md:flex"><button type="button" onClick={() => setView('masonry')} aria-label="Masonry view" aria-pressed={view === 'masonry'} className={`grid h-11 w-11 place-items-center border ${view === 'masonry' ? 'border-[#96784a] text-[#755b38]' : 'border-[#d8c9b4] text-[#62574d]'}`}><LayoutGrid className="h-4 w-4" aria-hidden="true" /></button><button type="button" onClick={() => setView('grid')} aria-label="Grid view" aria-pressed={view === 'grid'} className={`grid h-11 w-11 place-items-center border ${view === 'grid' ? 'border-[#96784a] text-[#755b38]' : 'border-[#d8c9b4] text-[#62574d]'}`}><Grid2X2 className="h-4 w-4" aria-hidden="true" /></button></div>
          </div>
          <div className="-mx-5 mb-7 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter by inspiration category">
            {categories.map((category) => <button key={category} type="button" onClick={() => setFilter(category)} aria-pressed={filter === category} className={`min-h-10 shrink-0 snap-start border px-4 text-xs font-semibold capitalize transition-colors ${filter === category ? 'border-[#30251f] bg-[#30251f] text-[#faf7f0]' : 'border-[#d8c9b4] bg-[#faf7f0] text-[#62574d] hover:border-[#96784a]'}`}>{category === 'all' ? 'All inspiration' : category}</button>)}
          </div>
          {loading && records.length === 0 && <p className="py-16 text-center text-sm text-[#62574d]" role="status">Loading published wedding inspiration…</p>}
          {!loading && filteredItems.length === 0 && <div className="border border-[#d8c9b4] px-5 py-14 text-center"><p className="font-serif text-2xl">No images match this view.</p><p className="mt-2 text-sm text-[#62574d]">Try another category or search phrase.</p></div>}
          <div className={view === 'masonry' ? 'columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3' : 'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3'}>
            {filteredItems.map((item, index) => (
              <motion.article key={item.id} initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '0px 0px -50px 0px' }} transition={{ duration: 0.45, delay: Math.min(index % 3, 2) * 0.06 }} className={view === 'masonry' ? 'mb-3 break-inside-avoid sm:mb-4' : ''}>
                <button type="button" onClick={() => setSelectedId(item.id)} className="group relative block w-full overflow-hidden bg-[#e8ded0] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white">
                  <img src={item.src} alt={`${item.title}${isIllustrative ? ` · ${illustrativeLabel}` : ''}`} loading="lazy" decoding="async" width="1000" height="1200" className={`${view === 'masonry' ? (index % 3 === 0 ? 'aspect-[0.82/1]' : index % 3 === 1 ? 'aspect-[1.15/1]' : 'aspect-[0.96/1]') : 'aspect-[0.98/1]'} h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]`} />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-100 transition-opacity [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 border border-white/60 bg-black/20 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">{isIllustrative ? 'Inspiration' : 'Published'}</span>
                  <span className="absolute bottom-4 left-4 right-4 text-white"><span className="block font-serif text-xl sm:text-2xl">{item.title}</span><span className="mt-1 block text-xs leading-5 text-white/80">{isIllustrative ? illustrativeLabel : item.description}</span></span>
                </button>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && <motion.div key={String(selectedItem.id)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17130f]/95 p-3 text-white sm:p-7" role="dialog" aria-modal="true" aria-label={`${selectedItem.title} image viewer`}>
          <button type="button" onClick={close} aria-label="Close image viewer" className="absolute right-3 top-3 z-10 grid h-12 w-12 place-items-center border border-white/40 bg-black/20 sm:right-6 sm:top-6"><X className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" onClick={() => moveLightbox(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/30 bg-black/25 sm:left-6 sm:h-12 sm:w-12"><ArrowLeft className="h-5 w-5" aria-hidden="true" /></button>
          <button type="button" onClick={() => moveLightbox(1)} aria-label="Next image" className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/30 bg-black/25 sm:right-6 sm:h-12 sm:w-12"><ArrowRight className="h-5 w-5" aria-hidden="true" /></button>
          <motion.figure initial={prefersReducedMotion ? false : { scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex max-h-full max-w-5xl flex-col items-center">
            <img src={selectedItem.src} alt={`${selectedItem.title}${isIllustrative ? ` · ${illustrativeLabel}` : ''}`} className="max-h-[75svh] max-w-full object-contain" />
            <figcaption className="mt-3 max-w-2xl text-center"><p className="font-serif text-xl sm:text-2xl">{selectedItem.title}</p><p className="mt-1 text-xs leading-5 text-white/70">{isIllustrative ? illustrativeLabel : selectedItem.description}</p></figcaption>
          </motion.figure>
        </motion.div>}
      </AnimatePresence>
    </main>
  );
}
