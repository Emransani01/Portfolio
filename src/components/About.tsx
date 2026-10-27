import {
  BookOpen,
  Check,
  Code,
  Gamepad2,
  Heart,
  Palette,
  Trophy,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const highlights = [
  "Building full-stack web applications with Next.js and React",
  "Designing RESTful APIs and MongoDB database schemas",
  "Implementing authentication and authorization with Better Auth",
  "Creating responsive interfaces with Tailwind CSS",
];

const hobbies = [
  { label: "Gaming", detail: "Tactical & Strategy", icon: Gamepad2 },
  { label: "Football", detail: "Playing & Watching", icon: Trophy },
  { label: "Painting & Design", detail: "Digital & Canvas", icon: Palette },
  { label: "Tech Reading", detail: "Blogs & Documentation", icon: BookOpen },
];

export default function About() {
  return (
    <section
      id="about"
      className="border-y border-slate-800/80 bg-slate-900/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About"
          accent="Me"
          subtitle="A little about my path into web development and who I am outside of code."
        />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-6 lg:col-span-7">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
              <Code className="text-cyan-400" size={24} aria-hidden="true" />
              My Programming Journey
            </h3>
            <p className="leading-relaxed text-slate-300">
              My full-stack development journey began with a curiosity about how
              modern web applications work behind the scenes. What started with
              simple HTML and CSS layouts grew into an intensive focus on
              JavaScript, React, TypeScript, Next.js, Node.js, and database
              design.
            </p>
            <p className="leading-relaxed text-slate-300">
              I enjoy creating clean, maintainable interfaces and reliable
              backend APIs. I care about solving real business problems through
              well-structured code, secure authentication with Better Auth, and
              clear state management.
            </p>

            <div className="pt-2">
              <h4 className="mb-3 text-lg font-semibold text-white">
                Work I enjoy most
              </h4>
              <ul className="space-y-2.5 text-slate-300">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="mt-1 shrink-0 text-cyan-400"
                      size={16}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 sm:p-8 lg:col-span-5">
            <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
              <Heart className="text-cyan-400" size={24} aria-hidden="true" />
              Beyond Code
            </h3>
            <p className="mt-4 leading-relaxed text-slate-300">
              When I&apos;m not at a terminal or debugging server components, I
              keep my creative and physical energy balanced with a few hobbies:
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {hobbies.map((hobby) => {
                const Icon = hobby.icon;
                return (
                  <div
                    key={hobby.label}
                    className="flex flex-col items-center rounded-xl border border-slate-700/50 bg-slate-900/60 p-4 text-center"
                  >
                    <Icon
                      className="mb-2 text-cyan-400"
                      size={26}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-semibold text-white">
                      {hobby.label}
                    </span>
                    <span className="mt-1 text-xs text-slate-400">
                      {hobby.detail}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
