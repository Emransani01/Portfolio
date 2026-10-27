export default function SectionHeading({
  title,
  accent,
  subtitle,
}: {
  title: string;
  accent: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title} <span className="text-cyan-400">{accent}</span>
      </h2>
      <div
        className="mx-auto mt-4 h-1 w-12 rounded-full bg-cyan-500"
        aria-hidden="true"
      />
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
