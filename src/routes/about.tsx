import { createFileRoute } from "@tanstack/react-router";
import { PublicShell } from "@/components/public/PublicShell";
import { Target, Compass, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — RAAutomite" },
      {
        name: "description",
        content: "RAAutomite is a purpose-built disaster recovery platform for Genesys Cloud.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicShell>
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">

        {/* ✅ Header (same style as pricing/contact) */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            About
          </span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
            Resilient contact centers, by design
          </h1>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            RACube was founded by veteran contact center engineers who lived through too many DR drills involving spreadsheets and copy-paste. We built the platform we wished we had: a purpose-built SaaS that automates Genesys Cloud replication across AWS regions with enterprise-grade auditability.
          </p>
        </div>

        {/* ✅ Mission / Approach / Values */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: "Mission",
              body: "Make Genesys Cloud resilient by default — for every contact center, of every size.",
            },
            {
              icon: Compass,
              title: "Approach",
              body: "Operator-first UX, deep audit trails, and focus on recovery time objectives.",
            },
            {
              icon: Sparkles,
              title: "Values",
              body: "Transparency, security as a feature, and customer outcomes over vanity metrics.",
            },
          ].map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border bg-card p-6 shadow-elegant"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-secondary text-accent">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {it.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {it.body}
              </p>
            </div>
          ))}
        </div>

        {/* ✅ Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            ["120+", "Tenants"],
            ["8.4M", "Entities replicated"],
            ["99.97%", "Replication success"],
            ["< 6 min", "Median job time"],
          ].map(([v, l]) => (
            <div
              key={l}
              className="rounded-2xl border bg-card p-6 text-center shadow-elegant"
            >
              <p className="text-3xl font-bold tracking-tight">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </PublicShell>
  );
}