import Image from "next/image";
import { ArrowRight, Download, Mail } from "lucide-react";
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

export default function Hero() {
  return (
    <section
      id="home"
      className="border-b border-slate-800/60 bg-dark-bg"
    >
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-24 pb-16 sm:px-6 md:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="order-2 md:order-1 md:col-span-7">
          
          <h1 className="mt-6">
            <span className="block text-sm font-semibold tracking-[0.2em] text-slate-400 uppercase">
              Hi, I&apos;m
            </span>{" "}
            <span className="mt-2 block text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              <span className="gradient-text">Emran</span>
            </span>{" "}
            <span className="mt-3 block text-xl font-semibold text-slate-300 sm:text-2xl">
              Full-Stack Web Developer
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            I build fast, accessible web applications with Next.js, React,
            TypeScript, Node.js, and MongoDB. I&apos;m looking for a remote
            internship or junior full-stack role where I can contribute to real
            products and keep growing as a developer.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-400"
            >
              View Projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
            >
              <Mail size={16} aria-hidden="true" />
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              Find me online
            </span>
            <span className="h-px w-8 bg-slate-700" aria-hidden="true" />
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
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/60 text-slate-300 transition-colors hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-400"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="order-1 flex justify-center md:order-2 md:col-span-5 md:justify-end">
          <div className="relative w-60 sm:w-72 lg:w-80">
            <div
              className="absolute -inset-3 rounded-3xl border border-cyan-500/15 bg-cyan-500/5"
              aria-hidden="true"
            />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-800 shadow-2xl shadow-slate-950/50">
              <Image
                src="/images/Emran.jpg"
                alt="Portrait of Emran, full-stack web developer"
                fill
                preload
                sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 320px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
