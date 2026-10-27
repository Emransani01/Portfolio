"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
};

type FieldName = "name" | "email" | "subject" | "message";
type FormErrors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Your name must be at least 2 characters.";
  } else if (name.length > 100) {
    errors.name = "Your name must be 100 characters or fewer.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 254) {
    errors.email = "Your email address is too long.";
  }

  if (!subject) {
    errors.subject = "Please add a subject.";
  } else if (subject.length < 3) {
    errors.subject = "Your subject must be at least 3 characters.";
  } else if (subject.length > 150) {
    errors.subject = "Your subject must be 150 characters or fewer.";
  }

  if (!message) {
    errors.message = "Please write a message.";
  } else if (message.length < 10) {
    errors.message = "Your message must be at least 10 characters.";
  } else if (message.length > 5000) {
    errors.message = "Your message must be 5000 characters or fewer.";
  }

  return errors;
}

function fieldClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-slate-900 px-4 py-3 text-slate-100 placeholder:text-slate-400 transition-colors ${
    hasError
      ? "border-red-500/70 focus:border-red-400"
      : "border-slate-700 focus:border-cyan-500"
  }`;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  function updateField(field: FieldName, value: string) {
    setValues((previous) => ({ ...previous, [field]: value }));

    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }

    if (status === "success" || status === "error") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      setFeedback("");
      const firstInvalid = (
        ["name", "email", "subject", "message"] as const
      ).find((field) => nextErrors[field]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          company: values.company,
        }),
      });

      let data: { message?: string } = {};
      try {
        data = (await response.json()) as { message?: string };
      } catch {
        // The response was not JSON; fall back to the generic message below.
      }

      if (!response.ok) {
        throw new Error(
          data.message ??
            "Your message could not be sent. Please try again or email me directly.",
        );
      }

      setStatus("success");
      setFeedback(
        data.message ?? "Thanks — your message has been sent successfully.",
      );
      setValues(initialValues);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Your message could not be sent. Please email me directly.",
      );
    }
  }

  const mailtoHref = (() => {
    const subject = values.subject.trim() || "Portfolio inquiry";
    const body = [
      values.message.trim(),
      "",
      values.name.trim() ? `— ${values.name.trim()}` : "",
      values.email.trim() ? `Reply to: ${values.email.trim()}` : "",
    ]
      .join("\n")
      .trim();

    return `mailto:emransani01@gmail.com?subject=${encodeURIComponent(
      subject,
    )}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  })();

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-slate-700/60 bg-slate-800/50 p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="John Doe"
            className={fieldClasses(Boolean(errors.name))}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="john@example.com"
            className={fieldClasses(Boolean(errors.email))}
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          maxLength={150}
          value={values.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          placeholder="Internship opportunity / project inquiry"
          className={fieldClasses(Boolean(errors.subject))}
        />
        {errors.subject ? (
          <p id="subject-error" className="mt-1.5 text-xs text-red-400">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="Tell me a little about the role, project, or question."
          className={fieldClasses(Boolean(errors.message))}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot field for basic spam protection. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) =>
            setValues((previous) => ({
              ...previous,
              company: event.target.value,
            }))
          }
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3.5 font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          <>
            <Send size={16} aria-hidden="true" />
            Send Message
          </>
        )}
      </button>

      {feedback ? (
        <div
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
          className={`rounded-lg border p-3 text-sm ${
            status === "error"
              ? "border-red-800 bg-red-950/50 text-red-300"
              : "border-emerald-800 bg-emerald-950/50 text-emerald-300"
          }`}
        >
          <p>{feedback}</p>
          {status === "error" ? (
            <p className="mt-3">
              <a
                href={mailtoHref}
                className="font-semibold underline underline-offset-2 hover:text-red-200"
              >
                Send these details as an email instead
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <p className="text-xs leading-relaxed text-slate-400">
        Prefer email? You can reach me directly at{" "}
        <a
          href="mailto:emransani01@gmail.com"
          className="font-medium text-cyan-400 hover:text-cyan-300"
        >
          emransani01@gmail.com
        </a>
        .
      </p>
    </form>
  );
}
