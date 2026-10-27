import { Database, Monitor, Server, Wrench } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

type SkillCategory = {
  title: string;
  description: string;
  icon: typeof Monitor;
  tone: string;
  skills: string[];
};

const categories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Responsive, accessible interfaces",
    icon: Monitor,
    tone: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    description: "APIs, auth, and server-side logic",
    icon: Server,
    tone: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    skills: ["Node.js", "Express.js", "REST APIs", "Better Auth"],
  },
  {
    title: "Database",
    description: "Data modeling and persistence",
    icon: Database,
    tone: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    title: "Tools & Deployment",
    description: "Version control and shipping",
    icon: Wrench,
    tone: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    skills: ["Git", "GitHub", "Vercel", "Netlify", "Postman"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-dark-bg py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Technical"
          accent="Skills"
          subtitle="The technologies and tools I use to build and ship full-stack applications."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="flex h-full flex-col rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 transition-colors hover:border-cyan-500/50"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl border ${category.tone}`}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {category.description}
                </p>

                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={`${category.title} skills`}
                >
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-slate-700/70 bg-slate-900/60 px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
