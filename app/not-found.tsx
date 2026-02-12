import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen w-full p-4 md:p-8 flex items-center justify-center">
      <section className="w-full max-w-xl rounded-3xl border border-slate-200 dark:border-white/20 bg-slate-100/85 dark:bg-white/10 backdrop-blur-md p-6 md:p-8 shadow-2xl text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-slate-500 dark:text-gray-400">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-mono">
          Page Not Found
        </h1>
        <p className="mt-4 text-slate-700 dark:text-gray-200 leading-relaxed">
          The page you requested does not exist or may have moved.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/"
            className="rounded-xl px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="rounded-xl px-4 py-3 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
          >
            Visit Blog
          </Link>
          <Link
            href="/projects"
            className="rounded-xl px-4 py-3 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="rounded-xl px-4 py-3 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </main>
  );
}
