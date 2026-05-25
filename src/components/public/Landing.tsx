import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Zap, RefreshCw, Activity, Cloud, GitBranch, CheckCircle2, Lock, Layers } from "lucide-react";
import { motion } from "framer-motion";

export function Landing() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-20 pb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border bg-card text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Genesys AppFoundry · Listed
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Disaster Recovery for{" "}
              <span className="text-gradient">Genesys Cloud</span>, on autopilot.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              RAAutomite replicates your Genesys Cloud configuration and metadata across AWS regions —
              continuously, auditably, and with zero downtime. Recover in minutes, not days.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="inline-flex items-center gap-2 px-5 h-11 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow transition">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 px-5 h-11 rounded-md border bg-card hover:bg-muted text-sm font-semibold transition">
                View pricing
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> SOC 2 Type II</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> ISO 27001</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> 14-day free trial</span>
            </div>
          </motion.div>

          {/* Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 rounded-2xl border bg-card p-8 shadow-elegant relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              <Node title="Primary Region" subtitle="us-east-1" icon={Cloud} accent="bg-primary" tag="Genesys Cloud" />
              <div className="flex flex-col items-center justify-center">
                <div className="h-12 w-12 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow animate-glow-breathe">
                  <RefreshCw className="h-5 w-5 text-white animate-spin" style={{ animationDuration: "4s" }} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground font-semibold">RAAutomite Engine</div>
                <div className="text-[10px] text-muted-foreground font-mono">Diff · Validate · Apply</div>
              </div>
              <Node title="DR Region" subtitle="us-west-2" icon={ShieldCheck} accent="bg-accent" tag="Genesys Cloud" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t bg-card/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Why RAAutomite</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Built for the contact center that can't go down</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Zap, title: "Continuous replication", body: "Push every change from primary to DR within minutes — incremental, atomic, idempotent." },
              { icon: ShieldCheck, title: "Auto-heal & rollback", body: "Detect drift on either side and restore in one click — or fully automated." },
              { icon: Activity, title: "Full audit trail", body: "Every diff, apply, and reconciliation captured with downloadable PDFs and JSON changesets." },
              { icon: GitBranch, title: "Dry-run mode", body: "Preview every change before it touches your DR org. Approve, schedule, or discard." },
              { icon: Lock, title: "Enterprise security", body: "OAuth-only access, scoped tokens, no secrets stored. SAML SSO on Enterprise." },
              { icon: Layers, title: "All Genesys entities", body: "Users, Queues, Scripts, IVR Flows, Skills, Roles, Wrap-ups, Data Tables, Schedules & Routing." },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border bg-card p-6 shadow-elegant"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center text-white mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 py-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">FAQ</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">Frequently asked</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "Does RAAutomite store my Genesys data?", a: "We only store metadata: configuration objects, diffs, and audit logs. No conversations, recordings, or PII ever leave Genesys." },
              { q: "What's our RPO and RTO?", a: "Typical RPO is under 5 minutes on Pro, and continuous on Enterprise. RTO is under 60 seconds for failover triggers." },
              { q: "Do you support multi-region?", a: "Yes — pair any two AWS regions where Genesys Cloud is available." },
              { q: "Can we run it in dry-run only?", a: "Absolutely. Most customers start in dry-run for the first 14 days to validate diffs before applying." },
            ].map((f, i) => (
              <details key={i} className="rounded-xl border bg-card p-5 group">
                <summary className="font-semibold cursor-pointer flex items-center justify-between">
                  {f.q}
                  <span className="text-muted-foreground group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border bg-gradient-primary p-8 text-center text-white shadow-glow">
            <h3 className="text-2xl font-bold tracking-tight">Ready for resilient Genesys ops?</h3>
            <p className="mt-1.5 text-sm opacity-90">Start your 14-day free trial. No credit card required.</p>
            <Link to="/register" className="mt-5 inline-flex items-center gap-2 px-5 h-11 rounded-md bg-white text-foreground text-sm font-semibold hover:bg-white/90 transition">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Node({ title, subtitle, icon: Icon, accent, tag }: { title: string; subtitle: string; icon: any; accent: string; tag: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center relative">
      <div className={`h-12 w-12 mx-auto rounded-2xl ${accent} grid place-items-center text-white shadow-elegant`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-3 font-semibold">{title}</div>
      <div className="text-xs text-muted-foreground font-mono">{subtitle}</div>
      <div className="mt-3 inline-block px-2 py-0.5 rounded bg-muted text-[10px] uppercase tracking-wider font-semibold">{tag}</div>
    </div>
  );
}