import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FolderOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-screen items-center bg-dark-bg px-4 pt-24 pb-20 focus:outline-none sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-400 uppercase">
            Error 404
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or may have
            moved. You can head back home or jump straight to my projects.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-400"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to home
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
            >
              <FolderOpen size={16} aria-hidden="true" />
              View projects
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
