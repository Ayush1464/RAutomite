import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/public/Landing";
import { PublicShell } from "@/components/public/PublicShell";
import { useAuth } from "@/context/RoleContext";
import { AppShell } from "@/components/layout/AppShell";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SyncFlowDiagram } from "@/components/dashboard/SyncFlowDiagram";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ObjectStatusGrid } from "@/components/dashboard/ObjectStatusGrid";
import { SyncTrendChart } from "@/components/dashboard/SyncTrendChart";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { AutoRecoveryEvent } from "@/components/dashboard/AutoRecoveryEvent";
import { Activity, AlertTriangle, CheckCircle2, Clock, Layers, Play, Wand2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAAutomite — Disaster Recovery for Genesys Cloud" },
      { name: "description", content: "Continuous, auditable configuration replication for Genesys Cloud across AWS regions." },
      { property: "og:title", content: "RAAutomite — DR Replication for Genesys Cloud" },
      { property: "og:description", content: "Continuous, auditable configuration replication for Genesys Cloud across AWS regions." },
    ],
  }),
  component: Home,
});

function Home() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || role === "guest") {
    return (
      <PublicShell>
        <Landing />
      </PublicShell>
    );
  }
  return <Dashboard />;
}

function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-6 max-w-[1500px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Genesys Cloud · Multi-region</span>
              <StatusBadge status="drift" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Disaster Recovery <span className="text-gradient">Control Center</span></h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Replicate, validate, and auto-heal configuration drift between your source and DR organizations.</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md border bg-background hover:bg-muted text-sm font-medium">
              <Activity className="h-4 w-4" /> View logs
            </button>
            <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow transition">
              <Play className="h-4 w-4" /> Run sync now
            </button>
          </div>
        </div>

        <SyncFlowDiagram />

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <MetricCard label="Objects Synced" value="12,847" delta="+4.2% vs last week" icon={CheckCircle2} accent="bg-primary" />
          <MetricCard label="Missing Objects" value="6" delta="3 auto-healing" deltaTone="neutral" icon={AlertTriangle} accent="bg-warning" />
          <MetricCard label="Auto-Recovered" value="142" delta="+18 today" icon={Wand2} accent="bg-success" />
          <MetricCard label="Last Sync" value="2m ago" delta="every 15 min" deltaTone="neutral" icon={Clock} accent="bg-accent" />
          <MetricCard label="Success Rate" value="99.7%" delta="+0.3%" icon={Activity} accent="bg-success" />
          <MetricCard label="Active Jobs" value="3" delta="1 queued" deltaTone="neutral" icon={Layers} accent="bg-primary-glow" />
        </div>

        <ObjectStatusGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><SyncTrendChart /></div>
          <ActivityTimeline />
        </div>
      </div>
      <AutoRecoveryEvent />
    </AppShell>
  );
}
