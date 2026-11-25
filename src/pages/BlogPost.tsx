import { Link } from 'react-router-dom';

export default function BlogPost() {
  return (
    <main className="grid min-h-[70svh] place-items-center bg-[#FAF7F0] px-5 pb-16 pt-28 text-center text-[#30251F]">
      <section className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7844]">The journal</p>
        <h1 className="mt-4 font-serif text-4xl">This story is being prepared.</h1>
        <p className="mt-4 leading-7 text-[#6c5c4b]">There are no published journal articles in this preview yet.</p>
        <Link to="/blog" className="mt-7 inline-flex min-h-11 items-center text-sm font-medium text-[#745b36] underline underline-offset-4">Return to the journal</Link>
      </section>
    </main>
  );
}
