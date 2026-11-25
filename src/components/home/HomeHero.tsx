import { useCallback, useEffect, useMemo, useRef, useState, type FocusEvent } from 'react';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { EditableImage } from '../WebsiteImageEditor';
import { brandConfig } from '../../config/brandConfig';
import { demoPhotos } from '../../data/demoMedia';

gsap.registerPlugin(ScrollTrigger);

const heroImages = [
  { src: demoPhotos.hero, position: '55% 43%' },
  { src: demoPhotos.celebration, position: '50% 44%' },
  { src: demoPhotos.ceremony, position: '52% 48%' },
];

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const options = useMemo(() => ({ align: 'start' as const, loop: true, duration: 28 }), []);
  const plugins = useMemo(() => [Fade()], []);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const isPlaying = !prefersReducedMotion && autoRotate && !hasInteracted && !pointerInside && !focusWithin;

  useEffect(() => {
    if (!emblaApi) return;
    const syncSlide = () => setCurrentSlide(emblaApi.selectedScrollSnap());
    const stopOnSwipe = () => setHasInteracted(true);
    syncSlide();
    emblaApi.on('select', syncSlide);
    emblaApi.on('reInit', syncSlide);
    emblaApi.on('pointerDown', stopOnSwipe);
    return () => {
      emblaApi.off('select', syncSlide);
      emblaApi.off('reInit', syncSlide);
      emblaApi.off('pointerDown', stopOnSwipe);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !isPlaying) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') emblaApi.scrollNext();
    }, 7000);
    return () => window.clearInterval(timer);
  }, [emblaApi, isPlaying]);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

    gsap.to(section.querySelectorAll<HTMLElement>('.fairy-hero-parallax'), {
      yPercent: 2,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7,
        invalidateOnRefresh: true,
      },
    });
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  const moveSlide = useCallback((direction: 'next' | 'previous') => {
    setHasInteracted(true);
    if (direction === 'next') emblaApi?.scrollNext(Boolean(prefersReducedMotion));
    else emblaApi?.scrollPrev(Boolean(prefersReducedMotion));
  }, [emblaApi, prefersReducedMotion]);

  const toggleRotation = () => {
    if (isPlaying) {
      setAutoRotate(false);
      return;
    }
    setHasInteracted(false);
    setAutoRotate(true);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[620px] h-[100svh] items-end overflow-hidden bg-[#24191b] text-white"
      aria-label={`${brandConfig.name} wedding planning and design`}
    >
      <div
        className="absolute inset-0"
        onMouseEnter={() => setPointerInside(true)}
        onMouseLeave={() => setPointerInside(false)}
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={handleBlur}
      >
        <div ref={emblaRef} className="absolute inset-0 overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Featured wedding photography">
          <div className="flex h-full touch-pan-y">
            {heroImages.map(({ src, position }, index) => (
              <div
                key={src}
                className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${heroImages.length}`}
                aria-hidden={index !== currentSlide}
              >
                <div className="fairy-hero-parallax absolute -inset-y-[4%] inset-x-0">
                  <div className="fairy-hero-reveal absolute inset-0" data-active={index === currentSlide}>
                    <EditableImage
                      slotKey={`home.hero.slide-${String(index + 1).padStart(2, '0')}`}
                      src={src}
                      alt=""
                      width="1920"
                      height="1280"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      style={{ objectPosition: position }}
                      className="fairy-hero-photo h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1b1113]/85 via-[#1b1113]/35 to-[#1b1113]/10" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-[6.5rem] pt-32 sm:px-10 sm:pb-28 lg:px-16 lg:pb-32">
        <motion.div
          className="max-w-3xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.12 }}
        >
          <p className="mb-4 flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f3e7d5] sm:mb-5 sm:text-xs sm:tracking-[0.28em]">
            <Sparkles className="h-4 w-4 text-[#d9bd8b]" aria-hidden="true" />
            Wedding planning · design · destinations
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,11vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.045em] text-white">
            Every Love Story
            <span className="mt-1 block font-normal italic text-[#dfc99e] sm:mt-2">Deserves a Little Magic.</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/85 sm:mt-6 sm:text-lg sm:leading-7">
            Thoughtfully planned weddings, extraordinary destinations and celebrations that feel uniquely yours.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:mt-9">
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#B89A65] px-6 py-3 text-sm font-semibold text-[#241c15] shadow-[0_10px_36px_rgba(32,12,19,.28)] transition-colors hover:bg-[#D2B781] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:min-h-14 sm:px-7 sm:text-base"
            >
              Begin Your Wedding Story <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/services"
              className="inline-flex min-h-12 items-center px-1 text-sm font-medium text-white/90 underline decoration-white/45 underline-offset-8 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
            >
              Explore Our Services
            </Link>
          </div>
          {brandConfig.features.demoMode && <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.15em] text-white/65">Illustrative photography · client preview</p>}
        </motion.div>
      </div>

      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-5 right-5 z-20 flex items-center justify-between sm:left-10 sm:right-10 lg:left-16 lg:right-16">
        <button
          type="button"
          onClick={() => sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })}
          className="inline-flex min-h-11 items-center gap-2 text-xs font-medium tracking-wide text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-sm"
        >
          <ArrowDown className="h-4 w-4" aria-hidden="true" /> Scroll to explore
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button type="button" onClick={() => moveSlide('previous')} className="grid h-11 w-11 place-items-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="Previous hero image">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="min-w-[3.5rem] text-center font-mono text-[11px] tracking-[0.1em] text-white/85" aria-live="polite">
            {String(currentSlide + 1).padStart(2, '0')} <span className="text-white/45">/</span> {String(heroImages.length).padStart(2, '0')}
          </span>
          <button type="button" onClick={() => moveSlide('next')} className="grid h-11 w-11 place-items-center rounded-full border border-white/35 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="Next hero image">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggleRotation}
            disabled={Boolean(prefersReducedMotion)}
            className="grid h-11 w-11 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isPlaying ? 'Pause automatic hero image rotation' : 'Resume automatic hero image rotation'}
            aria-pressed={!isPlaying}
            title={prefersReducedMotion ? 'Automatic motion is disabled by your motion preference' : undefined}
          >
            {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-px bg-white/20" aria-hidden="true">
        <div className="h-full bg-[#d5b77e] transition-[width] duration-500" style={{ width: `${((currentSlide + 1) / heroImages.length) * 100}%` }} />
      </div>
    </section>
  );
}
