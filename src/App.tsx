import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import { initializeAllTracking, trackPageView } from './utils/analytics';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { WebsiteImageEditorProvider } from './components/WebsiteImageEditor';
import { brandConfig } from './config/brandConfig';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Invitations = lazy(() => import('./pages/Invitations'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminCms = lazy(() => import('./pages/AdminCms'));

const routeMetadata: Record<string, { title: string; description: string }> = {
  '/': {
    title: brandConfig.seo.title,
    description: brandConfig.seo.description,
  },
  '/about': {
    title: `Our Approach | ${brandConfig.name}`,
    description: 'Learn about the thoughtful planning, design and hospitality approach behind Fairy Wed Stories.',
  },
  '/services': {
    title: `Wedding Planning & Design | ${brandConfig.name}`,
    description: 'Explore wedding planning, destination, design and guest hospitality services.',
  },
  '/portfolio': {
    title: `Wedding Inspiration | ${brandConfig.name}`,
    description: 'Explore illustrative wedding inspiration for celebrations shaped around your story.',
  },
  '/invitations': {
    title: `Wedding Invitations | ${brandConfig.name}`,
    description: 'Explore the invitation design experience.',
  },
  '/blog': {
    title: `The Journal | ${brandConfig.name}`,
    description: 'Wedding inspiration and planning notes from Fairy Wed Stories, coming soon.',
  },
  '/contact': {
    title: `Contact | ${brandConfig.name}`,
    description: 'Tell us what you are dreaming of and discover how your wedding could come together.',
  },
};

function PageMetadata() {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith('/admin');
  const page = isAdminPath
    ? {
      title: pathname === '/admin/login' ? `Administrator Login | ${brandConfig.name}` : `Content Administration | ${brandConfig.name}`,
      description: 'Fairy Wed Stories administrator access.',
    }
    : routeMetadata[pathname] ?? (pathname.startsWith('/blog/')
      ? { title: `The Journal | ${brandConfig.name}`, description: 'Wedding inspiration and planning notes from Fairy Wed Stories, coming soon.' }
      : { title: `Page not found | ${brandConfig.name}`, description: 'The page you are looking for could not be found.' });
  const canonicalPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
  const url = brandConfig.seo.websiteUrl ? new URL(canonicalPath || '/', brandConfig.seo.websiteUrl).toString() : undefined;

  return (
    <Helmet>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      {(isAdminPath || brandConfig.seo.noIndex) && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`${import.meta.env.BASE_URL}images/indian-wedding/indian-wedding-stage-couple-restored.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
}

function PageFallback() {
  return <div className="min-h-[55svh] bg-[#fffdfa]" aria-busy="true" aria-label="Loading page" />;
}

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-5 pt-24 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a63f63]">404 · Not found</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-[#30242a] sm:text-6xl">This page has moved.</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-[#6b5a62] sm:text-base">The address may be outdated. Return home or explore wedding inspiration.</p>
      <div className="mt-7 flex gap-4">
        <Link to="/" className="inline-flex min-h-12 items-center bg-[#a63f63] px-5 text-sm font-semibold text-white">Home</Link>
        <Link to="/portfolio" className="inline-flex min-h-12 items-center border border-[#c9b9b4] px-5 text-sm font-semibold text-[#493b41]">View work</Link>
      </div>
    </main>
  );
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initializeAllTracking();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#fffdfa]">
      <PageMetadata />
      <ScrollToTop />
      {isAdminRoute ? (
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/admin/*" element={<AdminCms />} />
          </Routes>
        </Suspense>
      ) : (
        <>
          <AnalyticsTracker />
          <Header />
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/invitations" element={<Invitations />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HelmetProvider>
      <Router basename={import.meta.env.BASE_URL}>
          <WebsiteImageEditorProvider>
            <AppContent />
          </WebsiteImageEditorProvider>
        </Router>
      </HelmetProvider>
    </MotionConfig>
  );
}
