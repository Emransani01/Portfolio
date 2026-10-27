"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Qualification", href: "/#qualification" },
  { name: "Projects", href: "/#projects" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-slate-800/80 shadow-lg shadow-slate-950/10 backdrop-blur-md ${
        isOpen ? "bg-slate-950" : "bg-slate-950/85"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/#home"
            className="rounded-md text-xl font-bold tracking-wider text-white sm:text-2xl"
          >
            <span className="text-cyan-400">&lt;</span>Developer
            <span className="text-cyan-400">/&gt;</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="ml-3 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              Contact Me
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="rounded-lg border border-slate-700/70 p-2 text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-white md:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen ? (
          <div
            id="mobile-menu"
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-slate-800 py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-cyan-400"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-lg bg-cyan-500 px-3 py-2.5 text-center text-base font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
              >
                Contact Me
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
