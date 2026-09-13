"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const projectTypes = [
  "Web application / SaaS",
  "Next.js / React frontend",
  "AI / ML feature",
  "Business website",
  "WordPress website",
  "E-commerce store",
  "Website redesign",
  "Something else",
];

/**
 * Static-host-friendly contact form: composes a structured email in the
 * visitor's mail client. No data is sent anywhere else.
 */
export function ContactForm() {
  const [type, setType] = useState(projectTypes[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`New project: ${type} — from ${name}`);
    const body = encodeURIComponent(
      `Hi Kamran,\n\nProject type: ${type}\nName: ${name}\nReply-to: ${email}\n\n${message}\n`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="card flex flex-col gap-5 p-8" aria-label="Project enquiry">
      <div>
        <span className="label-mono mb-3 block">What are we building?</span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Project type">
          {projectTypes.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={type === t}
              onClick={() => setType(t)}
              className={`chip !min-h-[38px] cursor-pointer !px-4 transition-colors ${
                type === t
                  ? "!border-accent !text-accent2"
                  : "hover:border-line2 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Your name</span>
          <input
            name="name"
            required
            autoComplete="name"
            className="min-h-[48px] rounded-lg border border-line bg-bg px-4 text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            placeholder="Jane Smith"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Your email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="min-h-[48px] rounded-lg border border-line bg-bg px-4 text-ink placeholder:text-faint focus:border-accent focus:outline-none"
            placeholder="jane@company.com"
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">Tell me about the project</span>
        <textarea
          name="message"
          required
          rows={5}
          className="rounded-lg border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint focus:border-accent focus:outline-none"
          placeholder="What does the business do? What should the website achieve? Any deadline?"
        />
      </label>

      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        Compose the email
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
          <path d="M2 7.5h10M8.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <p className="text-xs leading-relaxed text-faint">
        This opens a ready-to-send email in your mail app — nothing is stored or
        sent anywhere else. Prefer direct? Email {site.email} or message me on
        WhatsApp.
      </p>
    </form>
  );
}
