"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, X } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import SectionHeading from "@/components/SectionHeading";
import { projectsData, type Project } from "@/data/projectsData";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeProject) return;

    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );

    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        return;
      }

      if (event.key !== "Tab" || !focusable || focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [activeProject]);

  return (
    <section id="projects" className="bg-dark-bg py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Featured"
          accent="Projects"
          subtitle="Three full-stack applications I have built while developing my skills."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <article
              key={project.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40 shadow-lg transition-colors hover:border-cyan-500/50"
            >
              <div className="relative aspect-[2/1] overflow-hidden border-b border-slate-700/60 bg-slate-900">
                <Image
                  src={project.image}
                  alt={`${project.name} project screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="absolute top-3 right-3 rounded-md border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-xs font-medium text-cyan-300 backdrop-blur-md">
                  {project.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-white">
                  <Link
                    href={`/project/${project.id}`}
                    className="transition-colors hover:text-cyan-300"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">
                  {project.shortDescription}
                </p>

                <ul
                  className="mt-4 flex flex-wrap gap-2"
                  aria-label={`${project.name} technologies`}
                >
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-slate-700/70 bg-slate-900/60 px-2 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20"
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-500/50 hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={(event) => {
                      event.currentTarget.focus();
                      setActiveProject(project);
                    }}
                    aria-haspopup="dialog"
                    className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-cyan-300"
                  >
                    More details
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-950/80 text-slate-300 backdrop-blur-md transition-colors hover:text-white"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
              <div className="relative aspect-[2/1] border-b border-slate-800 bg-slate-950">
                <Image
                  src={activeProject.image}
                  alt={`${activeProject.name} project screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-6 p-6 sm:p-8">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
                    {activeProject.tag}
                  </span>
                  <h3
                    id="project-modal-title"
                    className="mt-2 text-2xl font-bold text-white"
                  >
                    {activeProject.name}
                  </h3>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold tracking-wider text-slate-300 uppercase">
                    Technology Stack
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-cyan-800 bg-cyan-950 px-3 py-1 text-xs font-medium text-cyan-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-1 text-sm font-semibold tracking-wider text-slate-300 uppercase">
                    Overview
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {activeProject.fullDescription}
                  </p>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold tracking-wider text-amber-400 uppercase">
                    Challenges Faced
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                    {activeProject.challenges.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-semibold tracking-wider text-emerald-400 uppercase">
                    Future Plans
                  </h4>
                  <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                    {activeProject.futurePlans.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3 border-t border-slate-800 pt-5">
                  <a
                    href={activeProject.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    Live Demo
                  </a>
                  <a
                    href={activeProject.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-cyan-500/50"
                  >
                    <GithubIcon className="h-4 w-4" />
                    GitHub
                  </a>
                  <Link
                    href={`/project/${activeProject.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    Full details page
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
