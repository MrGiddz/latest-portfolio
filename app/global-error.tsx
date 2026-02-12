"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <main className="min-h-screen w-full p-4 md:p-8 flex items-center justify-center">
          <section className="w-full max-w-xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md p-6 md:p-8 shadow-2xl text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gray-400">
              Critical Error
            </p>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold font-mono">
              Something Broke
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              We could not render this page properly. Try reloading or navigate
              to a stable page.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={reset}
                className="rounded-xl px-4 py-3 bg-white text-slate-900"
              >
                Reload
              </button>
              <Link
                href="/"
                className="rounded-xl px-4 py-3 border border-white/20 text-white"
              >
                Go Home
              </Link>
              <Link
                href="/blog"
                className="rounded-xl px-4 py-3 border border-white/20 text-white"
              >
                Visit Blog
              </Link>
              <Link
                href="/contact"
                className="rounded-xl px-4 py-3 border border-white/20 text-white"
              >
                Contact Me
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
