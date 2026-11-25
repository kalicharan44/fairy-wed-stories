import { ArrowRight, CalendarDays, Instagram, MapPin, Phone, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../config/brandConfig';
import { demoPhotos } from '../data/demoMedia';

const fieldClass = 'mt-1 min-h-12 w-full border border-[#d8c9b4] bg-[#faf7f0] px-3 text-sm text-[#62574d] placeholder:text-[#998d81] disabled:cursor-not-allowed disabled:opacity-75';

export default function Contact() {
  return (
    <main className="overflow-hidden bg-[#faf7f0] text-[#30251f]">
      <section className="relative flex min-h-[38svh] items-end overflow-hidden bg-[#30251f] text-white sm:min-h-[48svh]">
        <img src={demoPhotos.couple} alt="Illustrative destination wedding inspiration" width="1800" height="1100" loading="eager" className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130f]/85 via-black/25 to-black/10" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-9 pt-28 sm:px-8 sm:pb-14 lg:px-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75">A considered beginning</p>
          <h1 className="max-w-4xl font-serif text-[clamp(2.6rem,10vw,5.6rem)] leading-[0.96] tracking-[-0.045em]">Tell us what you’re dreaming of.</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">Share a little about the celebration you have in mind. We’ll shape the next conversation around what matters to you.</p>
        </div>
      </section>

      <section id="contact" className="px-5 py-8 sm:px-8 sm:py-14 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="border border-[#e1d6c8] bg-white/70 p-4 shadow-[0_18px_45px_rgba(48,37,31,.06)] sm:p-7 lg:p-9">
            <div className="mb-5 flex items-center gap-3 sm:mb-7">
              <span className="grid h-11 w-11 place-items-center bg-[#e8ded0]"><Send className="h-5 w-5 text-[#755b38]" aria-hidden="true" /></span>
              <div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#96784a]">Start a conversation</p><h2 className="font-serif text-2xl sm:text-3xl">Your wedding story</h2></div>
            </div>
            <div id="contact-demo-notice" role="status" className="mb-5 border-l-2 border-[#b89a65] bg-[#f4ede3] px-3 py-3 text-xs leading-5 text-[#574b40] sm:px-4">
              <strong className="block text-[#30251f]">Client preview · live submission is not configured.</strong>
              This form is disabled. No details can be entered, sent or saved in this demonstration.
            </div>
            <form onSubmit={(event) => event.preventDefault()} aria-describedby="contact-demo-notice">
              <fieldset disabled className="grid gap-4 sm:grid-cols-2">
                <legend className="sr-only">Enquiry form preview</legend>
                <label className="text-xs font-medium">Your name<input className={fieldClass} name="name" autoComplete="name" placeholder="Your full name" /></label>
                <label className="text-xs font-medium">Email address<input className={fieldClass} name="email" type="email" autoComplete="email" placeholder="you@example.com" /></label>
                <label className="text-xs font-medium">Phone number<input className={fieldClass} name="phone" type="tel" autoComplete="tel" placeholder="+91" /></label>
                <label className="text-xs font-medium">Event date<input className={fieldClass} name="eventDate" type="date" /></label>
                <label className="text-xs font-medium">Celebration type<select className={fieldClass} name="eventType" defaultValue=""><option value="">Choose a celebration</option><option>Wedding</option><option>Haldi</option><option>Mehendi</option><option>Sangeet</option><option>Reception</option></select></label>
                <label className="text-xs font-medium">Destination or venue<input className={fieldClass} name="venue" placeholder="If you have a place in mind" /></label>
                <label className="text-xs font-medium">Estimated guest count<select className={fieldClass} name="guestCount" defaultValue=""><option value="">Choose a range</option><option>Under 100</option><option>100–250</option><option>250–500</option><option>500+</option></select></label>
                <label className="text-xs font-medium">Planning investment<select className={fieldClass} name="budget" defaultValue=""><option value="">Discuss during enquiry</option></select></label>
                <label className="text-xs font-medium sm:col-span-2">What are you imagining?<textarea className={`${fieldClass} min-h-28 resize-y py-3`} name="message" placeholder="Share the feeling, traditions or details that matter to you." /></label>
                <button type="submit" disabled className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#30251f] px-5 text-sm font-semibold text-white opacity-60 sm:col-span-2">Live enquiry submission unavailable <Send className="h-4 w-4" aria-hidden="true" /></button>
              </fieldset>
            </form>
          </div>

          <aside className="flex flex-col gap-5">
            <div className="bg-[#30251f] p-5 text-[#faf7f0] sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d8c49e]">Provisional contact information</p>
              <h2 className="mt-2 font-serif text-2xl">The first hello</h2>
              <p className="mt-2 text-xs leading-5 text-white/70">Contact ownership and availability need owner confirmation before production publication.</p>
              <a href={brandConfig.contact.phoneHref} className="mt-4 inline-flex min-h-12 items-center gap-3 border border-white/25 px-3 text-sm text-white transition-colors hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><Phone className="h-4 w-4 text-[#d8c49e]" aria-hidden="true" />{brandConfig.contact.phone}</a>
              <a href={brandConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-12 items-center gap-3 px-3 text-sm text-white underline decoration-white/40 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><Instagram className="h-4 w-4 text-[#d8c49e]" aria-hidden="true" />@fairywedstories <span className="sr-only">opens Instagram in a new tab</span></a>
              <p className="mt-4 border-t border-white/15 pt-3 text-[10px] leading-5 text-white/60">WhatsApp and email are not connected. No contact form data is transmitted or stored.</p>
            </div>

            <div className="border border-[#e1d6c8] bg-white/70 p-5 sm:p-7">
              <div className="flex items-center gap-2 text-[#755b38]"><MapPin className="h-4 w-4" aria-hidden="true" /><p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Directory-listed locations · provisional</p></div>
              <div className="mt-4 divide-y divide-[#e5dbcf]">
                {brandConfig.locations.map((location) => <div key={location.name} className="py-4 first:pt-0 last:pb-0"><h3 className="font-serif text-xl">{location.name}</h3><p className="mt-1 text-xs leading-5 text-[#62574d]">{location.address}</p><p className="mt-1 text-[10px] text-[#96784a]">{location.note}</p></div>)}
              </div>
              <p className="mt-4 border-t border-[#e5dbcf] pt-3 text-[10px] leading-5 text-[#756a60]">No office map pin or business hours have been verified, so neither is shown.</p>
            </div>

            <div className="border border-[#e1d6c8] p-5 sm:p-7">
              <div className="flex items-center gap-2 text-[#755b38]"><CalendarDays className="h-4 w-4" aria-hidden="true" /><p className="text-[10px] font-semibold uppercase tracking-[0.2em]">A note for your planning</p></div>
              <p className="mt-3 text-sm leading-6 text-[#62574d]">Service scope, destination coverage, pricing and availability are discussed after the Fairy Wed Stories team confirms the details with you.</p>
              <Link to="/services" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#755b38] underline decoration-[#b89a65] underline-offset-4">Explore service directions <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
