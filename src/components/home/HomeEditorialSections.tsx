import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { brandConfig } from '../../config/brandConfig';
import { demoPhotos, illustrativeLabel } from '../../data/demoMedia';
import { demoPortfolioItems, demoVenues } from '../../data/demoCmsData';
import { usePublishedPortfolio, usePublishedVenues } from '../../hooks/usePublishedContent';
import type { RibbonImage } from '../ImmersiveImageRibbon';
import ImmersiveImageRibbon from '../ImmersiveImageRibbon';
import { EditableImage } from '../WebsiteImageEditor';

gsap.registerPlugin(ScrollTrigger);

function HomeSectionHeading({ eyebrow, title, description, dark = false }: { eyebrow: string; title: string; description?: string; dark?: boolean }) {
  return (
    <div className="mb-6 max-w-2xl sm:mb-9">
      <p className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] sm:text-xs ${dark ? 'text-[#d8c49e]' : 'text-[#96784a]'}`}>{eyebrow}</p>
      <h2 className={`font-serif text-[clamp(1.85rem,8vw,3.5rem)] leading-[1.03] tracking-[-0.035em] ${dark ? 'text-[#faf7f0]' : 'text-[#30251f]'}`}>{title}</h2>
      {description && <p className={`mt-3 max-w-xl text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 ${dark ? 'text-white/75' : 'text-[#6b5f56]'}`}>{description}</p>}
    </div>
  );
}

function FeaturedStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!frameRef.current || prefersReducedMotion) return;
    gsap.fromTo(frameRef.current, { clipPath: 'inset(0 0 15% 0)', y: 16 }, {
      clipPath: 'inset(0 0 0 0)', y: 0, duration: 0.9, ease: 'power3.out', immediateRender: false,
      scrollTrigger: { trigger: frameRef.current, start: 'top 84%', once: true },
    });
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <>
    <section className="bg-[#f4ede3] py-8 sm:py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-end gap-4 px-5 sm:px-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-12 lg:px-12">
        <p className="max-w-[13rem] text-[10px] font-semibold uppercase leading-5 tracking-[0.2em] text-[#755b38] sm:text-xs lg:pb-2">Fairy Wed Stories<br />Wedding planning · design</p>
        <div>
          <p className="max-w-5xl font-serif text-[clamp(1.65rem,6vw,3.5rem)] leading-[1.04] tracking-[-0.035em] text-[#30251f]">Thoughtful planning, beautiful design and attentive hospitality <span className="font-normal italic text-[#8d6c43]">for celebrations shaped around you.</span></p>
          {brandConfig.features.demoMode && <p className="mt-3 text-[10px] leading-5 text-[#756a60]">Client preview · proposed copy and illustrative imagery.</p>}
        </div>
      </div>
    </section>

    <section ref={sectionRef} className="bg-[#faf7f0] py-10 sm:py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-7 px-5 sm:px-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:px-12">
        <div ref={frameRef} className="relative overflow-hidden bg-[#e8ded0]">
          <EditableImage slotKey="home.experiences.featured" src={demoPhotos.garden} alt="Illustrative garden wedding inspiration, not a Fairy Wed Stories event" loading="lazy" decoding="async" width="1200" height="1400" className="aspect-[0.96/1] w-full object-cover object-center sm:aspect-[1.22/1] lg:aspect-[0.98/1]" />
          <span className="absolute left-3 top-3 bg-[#faf7f0]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#30251f] sm:left-5 sm:top-5 sm:px-4 sm:text-[10px]">A visual story · 01</span>
          <p className="absolute bottom-3 right-3 bg-[#faf7f0]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#30251f] backdrop-blur sm:bottom-5 sm:right-5 sm:px-4 sm:text-[10px]">Illustrative inspiration</p>
        </div>
        <div className="py-1 lg:py-10">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#96784a] sm:text-xs">A considered approach</p>
          <h2 className="max-w-xl font-serif text-[clamp(2.55rem,10vw,5.25rem)] leading-[0.94] tracking-[-0.045em] text-[#30251f]">Beautiful celebrations <span className="italic text-[#8d6c43]">begin with your story.</span></h2>
          <p className="mt-5 text-sm leading-6 text-[#554c43] sm:text-base sm:leading-7">
            At Fairy Wed Stories, we bring together wedding planning, creative design, hospitality and event coordination to shape celebrations around your vision, traditions and the people who matter most.
          </p>
          <p className="mt-4 text-sm leading-6 text-[#554c43] sm:text-base sm:leading-7">
            From intimate gatherings to destination wedding celebrations, our approach brings the many elements of your wedding together into one considered experience.
          </p>
          <p className="mt-4 text-xs leading-5 text-[#756a60]">Proposed brand copy for client review · preview imagery is illustrative.</p>
          <Link to="/about" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#755b38] underline decoration-[#b89a65] underline-offset-8 transition-colors hover:text-[#30251f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b89a65]">
            Explore our approach <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
    </>
  );
}

const filmFrames = [
  { title: 'A quiet beginning', src: demoPhotos.hero },
  { title: 'The gathering', src: demoPhotos.reception },
  { title: 'A moment outdoors', src: demoPhotos.couple },
  { title: 'Details in bloom', src: demoPhotos.details },
];

function WeddingFilmGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [currentSnap, setCurrentSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => { setCurrentSnap(emblaApi.selectedScrollSnap()); setSnapCount(emblaApi.scrollSnapList().length); };
    sync();
    emblaApi.on('select', sync);
    emblaApi.on('reInit', sync);
    return () => { emblaApi.off('select', sync); emblaApi.off('reInit', sync); };
  }, [emblaApi]);

  return (
    <section className="overflow-hidden bg-[#30251f] py-10 text-[#faf7f0] sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <HomeSectionHeading eyebrow="Wedding films · visual direction" title="Stories in motion" description="A cinematic moodboard for the feeling, rhythm and details of a celebration." dark />
          <div className="mb-8 hidden shrink-0 gap-2 sm:flex">
            <button type="button" onClick={() => emblaApi?.scrollPrev()} disabled={!emblaApi?.canScrollPrev()} aria-label="Previous film inspiration" className="grid h-12 w-12 place-items-center border border-white/30 transition hover:bg-white/10 disabled:opacity-40"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
            <button type="button" onClick={() => emblaApi?.scrollNext()} disabled={!emblaApi?.canScrollNext()} aria-label="Next film inspiration" className="grid h-12 w-12 place-items-center border border-white/30 transition hover:bg-white/10 disabled:opacity-40"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
          </div>
        </div>
        <div ref={emblaRef} className="overflow-hidden" role="region" aria-label="Wedding film inspiration carousel" aria-roledescription="carousel">
          <div className="-ml-3 flex touch-pan-y sm:-ml-4">
            {filmFrames.map((frame) => (
              <article key={frame.title} className="min-w-0 flex-[0_0_82%] pl-3 sm:flex-[0_0_48%] sm:pl-4 lg:flex-[0_0_32%]" aria-roledescription="slide">
                <div className="group relative aspect-[0.9/1] overflow-hidden bg-[#4b4037] sm:aspect-[0.86/1]">
                  <img src={frame.src} alt={`${frame.title} · illustrative wedding inspiration`} loading="lazy" decoding="async" width="900" height="1050" className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.025] motion-reduce:transform-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/5" aria-hidden="true" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 border border-white/40 bg-black/20 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-white backdrop-blur-sm"><Play className="h-3 w-3 fill-current" aria-hidden="true" /> Film direction</div>
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                    <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.2em] text-white/75">Illustrative still · not project footage</p>
                    <h3 className="font-serif text-xl sm:text-2xl">{frame.title}</h3>
                  </div>
                </div>
                <p className="mt-2 text-[10px] text-white/55">{illustrativeLabel}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between sm:mt-6">
          <div className="flex items-center gap-2 sm:hidden">
            <button type="button" onClick={() => emblaApi?.scrollPrev()} disabled={!emblaApi?.canScrollPrev()} aria-label="Previous film inspiration" className="grid h-11 w-11 place-items-center border border-white/30 disabled:opacity-40"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
            <button type="button" onClick={() => emblaApi?.scrollNext()} disabled={!emblaApi?.canScrollNext()} aria-label="Next film inspiration" className="grid h-11 w-11 place-items-center border border-white/30 disabled:opacity-40"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
            <span className="ml-1 text-[10px] text-white/65">Swipe to explore</span>
          </div>
          <div className="ml-auto flex items-center gap-2" role="group" aria-label="Film inspiration carousel position">
            {Array.from({ length: snapCount }, (_, index) => <button key={index} type="button" onClick={() => emblaApi?.scrollTo(index)} aria-label={`Show film group ${index + 1} of ${snapCount}`} aria-current={currentSnap === index ? 'true' : undefined} className={`h-1.5 rounded-full transition-[width,background-color] ${currentSnap === index ? 'w-8 bg-[#d8c49e]' : 'w-2 bg-white/35 hover:bg-white/70'}`} />)}
            <span className="ml-1 min-w-12 text-right font-mono text-[10px] text-white/75">{String(currentSnap + 1).padStart(2, '0')} / {String(snapCount).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [currentSnap, setCurrentSnap] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => { setCurrentSnap(emblaApi.selectedScrollSnap()); setSnapCount(emblaApi.scrollSnapList().length); };
    sync(); emblaApi.on('select', sync); emblaApi.on('reInit', sync);
    return () => { emblaApi.off('select', sync); emblaApi.off('reInit', sync); };
  }, [emblaApi]);

  return (
    <section className="bg-[#faf7f0] py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-4">
          <HomeSectionHeading eyebrow="Wedding planning · design · hospitality" title="The moments that make a wedding" description="A joined-up approach from the first gathering to the final farewell." />
          <div className="mb-8 hidden shrink-0 gap-2 sm:flex">
            <button type="button" onClick={() => emblaApi?.scrollPrev()} disabled={!emblaApi?.canScrollPrev()} aria-label="Previous service" className="grid h-12 w-12 place-items-center border border-[#d8c9b4] disabled:opacity-40"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
            <button type="button" onClick={() => emblaApi?.scrollNext()} disabled={!emblaApi?.canScrollNext()} aria-label="Next service" className="grid h-12 w-12 place-items-center border border-[#d8c9b4] disabled:opacity-40"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
          </div>
        </div>
        <div ref={emblaRef} className="overflow-hidden" role="region" aria-label="Wedding service categories" aria-roledescription="carousel">
          <div className="-ml-3 flex touch-pan-y sm:-ml-4">
            {brandConfig.serviceGroups.map((service, index) => (
              <Link key={service.id} to="/services" className="group min-w-0 flex-[0_0_82%] pl-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white sm:flex-[0_0_46%] sm:pl-4 lg:flex-[0_0_32%]" aria-label={`Explore ${service.title}`}>
                <div className="relative aspect-[0.91/1] overflow-hidden bg-[#e8ded0] sm:aspect-[0.86/1]">
                  <EditableImage slotKey={`home.services.${service.id}`} src={service.image} alt={`${service.title} · illustrative wedding inspiration`} loading="lazy" decoding="async" width="900" height="1050" className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.035] motion-reduce:transform-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-6 sm:left-6 sm:right-6">
                    <span className="mb-1 block font-mono text-[10px] text-white/75">0{index + 1}</span>
                    <h3 className="font-serif text-2xl leading-tight sm:text-3xl">{service.title}</h3>
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/85 sm:text-sm">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between sm:mt-5">
          <div className="flex gap-2 sm:hidden">
            <button type="button" onClick={() => emblaApi?.scrollPrev()} disabled={!emblaApi?.canScrollPrev()} aria-label="Previous service" className="grid h-11 w-11 place-items-center border border-[#d8c9b4] disabled:opacity-40"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
            <button type="button" onClick={() => emblaApi?.scrollNext()} disabled={!emblaApi?.canScrollNext()} aria-label="Next service" className="grid h-11 w-11 place-items-center border border-[#d8c9b4] disabled:opacity-40"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
            <span className="ml-1 self-center text-[10px] text-[#766a5f]">Swipe to explore</span>
          </div>
          <div className="ml-auto flex items-center gap-2" role="group" aria-label="Service carousel position">
            {Array.from({ length: snapCount }, (_, index) => <button key={index} type="button" onClick={() => emblaApi?.scrollTo(index)} aria-label={`Show service group ${index + 1} of ${snapCount}`} aria-current={currentSnap === index ? 'true' : undefined} className={`h-1.5 rounded-full transition-[width,background-color] ${currentSnap === index ? 'w-8 bg-[#b89a65]' : 'w-2 bg-[#d8c9b4]'}`} />)}
          </div>
        </div>
        <Link to="/services" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#755b38] underline decoration-[#b89a65] underline-offset-8">Explore all services <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </div>
    </section>
  );
}

const destinationImages = [demoPhotos.couple, demoPhotos.garden, demoPhotos.ballroom, demoPhotos.reception, demoPhotos.ceremony, demoPhotos.haldi];

function DestinationCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const destinations = [
    { name: 'Goa', note: 'Coastal celebrations' },
    { name: 'Jaipur', note: 'Regal settings' },
    { name: 'Udaipur', note: 'Lakeside inspiration' },
    { name: 'Delhi NCR', note: 'City celebrations' },
    { name: 'Bali', note: 'Island gatherings' },
    { name: 'Italy', note: 'European romance' },
  ];
  return (
    <section className="overflow-hidden bg-[#e8ded0] py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-4">
          <HomeSectionHeading eyebrow="Destination inspiration · provisional" title="Somewhere extraordinary" description="A starting point for exploring destinations Fairy Wed Stories advertises. These are not completed wedding locations." />
          <div className="mb-8 hidden shrink-0 gap-2 sm:flex">
            <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous destination inspiration" className="grid h-12 w-12 place-items-center border border-[#b8a78f]"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
            <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Next destination inspiration" className="grid h-12 w-12 place-items-center border border-[#b8a78f]"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
          </div>
        </div>
        <div ref={emblaRef} className="overflow-hidden" role="region" aria-label="Destination inspiration carousel" aria-roledescription="carousel">
          <div className="-ml-3 flex touch-pan-y sm:-ml-4">
            {destinations.map((destination, index) => (
              <article key={destination.name} className="min-w-0 flex-[0_0_78%] pl-3 sm:flex-[0_0_45%] sm:pl-4 lg:flex-[0_0_31%]">
                <div className="relative aspect-[0.95/1] overflow-hidden bg-[#d8c9b4]">
                  <img src={destinationImages[index]} alt={`${destination.name} destination inspiration`} loading="lazy" decoding="async" width="900" height="1050" className="h-full w-full object-cover transition-transform duration-700 motion-safe:hover:scale-[1.025]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-5 left-5 text-white"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75">Provisional inspiration</p><h3 className="mt-1 font-serif text-3xl">{destination.name}</h3><p className="mt-1 text-sm text-white/80">{destination.note}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-5 border-t border-[#c9b9a3] pt-6 sm:grid-cols-2 sm:gap-8">
          <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#755b38]">India · advertised destinations</p><div className="flex flex-wrap gap-2">{brandConfig.destinations.india.map((place) => <span key={place} className="border border-[#b8a78f] px-2.5 py-1.5 text-xs text-[#493c31]">{place}</span>)}</div></div>
          <div><p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#755b38]">International · advertised destinations</p><div className="flex flex-wrap gap-2">{brandConfig.destinations.international.map((place) => <span key={place} className="border border-[#b8a78f] px-2.5 py-1.5 text-xs text-[#493c31]">{place}</span>)}</div></div>
        </div>
        <p className="mt-4 text-[10px] leading-5 text-[#756a60]">Service coverage and availability are provisional and need owner confirmation before publication.</p>
      </div>
    </section>
  );
}

function ReceptionVenueCarousel() {
  const { items: publishedVenues, loading, error, source } = usePublishedVenues();
  const venues = publishedVenues.length ? publishedVenues : source === 'demo' ? demoVenues : [];
  const prefersReducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const update = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    update(); emblaApi.on('select', update); emblaApi.on('reInit', update);
    return () => { emblaApi.off('select', update); emblaApi.off('reInit', update); };
  }, [emblaApi]);

  return (
    <section className="bg-[#faf7f0] py-10 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="flex items-end justify-between gap-4">
          <HomeSectionHeading eyebrow="Venue inspiration" title="A setting worth celebrating" description="Explore visual directions for a welcoming place. No venue partnership or availability is implied." />
          <div className="mb-8 hidden gap-2 sm:flex">
            <button type="button" onClick={() => emblaApi?.scrollPrev(Boolean(prefersReducedMotion))} disabled={!emblaApi?.canScrollPrev()} aria-label="Previous venue inspiration" className="grid h-12 w-12 place-items-center border border-[#d8c9b4] disabled:opacity-40"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button>
            <button type="button" onClick={() => emblaApi?.scrollNext(Boolean(prefersReducedMotion))} disabled={!emblaApi?.canScrollNext()} aria-label="Next venue inspiration" className="grid h-12 w-12 place-items-center border border-[#d8c9b4] disabled:opacity-40"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button>
          </div>
        </div>
        {error && <p role="status" className="mb-3 text-xs text-[#755b38]">The Fairy CMS is not connected in this preview. Showing clearly labelled illustrative venue inspiration.</p>}
        {loading && venues.length === 0 && <p className="py-10 text-sm text-[#6b5f56]">Loading published venue inspiration…</p>}
        {!loading && venues.length === 0 && <p className="border border-[#d8c9b4] bg-white/70 px-5 py-8 text-center text-sm text-[#655b52]">No published venues are available yet.</p>}
        {venues.length > 0 && <>
          <div ref={emblaRef} className="overflow-hidden" role="region" aria-label="Venue inspiration carousel" aria-roledescription="carousel">
            <div className="-ml-3 flex touch-pan-y sm:-ml-4">
              {venues.map((venue, index) => (
                <article key={venue.id} className="min-w-0 flex-[0_0_91%] pl-3 sm:flex-[0_0_74%] sm:pl-4 lg:flex-[0_0_56%]" aria-roledescription="slide">
                  <div className="relative aspect-[1.08/0.9] min-h-[300px] overflow-hidden bg-[#d5c9bc] sm:min-h-[380px]">
                    <img src={venue.src} alt={`${venue.title} · illustrative setting, no partnership implied`} loading="lazy" decoding="async" width="1200" height="950" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" aria-hidden="true" />
                    <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-8 sm:left-8"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75">Setting inspiration · 0{index + 1}</p><h3 className="mt-2 font-serif text-3xl sm:text-4xl">{venue.title}</h3><p className="mt-2 max-w-xl text-sm leading-6 text-white/85">{venue.description}</p></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2 sm:hidden"><button type="button" onClick={() => emblaApi?.scrollPrev(Boolean(prefersReducedMotion))} disabled={!emblaApi?.canScrollPrev()} aria-label="Previous venue inspiration" className="grid h-11 w-11 place-items-center border border-[#d8c9b4] disabled:opacity-40"><ChevronLeft className="h-5 w-5" aria-hidden="true" /></button><button type="button" onClick={() => emblaApi?.scrollNext(Boolean(prefersReducedMotion))} disabled={!emblaApi?.canScrollNext()} aria-label="Next venue inspiration" className="grid h-11 w-11 place-items-center border border-[#d8c9b4] disabled:opacity-40"><ChevronRight className="h-5 w-5" aria-hidden="true" /></button><span className="ml-1 self-center text-[10px] text-[#766a5f]">Swipe to explore</span></div>
            <div className="ml-auto flex items-center gap-2"><span className="font-mono text-[10px] text-[#665b52]">{String(currentSlide + 1).padStart(2, '0')} / {String(venues.length).padStart(2, '0')}</span><span className="h-px w-12 bg-[#cbbba2] sm:w-20"><span className="block h-px bg-[#b89a65] transition-[width]" style={{ width: `${((currentSlide + 1) / venues.length) * 100}%` }} /></span></div>
          </div>
        </>}
      </div>
    </section>
  );
}

function SocialWall() {
  const { items: portfolio, loading, source, error } = usePublishedPortfolio(demoPortfolioItems);
  const rows = useMemo<RibbonImage[]>(() => {
    const configured = portfolio.filter((item) => item.type === 'image' && item.src);
    const items = configured.map((item, index) => ({
      id: item.id,
      src: item.src,
      alt: source === 'demo' ? `${item.title} · ${illustrativeLabel}` : item.title,
      row: item.socialWallRow ?? (((index % 3) + 1) as 1 | 2 | 3),
      order: item.socialWallSortOrder ?? index,
      portfolioItemId: item.id,
      aspect: (['portrait', 'landscape', 'square', 'landscape'][index % 4]) as RibbonImage['aspect'],
    }));
    return configured.length ? items : source === 'demo' ? demoPortfolioItems.map((item) => ({ id: item.id, src: item.src, alt: `${item.title} · ${illustrativeLabel}`, row: item.socialWallRow, order: item.socialWallSortOrder, portfolioItemId: item.id, aspect: 'square' as const })) : [];
  }, [portfolio, source]);

  return <>
    {loading && <p className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-[#655b52]" role="status">Loading published wedding moments…</p>}
    {error && !loading && <p className="mx-auto max-w-7xl px-4 py-3 text-center text-xs text-[#755b38]" role="status">Published content is temporarily unavailable. {brandConfig.features.demoMode ? 'The images below are illustrative inspiration.' : 'Please check back soon.'}</p>}
    {source === 'cms' && !loading && rows.length === 0 && <p className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-[#655b52]" role="status">New wedding moments will appear here when they are approved and published.</p>}
    <ImmersiveImageRibbon items={rows} eyebrow="Follow The Magic" title="SOCIAL WALL" description={source === 'demo' ? illustrativeLabel : 'Wedding moments from published Fairy Wed Stories projects.'} ctaLabel="Explore wedding inspiration" ctaTo="/portfolio" ariaLabel="Fairy Wed Stories inspiration wall" variant="social-wall" editableSlotKey={source === 'cms' ? (item) => `home.moments.portfolio-${item.portfolioItemId ?? item.id}` : undefined} />
  </>;
}

function ClosingContact() {
  return (
    <section className="relative isolate flex min-h-[380px] items-end overflow-hidden bg-[#30251f] text-white sm:min-h-[460px] lg:min-h-[560px]">
      <img src={demoPhotos.couple} alt="Illustrative wedding inspiration for a destination celebration" loading="lazy" decoding="async" width="1800" height="1100" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/85 via-[#17130f]/30 to-transparent" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/75 sm:text-xs">A considered beginning</p>
        <h2 className="max-w-3xl font-serif text-[clamp(2.2rem,9vw,5rem)] leading-[0.98] tracking-[-0.035em]">Your Story. Your Celebration. Your Forever.</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base">Tell us what you are dreaming of, and discover how your wedding celebration could come together.</p>
        <Link to="/contact" className="mt-6 inline-flex min-h-12 items-center gap-3 border border-white/75 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#30251f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:mt-8 sm:min-h-14 sm:px-7 sm:text-base">
          Let’s Plan Your Wedding <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

export default function HomeEditorialSections() {
  return <>
    <section className="bg-[#faf7f0] px-5 py-8 sm:px-8 sm:py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-3 border-l border-[#b89a65] pl-4 sm:gap-4 sm:pl-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#755b38] sm:text-xs">Fairy Wed Stories · Wedding planning</p>
        <p className="max-w-3xl font-serif text-xl leading-snug tracking-[-0.02em] text-[#30251f] sm:text-2xl lg:text-[2rem]">Thoughtful planning, beautiful design and attentive hospitality for celebrations shaped around you.</p>
      </div>
      {brandConfig.features.demoMode && <p className="mx-auto mt-4 max-w-7xl px-1 text-[10px] leading-5 text-[#756a60]">Client preview · Proposed copy and illustrative imagery are shown for presentation only.</p>}
    </section>
    <FeaturedStory />
    <WeddingFilmGallery />
    <SocialWall />
    <ServiceGallery />
    {brandConfig.features.destinationInspiration && <DestinationCarousel />}
    <ReceptionVenueCarousel />
    <ClosingContact />
  </>;
}
