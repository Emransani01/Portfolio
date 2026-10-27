import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, WhatsappIcon } from "@/components/BrandIcons";

const socials = [
  {
    label: "GitHub profile",
    href: "https://github.com/Emransani01",
    icon: GithubIcon,
    external: true,
  },
  {
    label: "Send an email",
    href: "mailto:emransani01@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "Chat on WhatsApp",
    href: "https://wa.me/8801818779371",
    icon: WhatsappIcon,
    external: true,
  },
];

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Qualification", href: "/#qualification" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-sm">
            <Link
              href="/#home"
              className="inline-block rounded-md text-xl font-bold tracking-wider text-white"
            >
              <span className="text-cyan-400">&lt;</span>Developer
              <span className="text-cyan-400">/&gt;</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Full-stack web developer focused on Next.js, React, TypeScript, and
              the MERN stack.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-400"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-cyan-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noreferrer" : undefined}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Emran. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-400">
              Built with Next.js &amp; Tailwind CSS
            </p>
            <Link
              href="/#home"
              aria-label="Back to top"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:border-cyan-500/50 hover:text-cyan-400"
            >
              <ArrowUp size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
