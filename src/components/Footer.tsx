import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandConfig } from '../config/brandConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-[#30251F] text-[#FAF7F0]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-9 border-b border-white/15 pb-9 sm:gap-12 sm:pb-12 lg:grid-cols-[1.2fr_0.7fr_1.1fr]">
          <div>
            <Link to="/" aria-label={`${brandConfig.name} home`} className="inline-flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <img src={brandConfig.logo.src} alt="" aria-hidden="true" width="800" height="800" loading="lazy" decoding="async" className="h-16 w-16 shrink-0 bg-[#FAF7F0] object-contain sm:h-[72px] sm:w-[72px]" />
              <span className="font-serif text-lg tracking-wide">{brandConfig.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70 sm:text-base sm:leading-7">{brandConfig.description}</p>
            <a href={brandConfig.contact.instagram} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 border border-white/25 px-3 text-xs text-white/80 transition-colors hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
              Instagram <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4BB8F]">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-5 gap-y-1 sm:grid-cols-1 sm:gap-y-2">
              {links.map((link) => <li key={link.path}><Link to={link.path} className="inline-flex min-h-11 items-center text-sm text-white/75 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">{link.name}</Link></li>)}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4BB8F]">A note on this preview</h2>
            <p className="text-sm leading-6 text-white/70">Contact details and locations are provisional. Live enquiry delivery is not connected in this demonstration.</p>
            <ul className="mt-3 space-y-1 text-sm text-white/75">
              <li><a href={brandConfig.contact.phoneHref} className="inline-flex min-h-11 items-center gap-3 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><Phone className="h-4 w-4 text-[#D4BB8F]" aria-hidden="true" />{brandConfig.contact.phone}</a></li>
              {brandConfig.locations.map((location) => <li key={location.name} className="flex items-start gap-3 py-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4BB8F]" aria-hidden="true" /><span>{location.name}<span className="block text-xs text-white/45">{location.note}</span></span></li>)}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} {brandConfig.name}. Demonstration website.</p>
          <p>Proposed content and illustrative imagery · pending owner approval</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
