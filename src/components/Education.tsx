import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

type TimelineItem = {
  period: string;
  title: string;
  subtitle: string;
  detail?: string;
  current?: boolean;
};

const education: TimelineItem[] = [
  {
    period: "2012-2016",
    title: "Diploma in Mechanical Engineering ",
    subtitle: "City Polytechnic Institute, Khulna. ",
    detail: "Major in Software Development & Data Structures.",
    current: true,
  },
  {
    period: "2010 - 2011",
    title: "Secondary School Certificate (SSC) ",
    subtitle: "Science Group | GPA: 5.00 / 4.34",
    detail: "Sha-eedSohrawardi High School,Khulna ",
  },
];

const experience: TimelineItem[] = [
  {
    period: "2024 - Present",
    title: "Full Stack Web Development Learner",
    subtitle: "Self-Directed & Intensive Training (6 Months)",
    detail:
      "Built over 10 real-world projects covering the complete full-stack workflow, Better Auth security, database modeling, and cloud deployments.",
    current: true,
  },
  {
    period: "2024",
    title: "Open Source Contributor",
    subtitle: "GitHub Community",
    detail:
      "Created reusable Next.js UI components and fixed documentation issues in beginner-friendly repositories.",
  },
];

function Timeline({
  items,
  title,
  icon: Icon,
}: {
  items: TimelineItem[];
  title: string;
  icon: typeof GraduationCap;
}) {
  return (
    <div className="space-y-6">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
        <Icon className="text-cyan-400" size={24} />
        {title}
      </h3>

      <div className="ml-2 space-y-6 border-l-2 border-slate-700 pl-6">
        {items.map((item) => (
          <div key={item.title} className="group relative">
            <div
              className={`absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-4 border-slate-900 transition-colors ${
                item.current
                  ? "bg-cyan-400"
                  : "bg-slate-600 group-hover:bg-cyan-400"
              }`}
            />
            <span
              className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${
                item.current
                  ? "border-cyan-800 bg-cyan-950 text-cyan-400"
                  : "border-transparent bg-slate-800 text-slate-300"
              }`}
            >
              {item.period}
            </span>
            <h4 className="mt-2 text-xl font-bold text-white">{item.title}</h4>
            <p className="text-sm text-slate-400">{item.subtitle}</p>
            {item.detail ? (
              <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section
      id="qualification"
      className="border-y border-slate-800/80 bg-slate-900/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Qualification &"
          accent="Experience"
          subtitle="My academic background and professional learning timeline."
        />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Timeline
            items={education}
            title="Educational Background"
            icon={GraduationCap}
          />
          <Timeline
            items={experience}
            title="Experience & Training"
            icon={Briefcase}
          />
        </div>
      </div>
    </section>
  );
}
