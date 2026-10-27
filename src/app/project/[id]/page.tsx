import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GithubIcon } from "@/components/BrandIcons";
import { projectsData } from "@/data/projectsData";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projectsData.find((item) => item.id === id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.name,
    description: project.shortDescription,
    alternates: {
      canonical: `/project/${project.id}`,
    },
    openGraph: {
      type: "article",
      url: `/project/${project.id}`,
      title: project.name,
      description: project.shortDescription,
      images: [
        {
          url: project.image,
          alt: `${project.name} project screenshot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: ProjectPageProps) {
  const { id } = await params;
  const project = projectsData.find((item) => item.id === id);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="bg-dark-bg pt-24 pb-20 focus:outline-none sm:pb-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to projects
          </Link>

          <header className="mt-6 max-w-3xl">
            <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              {project.tag}
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              {project.shortDescription}
            </p>
          </header>

          <div className="relative mt-8 aspect-[2/1] overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900">
            <Image
              src={project.image}
              alt={`${project.name} project screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-top"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              <ExternalLink size={16} aria-hidden="true" />
              Live Demo
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-cyan-500/50"
            >
              <GithubIcon className="h-4 w-4" />
              Client Repository
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-slate-800 pt-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-10 lg:col-span-8">
              <section aria-labelledby="overview-heading">
                <h2
                  id="overview-heading"
                  className="text-lg font-bold text-white"
                >
                  Overview
                </h2>
                <p className="mt-3 leading-relaxed text-slate-300">
                  {project.fullDescription}
                </p>
              </section>

              <section aria-labelledby="challenges-heading">
                <h2
                  id="challenges-heading"
                  className="text-lg font-bold text-white"
                >
                  Challenges Faced
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-slate-300">
                  {project.challenges.map((challenge) => (
                    <li key={challenge}>{challenge}</li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="future-plans-heading">
                <h2
                  id="future-plans-heading"
                  className="text-lg font-bold text-white"
                >
                  Future Plans
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-2 leading-relaxed text-slate-300">
                  {project.futurePlans.map((plan) => (
                    <li key={plan}>{plan}</li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6">
                <h2 className="text-sm font-semibold tracking-wider text-slate-300 uppercase">
                  Technology Stack
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-cyan-800 bg-cyan-950 px-3 py-1 text-xs font-medium text-cyan-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
