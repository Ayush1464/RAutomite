import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MailCheck } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-elegant">

        {/* Logo */}
        <div className="text-lg font-bold">RACube</div>

        {/* Title */}
        <h1 className="mt-6 text-2xl font-semibold tracking-tight">
          Reset your password
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Enter your email and we'll send a reset link.
        </p>

        {/* FORM (UI ONLY) */}
        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-foreground">
              Email
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="button"
            className="w-full h-11 rounded-md text-sm font-semibold bg-gradient-primary text-white shadow-elegant hover:shadow-glow"
          >
            Send reset link
          </button>
        </form>

        {/* SUCCESS STATE (UI ONLY — static preview) */}
        <div className="mt-8 text-center border-t pt-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
            <MailCheck className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold">Check your inbox</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            If an account exists, you'll receive a reset link shortly.
          </p>
        </div>

        {/* Back */}
        <Link
          to="/login"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>

      </div>
    </div>
  );
}