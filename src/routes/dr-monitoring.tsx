import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AlertTriangle, ShieldCheck, Zap } from "lucide-react";
import { useState } from "react";
import { AlertCard } from "@/components/monitoring/AlertCard";
import { DriftHeatmap } from "@/components/monitoring/DriftHeatmap";
import { alerts } from "@/lib/mock-data";

export const Route = createFileRoute("/dr-monitoring")({ component: Page });

function Page() {
  const [auto, setAuto] = useState(true);
  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        {/* <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">DR Monitoring</h1>
            <p className="mt-1 text-sm text-muted-foreground">Real-time drift detection with optional auto-healing.</p>
          </div>
        </div>
        <div className="rounded-2xl border bg-gradient-primary text-white p-6 shadow-glow flex items-center gap-5">
          <div className="h-12 w-12 rounded-xl bg-white/15 grid place-items-center"><Zap className="h-6 w-6" /></div>
          <div className="flex-1">
            <div className="font-semibold">Auto-Recovery</div>
            <div className="text-sm text-white/80">Automatically restore missing or drifted objects within 60s of detection.</div>
          </div>
          <button onClick={() => setAuto(!auto)} className={`relative w-14 h-7 rounded-full transition ${auto ? "bg-white" : "bg-white/30"}`}>
            <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-primary transition-all ${auto ? "left-7" : "left-0.5 bg-white"}`} />
          </button>
        </div> */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[{ l: "Drift Events 24h", v: "12", i: AlertTriangle, c: "bg-warning" }, { l: "Auto-Healed", v: "9", i: ShieldCheck, c: "bg-success" }, { l: "MTTR", v: "47s", i: Zap, c: "bg-primary" }].map((s, i) => (
            <div key={i} className="rounded-2xl border bg-card p-5 shadow-elegant flex items-center gap-4">
              <div className={`h-11 w-11 rounded-lg ${s.c} grid place-items-center text-white`}><s.i className="h-5 w-5" /></div>
              <div><div className="text-xs text-muted-foreground uppercase">{s.l}</div><div className="text-2xl font-bold">{s.v}</div></div>
            </div>
          ))}
        </div> */}
        {/* <DriftHeatmap /> */}
        <div className="rounded-2xl border bg-card p-6 shadow-elegant">
          <h3 className="font-semibold mb-4">Active Alerts</h3>
          <div className="space-y-2">
            {alerts.map((a) => <AlertCard key={a.id} alert={a} />)}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
