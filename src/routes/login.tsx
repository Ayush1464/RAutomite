import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/RoleContext";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@racube.io");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // TEST CREDENTIALS
    if (
      email === "admin@racube.io" &&
      password === "123456"
    ) {
      login(email, "tenant_admin");

      navigate({
        to: "/",
      });
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-between bg-primary text-primary-foreground p-10">

        {/* Logo */}
        <div className="text-lg font-bold">RACube</div>

        {/* Content */}
        <div className="max-w-md">
          <ShieldCheck className="h-10 w-10 text-accent" />

          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            Genesys Cloud DR, made simple.
          </h2>

          <p className="mt-3 text-sm text-primary-foreground/70">
            Replicate, audit, and reconcile configuration across AWS regions —
            all from a single console.
          </p>
        </div>

        {/* Footer */}
        <div className="text-xs text-primary-foreground/50">
          © 2026 RACube Inc.
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden text-lg font-bold">
            RACube
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-2xl font-semibold tracking-tight text-foreground">
            Sign in to RACube
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back. Enter your credentials to continue.
          </p>

          {/* FORM */}
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >

            <div>
              <label className="mb-1 block text-xs font-medium text-foreground">
                Email
              </label>

              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-accent hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Sign in
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Continue with SSO (SAML / OIDC)
            </button>
          </form>

          {/* TEST CREDENTIALS */}
          <div className="mt-6 rounded-lg border border-dashed border-border p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Test Credentials
            </p>

            <div className="mt-3 space-y-1 text-sm">
              <p>
                <span className="font-medium">Email:</span>{" "}
                admin@racube.io
              </p>

              <p>
                <span className="font-medium">Password:</span>{" "}
                123456
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-accent hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}