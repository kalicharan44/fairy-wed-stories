import { useRef } from 'react';
import { ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react';
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

const approach = [
  { number: '01', title: 'Listen closely', copy: 'We begin with your priorities, the traditions you want to carry forward and the people you are bringing together.' },
  { number: '02', title: 'Shape the experience', copy: 'A considered plan connects the setting, visual direction, schedule and guest journey into one coherent celebration.' },
  { number: '03', title: 'Coordinate the details', copy: 'The plan gives your chosen team and specialist providers a clear way to work together through each event.' },
];

export default function AboutUs() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (!pageRef.current || prefersReducedMotion) return;
    gsap.utils.toArray<HTMLElement>('.fairy-about-parallax').forEach((image, index) => {
      gsap.fromTo(image, { yPercent: index % 2 ? 5 : -4, scale: 1.07 }, {
        yPercent: index % 2 ? -4 : 5, scale: 1.12, ease: 'none',
        scrollTrigger: { trigger: image.closest('[data-parallax-frame]') ?? image, start: 'top bottom', end: 'bottom top', scrub: 0.85 },
      });
    });
  }, { scope: pageRef, dependencies: [prefersReducedMotion] });

  return (
    <main ref={pageRef} className="overflow-hidden bg-[#faf7f0] text-[#30251f]">
      <section className="relative px-5 pb-10 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl">
            <p className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#96784a] sm:text-xs"><Sparkles className="h-4 w-4" aria-hidden="true" /> A considered approach</p>
            <h1 className="font-serif text-[clamp(2.8rem,11vw,6.8rem)] leading-[0.94] tracking-[-0.05em]">Beautiful Celebrations <span className="block font-normal italic text-[#96784a]">Begin with Your Story.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#62574d] sm:mt-8 sm:text-lg sm:leading-8">At Fairy Wed Stories, we bring together wedding planning, creative design, hospitality and event coordination to shape celebrations around your vision, traditions and the people who matter most.</p>
          </motion.div>
          <div className="mt-10 grid items-end gap-3 sm:mt-14 sm:grid-cols-[1.25fr_0.75fr] sm:gap-5 lg:mt-20">
            <div data-parallax-frame className="relative aspect-[1.18/1] overflow-hidden bg-[#e8ded0] sm:aspect-[1.35/0.85]">
              <EditableImage slotKey="about.story-01" src={demoPhotos.couple} alt={`Illustrative South Asian wedding couple at an outdoor celebration. ${illustrativeLabel}.`} loading="lazy" decoding="async" width="1400" height="1100" className="fairy-about-parallax h-[112%] w-full object-cover" />
              <span className="absolute bottom-4 left-4 border border-white/55 bg-black/25 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.17em] text-white backdrop-blur-sm">Illustrative wedding inspiration</span>
            </div>
            <div data-parallax-frame className="relative aspect-[0.9/1] overflow-hidden bg-[#e8ded0] sm:aspect-[0.78/1]">
              <EditableImage slotKey="about.story-02" src={demoPhotos.details} alt={`Illustrative close-up of henna and wedding jewellery. ${illustrativeLabel}.`} loading="lazy" decoding="async" width="900" height="1100" className="fairy-about-parallax h-[112%] w-full object-cover" />
              <span className="absolute bottom-4 left-4 max-w-[12rem] text-[9px] font-semibold uppercase tracking-[0.16em] text-white drop-shadow">An illustrative detail study</span>
            </div>
          </div>
          <p className="mt-3 text-[10px] leading-5 text-[#756a60]">Proposed brand copy · photographs are licensed illustrative stock, not Fairy Wed Stories client work.</p>
        </div>
      </section>

      <ImmersiveImageRibbon
        items={[
          { id: 'fairy-about-01', src: demoPhotos.hero, alt: 'Illustrative Indian bride and groom beneath a floral canopy', aspect: 'portrait' },
          { id: 'fairy-about-02', src: demoPhotos.reception, alt: 'Illustrative wedding reception table with floral details', aspect: 'landscape' },
          { id: 'fairy-about-03', src: demoPhotos.garden, alt: 'Illustrative Indian wedding mandap with traditional floral decor', aspect: 'square' },
          { id: 'fairy-about-04', src: demoPhotos.ceremony, alt: 'Illustrative Indian couple at a wedding ceremony', aspect: 'landscape' },
          { id: 'fairy-about-05', src: demoPhotos.details, alt: 'Illustrative close-up of henna-adorned wedding hands', aspect: 'portrait' },
        ]}
        eyebrow="Planning · design · hospitality"
        title="One considered experience"
        description="A visual moodboard for the way each part of a celebration can feel connected. Illustrative imagery only."
        ctaLabel="Explore services"
        ctaTo="/services"
        ariaLabel="Illustrative wedding moodboard"
        variant="portfolio"
      />

      <section className="px-5 py-12 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#96784a]">How we think about a wedding</p>
            <h2 className="font-serif text-[clamp(2.2rem,8vw,4.5rem)] leading-[0.98] tracking-[-0.04em]">A thoughtful plan. A feeling that is yours.</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#62574d] sm:text-base sm:leading-7">From intimate gatherings to destination wedding celebrations, our approach brings the many elements of your wedding together into one considered experience.</p>
            <p className="mt-4 text-xs text-[#756a60]">Proposed copy pending owner review.</p>
          </div>
          <div className="divide-y divide-[#d8c9b4] border-y border-[#d8c9b4]">
            {approach.map((step, index) => (
              <motion.article key={step.number} initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.55, delay: index * 0.08 }} className="grid gap-3 py-6 sm:grid-cols-[4rem_1fr] sm:gap-5 sm:py-8">
                <span className="font-mono text-[11px] tracking-[0.15em] text-[#96784a]">{step.number}</span>
                <div><h3 className="font-serif text-2xl sm:text-3xl">{step.title}</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-[#62574d] sm:text-base sm:leading-7">{step.copy}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-[#e8ded0] lg:grid-cols-2">
        <div className="relative min-h-[340px] overflow-hidden sm:min-h-[500px]">
          <EditableImage slotKey="about.story-03" src={demoPhotos.reception} alt={`Illustrative table setting. ${illustrativeLabel}.`} loading="lazy" decoding="async" width="1400" height="1000" className="fairy-about-parallax absolute inset-0 h-[112%] w-full object-cover" />
          <span className="absolute bottom-4 left-4 bg-[#faf7f0]/90 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em]">Illustrative reception inspiration</span>
        </div>
        <div className="flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-20 lg:px-16 lg:py-24">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#755b38]">Celebrations shaped around you</p>
          <h2 className="max-w-xl font-serif text-[clamp(2.1rem,7vw,4rem)] leading-[1.02] tracking-[-0.035em]">The details come together when the people do.</h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#62574d] sm:text-base sm:leading-7">A wedding brings together family, culture, place and many moving parts. Fairy Wed Stories’ proposed approach connects planning, design, hospitality and event coordination around the priorities you share.</p>
          <Link to="/contact" className="mt-7 inline-flex min-h-12 w-fit items-center gap-3 border border-[#755b38] px-5 text-sm font-semibold text-[#30251f] transition-colors hover:bg-[#755b38] hover:text-white"><span>Begin your wedding story</span><ArrowDownRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="px-5 py-12 text-center sm:px-8 sm:py-20 lg:px-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#96784a]">A new beginning</p>
        <h2 className="mx-auto mt-3 max-w-4xl font-serif text-[clamp(2.2rem,8vw,4.5rem)] leading-[1] tracking-[-0.04em]">Every love story deserves a little magic.</h2>
        <Link to="/contact" className="mt-7 inline-flex min-h-12 items-center gap-3 bg-[#30251f] px-6 text-sm font-semibold text-[#faf7f0] transition-colors hover:bg-[#57452d]">Let’s begin <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        {brandConfig.features.demoMode && <p className="mx-auto mt-4 max-w-xl text-[10px] leading-5 text-[#756a60]">{brandConfig.name} identity, service descriptions and all copy on this page are provisional and awaiting owner approval.</p>}
      </section>
    </main>
  );
}
