import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-10">

        {/* LEFT SIDE */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold tracking-tight">
            Start your 14-day trial
          </h1>
          <p className="mt-3 text-muted-foreground">
            Stand up DR for your Genesys Cloud org in minutes. No credit card required.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li>• Replicate Users, Queues, Scripts, IVR, Skills</li>
            <li>• Audit + Reconciliation reports</li>
            <li>• Dry-run mode for safe rehearsals</li>
            <li>• Cancel anytime</li>
          </ul>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="rounded-2xl border bg-card p-6 shadow-elegant">

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-semibold">Create your tenant</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Set up your workspace and start onboarding.
            </p>
          </div>

          {/* FORM (UI ONLY) */}
          <form className="mt-6 grid gap-4 sm:grid-cols-2">

            <Field label="Company name" placeholder="Acme Corp" className="sm:col-span-2" />
            <Field label="Admin full name" placeholder="Alex Carter" />
            <Field label="Admin email" type="email" placeholder="alex@company.com" />
            <Field label="Password" type="password" placeholder="••••••••" />
            <Field label="Confirm password" type="password" placeholder="••••••••" />

            {/* Country */}
            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">
                Country / Region
              </label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring">
                <option>United States</option>
                <option>India</option>
                <option>United Kingdom</option>
                <option>Germany</option>
              </select>
            </div>

            <Field label="Phone" placeholder="+1 (415) 555-0144" />

          </form>

          {/* Terms */}
          <label className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
            <input type="checkbox" className="mt-0.5" />
            <span>
              I agree to the{" "}
              <span className="text-accent cursor-pointer">Terms</span> and{" "}
              <span className="text-accent cursor-pointer">Privacy Policy</span>.
            </span>
          </label>

          {/* CTA */}
          <button
            type="button"
            className="mt-6 w-full h-11 rounded-md text-sm font-semibold bg-gradient-primary text-white shadow-elegant hover:shadow-glow flex items-center justify-center gap-2"
          >
            Create tenant & continue
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-medium hover:underline">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

/* Reusable Field */
function Field({
  label,
  type = "text",
  placeholder,
  className = "",
}: {
  label: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-xs font-medium text-foreground">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}