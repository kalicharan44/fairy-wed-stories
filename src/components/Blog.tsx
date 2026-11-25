import { Link } from 'react-router-dom';
import { brandConfig } from '../config/brandConfig';

export default function Blog() {
  return (
    <main className="min-h-[70svh] bg-[#FAF7F0] px-5 pb-20 pt-32 text-[#30251F] sm:px-8 sm:pt-40">
      <section className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7844]">The journal · in progress</p>
        <h1 className="mx-auto mt-5 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">A little inspiration, coming soon.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6c5c4b] sm:text-lg">Thoughtful planning notes and creative ideas will appear here once {brandConfig.name} has approved its first journal stories.</p>
        <p className="mt-4 text-sm text-[#897968]">This preview contains no published articles or client stories.</p>
        <Link to="/services" className="mt-8 inline-flex min-h-12 items-center bg-[#30251F] px-6 text-sm font-medium text-[#FAF7F0] transition-colors hover:bg-[#514237] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B89A65]">Explore the services</Link>
      </section>
    </main>
  );
}
