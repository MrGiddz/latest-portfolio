import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <main className="w-full p-4 md:p-8">
      <section className="w-full max-w-3xl mx-auto backdrop-blur-md bg-slate-100/85 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-5 md:p-8 shadow-2xl my-16 md:my-24">
        <p className="text-xs tracking-[0.2em] uppercase text-slate-500 dark:text-gray-400">
          Blog Error
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-mono">
          Post Not Found
        </h1>
        <p className="mt-4 text-slate-700 dark:text-gray-200 leading-relaxed">
          This article may have been removed, renamed, or the link may be
          incomplete.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/blog"
            className="rounded-xl px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-center"
          >
            Back to Blog
          </Link>
          <Link
            href="/"
            className="rounded-xl px-4 py-3 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white text-center"
          >
            Go Home
          </Link>
        </div>
      </section>
    </main>
  );
}
