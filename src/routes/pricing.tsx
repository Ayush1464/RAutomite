import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicShell } from "@/components/public/PublicShell";
import { plans } from "@/lib/mock-data";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — RAAutomite DR Replication" },
      { name: "description", content: "Simple, transparent plans for Genesys Cloud disaster recovery — Starter, Pro, and Enterprise." },
      { property: "og:title", content: "Pricing — RAAutomite" },
      { property: "og:description", content: "Simple, transparent plans for Genesys Cloud disaster recovery." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Pricing</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">Built for every stage of resilience</h1>
          <p className="mt-4 text-muted-foreground">Start with a 14-day free trial. Upgrade as you scale.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p) => {
            const featured = p.name === "Pro";
            return (
              <div
                key={p.id}
                className={`rounded-2xl border bg-card p-7 shadow-elegant relative ${featured ? "border-primary/40 shadow-glow" : ""}`}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-white text-[10px] font-bold uppercase tracking-wider">
                    Most popular
                  </div>
                )}
                <div className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tabular-nums">${p.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t space-y-1.5 text-xs text-muted-foreground">
                  <div><span className="font-mono text-foreground">{p.limits.entities}</span> entities</div>
                  <div><span className="font-mono text-foreground">{p.limits.jobsPerDay}</span> jobs/day</div>
                  <div><span className="font-mono text-foreground">{p.limits.users}</span> users</div>
                </div>
                <Link
                  to="/register"
                  className={`mt-6 w-full inline-flex items-center justify-center gap-2 h-11 rounded-md text-sm font-semibold transition ${featured ? "bg-gradient-primary text-white shadow-elegant hover:shadow-glow" : "border bg-card hover:bg-muted"}`}
                >
                  Start free trial <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </PublicShell>
  );
}