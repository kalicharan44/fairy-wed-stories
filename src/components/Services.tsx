import { useRef } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { brandConfig } from '../config/brandConfig';
import { demoPhotos, illustrativeLabel } from '../data/demoMedia';
import ImmersiveImageRibbon from './ImmersiveImageRibbon';
import { EditableImage } from './WebsiteImageEditor';

gsap.registerPlugin(ScrollTrigger);

const destinationHighlights = [
  { name: 'Goa', note: 'Coastal celebrations', image: demoPhotos.couple },
  { name: 'Jaipur', note: 'Palace-inspired settings', image: demoPhotos.ballroom },
  { name: 'Delhi NCR', note: 'City celebrations', image: demoPhotos.reception },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!sectionRef.current || prefersReducedMotion) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.fairy-service-photo').forEach((photo, index) => {
        gsap.fromTo(photo, { yPercent: index % 2 ? 5 : -4, scale: 1.05 }, {
          yPercent: index % 2 ? -4 : 5, scale: 1.1, ease: 'none',
          scrollTrigger: { trigger: photo.closest('[data-service-frame]') ?? photo, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        });
      });
    });
    return () => media.revert();
  }, { scope: sectionRef, dependencies: [prefersReducedMotion] });

  return (
    <main ref={sectionRef} className="overflow-hidden bg-[#faf7f0] text-[#30251f]">
      <section className="relative px-5 pb-10 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} className="grid gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-12">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#96784a] sm:text-xs"><Sparkles className="h-4 w-4" aria-hidden="true" /> Wedding planning · design · destinations</p>
              <h1 className="font-serif text-[clamp(2.75rem,10vw,6rem)] leading-[0.94] tracking-[-0.05em]">A celebration, <span className="block italic text-[#96784a]">thoughtfully connected.</span></h1>
            </div>
            <div className="max-w-xl lg:justify-self-end">
              <p className="text-base leading-7 text-[#62574d] sm:text-lg sm:leading-8">Planning, design and guest care for celebrations shaped around what matters to you.</p>
              <p className="mt-3 text-xs leading-5 text-[#756a60]">Proposed service descriptions for client review. Delivery scope and provider relationships must be confirmed before publication.</p>
              <Link to="/contact" className="mt-5 inline-flex min-h-12 items-center gap-3 border border-[#755b38] px-5 text-sm font-semibold text-[#30251f] transition-colors hover:bg-[#755b38] hover:text-white">Begin your wedding story <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-20 lg:px-12">
        <div className="divide-y divide-[#d8c9b4] border-y border-[#d8c9b4]">
          {brandConfig.serviceGroups.map((group, index) => (
            <motion.article key={group.id} initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.6 }} className={`grid gap-5 py-7 sm:py-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12 ${index % 2 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
              <div data-service-frame className="relative aspect-[1.16/0.9] overflow-hidden bg-[#e8ded0] sm:aspect-[1.35/0.9]">
                <EditableImage slotKey={`services.${group.id}`} src={group.image} alt={`${group.title} · ${illustrativeLabel}`} loading="lazy" decoding="async" width="1400" height="1000" className="fairy-service-photo h-[112%] w-full object-cover" />
                <span className="absolute bottom-3 left-3 bg-[#faf7f0]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#30251f]">Illustrative inspiration · 0{index + 1}</span>
              </div>
              <div className="py-1 lg:py-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#96784a]">Service {String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-2 font-serif text-[clamp(1.8rem,6vw,3rem)] leading-[1.04] tracking-[-0.035em]">{group.title}</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#62574d] sm:text-base sm:leading-7">{group.description}</p>
                <ul className="mt-5 grid gap-x-7 gap-y-2 sm:grid-cols-2">
                  {group.items.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-[#4f463e]"><Check className="mt-1 h-4 w-4 shrink-0 text-[#96784a]" aria-hidden="true" /><span>{item}</span></li>)}
                </ul>
                {group.id === 'curated-services' && <p className="mt-4 border-l border-[#b89a65] pl-3 text-xs leading-5 text-[#756a60]">These specialist services are described as coordination only. Direct delivery and provider relationships require owner confirmation.</p>}
              </div>
            </motion.article>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#756a60]">Pricing is enquiry-based in this preview. No packages, rates, staffing levels or guarantees are stated.</p>
      </section>

      <section className="bg-[#e8ded0] px-5 py-12 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 max-w-3xl">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#755b38]">Destination inspiration · provisional</p>
            <h2 className="font-serif text-[clamp(2.2rem,8vw,4.2rem)] leading-[0.98] tracking-[-0.04em]">A setting that becomes part of the story.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#62574d] sm:text-base sm:leading-7">Fairy Wed Stories advertises destination planning for these places. This presentation is inspiration, not a record of completed weddings or confirmed availability.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
            {destinationHighlights.map((place) => <article key={place.name} className="relative aspect-[1/1.02] overflow-hidden bg-[#d4c6b4] sm:aspect-[0.88/1]"><img src={place.image} alt={`${place.name} wedding destination inspiration`} loading="lazy" decoding="async" width="900" height="1050" className="h-full w-full object-cover transition-transform duration-700 motion-safe:hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 text-white"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/75">Provisional inspiration</p><h3 className="mt-1 font-serif text-3xl">{place.name}</h3><p className="text-sm text-white/80">{place.note}</p></div></article>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">{brandConfig.destinations.india.map((place) => <span key={`in-${place}`} className="border border-[#b8a78f] bg-[#faf7f0]/45 px-2.5 py-1.5 text-xs text-[#493c31]">{place}</span>)}{brandConfig.destinations.international.map((place) => <span key={`out-${place}`} className="border border-[#b8a78f] bg-[#faf7f0]/45 px-2.5 py-1.5 text-xs text-[#493c31]">{place}</span>)}</div>
          <p className="mt-4 text-[10px] leading-5 text-[#756a60]">The listed destinations are supplied research and remain subject to Fairy Wed Stories owner confirmation.</p>
        </div>
      </section>

      <ImmersiveImageRibbon
        items={[
          { id: 'services-design', src: demoPhotos.hero, alt: 'Illustrative wedding design inspiration', aspect: 'portrait' },
          { id: 'services-table', src: demoPhotos.reception, alt: 'Illustrative reception table setting', aspect: 'landscape' },
          { id: 'services-garden', src: demoPhotos.garden, alt: 'Illustrative outdoor ceremony', aspect: 'square' },
          { id: 'services-detail', src: demoPhotos.details, alt: 'Illustrative wedding detail', aspect: 'portrait' },
        ]}
        eyebrow="The experience, in detail"
        title="Each gathering has its own feeling"
        description={illustrativeLabel}
        ctaLabel="Contact Fairy Wed Stories"
        ctaTo="/contact"
        ariaLabel="Illustrative wedding planning and design imagery"
        variant="services"
      />

      <section className="px-5 py-12 text-center sm:px-8 sm:py-20 lg:px-12">
        <h2 className="mx-auto max-w-3xl font-serif text-[clamp(2.1rem,7vw,4.25rem)] leading-[1] tracking-[-0.04em]">A plan that leaves room for the moments.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#62574d] sm:text-base">Share the outline of what you are imagining. Live enquiry submission is not configured in this client preview.</p>
        <Link to="/contact" className="mt-6 inline-flex min-h-12 items-center gap-3 bg-[#30251f] px-6 text-sm font-semibold text-[#faf7f0] transition-colors hover:bg-[#57452d]">Let’s plan your wedding <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
