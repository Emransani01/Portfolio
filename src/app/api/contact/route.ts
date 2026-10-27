import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "emransani01@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitEntry>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || entry.resetAt <= now) {
    if (rateLimits.size > 1000) rateLimits.clear();
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      {
        message: `Too many messages were sent from this connection. Please try again later or email me directly at ${TO_EMAIL}.`,
      },
      { status: 429 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { message: "Your message is too large to send." },
      { status: 413 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const subject =
    typeof payload.subject === "string" ? payload.subject.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const company =
    typeof payload.company === "string" ? payload.company.trim() : "";

  // Honeypot: real users never see this field.
  if (company) {
    return NextResponse.json(
      { message: "Invalid submission." },
      { status: 400 },
    );
  }

  const validationError = (() => {
    if (name.length < 2 || name.length > 100) {
      return "Please provide a name between 2 and 100 characters.";
    }
    if (!emailPattern.test(email) || email.length > 254) {
      return "Please provide a valid email address.";
    }
    if (subject.length < 3 || subject.length > 150) {
      return "Please provide a subject between 3 and 150 characters.";
    }
    if (message.length < 10 || message.length > 5000) {
      return "Please provide a message between 10 and 5000 characters.";
    }
    return null;
  })();

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        code: "not_configured",
        message: `The contact form is not available right now. Please email me directly at ${TO_EMAIL}.`,
      },
      { status: 503 },
    );
  }

  const safeSubject = subject.replace(/[\r\n]+/g, " ");
  const text = [
    "New portfolio contact message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    message,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin: 0 0 16px;">New portfolio contact message</h2>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p style="margin: 0 0 8px;"><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
      <p style="white-space: pre-wrap; margin: 0;">${escapeHtml(message)}</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Portfolio inquiry: ${safeSubject}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend rejected the contact email:", response.status, details);
      return NextResponse.json(
        {
          message: `The email service could not send your message. Please email me directly at ${TO_EMAIL}.`,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      message: "Thanks — your message has been sent. I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      {
        message: `The email service is unavailable right now. Please email me directly at ${TO_EMAIL}.`,
      },
      { status: 502 },
    );
  }
}
