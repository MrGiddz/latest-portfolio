import type { Metadata } from "next";
import Link from "next/link";
import { AUTHOR_EMAIL, AUTHOR_NAME, AUTHOR_ROLE, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Olamide Olaniyi, a senior software engineer building scalable web, mobile, and backend systems.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full p-6 md:p-10">
      <section className="max-w-3xl mx-auto backdrop-blur-md bg-slate-100/80 dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-3xl p-8 shadow-2xl my-24">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white font-mono">
          About {AUTHOR_NAME}
        </h1>
        <p className="mt-5 text-slate-700 dark:text-gray-200 leading-relaxed">
          I am a {AUTHOR_ROLE} focused on building production-grade products
          across frontend, backend, mobile, and DevOps workflows. This website
          ({SITE_NAME}) documents my work, projects, and technical writing.
        </p>
        <p className="mt-4 text-slate-700 dark:text-gray-200 leading-relaxed">
          For collaboration, consulting, or engineering roles, contact me via{" "}
          <a className="text-blue-500 hover:underline" href={`mailto:${AUTHOR_EMAIL}`}>
            {AUTHOR_EMAIL}
          </a>{" "}
          or through the{" "}
          <Link className="text-blue-500 hover:underline" href="/contact">
            contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
