import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/public/PublicShell";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RAAutomite" },
      {
        name: "description",
        content:
          "Get in touch with our team for sales, support, or partnerships.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks! We'll be in touch within one business day.");
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        {/* ✅ Header (same style as pricing) */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Contact
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
            Let’s talk DR for Genesys
          </h1>
          <p className="mt-4 text-muted-foreground">
            Sales, support, or partnerships — we respond within one business
            day.
          </p>
        </div>

        {/* ✅ Content */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Info */}
          <div className="space-y-5">
            {[
              { Icon: Mail, text: "sales@racube.io" },
              { Icon: Phone, text: "+1 (415) 555-0144" },
              { Icon: MapPin, text: "100 Market Street, San Francisco, CA" },
            ].map(({ Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl border bg-card shadow-elegant"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-secondary text-accent">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="rounded-2xl border bg-card p-7 shadow-elegant"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="first" required />
              <Field label="Last name" name="last" required />
              <Field
                label="Work email"
                name="email"
                type="email"
                required
                className="sm:col-span-2"
              />
              <Field
                label="Company"
                name="company"
                required
                className="sm:col-span-2"
              />

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-foreground">
                  How can we help?
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>

            <button
              disabled={submitting}
              className="mt-6 w-full h-11 rounded-md text-sm font-semibold bg-gradient-primary text-white shadow-elegant hover:shadow-glow disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </PublicShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-medium text-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
