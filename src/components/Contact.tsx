import { Mail, Phone } from "lucide-react";
import { WhatsappIcon } from "@/components/BrandIcons";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

const contactLinks = [
  {
    label: "Email",
    value: "emransani01@gmail.com",
    href: "mailto:emransani01@gmail.com",
    icon: Mail,
    external: false,
    tone: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  },
  {
    label: "Phone",
    value: "+880 1818779371",
    href: "tel:+8801818779371",
    icon: Phone,
    external: false,
    tone: "border-slate-600/50 bg-slate-700/30 text-slate-300",
  },
  {
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/8801818779371",
    icon: WhatsappIcon,
    external: true,
    tone: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-slate-800/80 bg-slate-900/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Get in"
          accent="Touch"
          subtitle="Have a role, project, or question in mind? Send a message or reach me directly."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-bold text-white">Contact details</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
              Fill in the form and I&apos;ll reply by email, or use one of the
              direct links below.
            </p>

            <ul className="mt-6 space-y-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-xl border border-slate-700/60 bg-slate-800/50 p-4 transition-colors hover:border-cyan-500/50 hover:bg-slate-800/80"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${item.tone}`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block truncate text-sm font-medium text-slate-100">
                          {item.value}
                        </span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
