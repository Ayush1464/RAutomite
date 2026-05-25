import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ObjectTable } from "@/components/objects/ObjectTable";
import { queues } from "@/lib/mock-data";
import { Users as UsersIcon } from "lucide-react";

export const Route = createFileRoute("/queues")({ component: Page });

function Page() {
  const total = queues.length;
  const synced = queues.filter((q) => q.status === "synced").length;
  const missing = queues.filter((q) => q.status === "missing").length;
  const drift = queues.filter((q) => q.status === "drift").length;

  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Configuration</span>
            <h1 className="text-3xl font-bold tracking-tight mt-1">Queues</h1>
            <p className="mt-1 text-sm text-muted-foreground">Side-by-side comparison between source and destination Genesys orgs.</p>
          </div>
          <div className="flex gap-2">
            <Stat label="Total" value={total} />
            <Stat label="Synced" value={synced} tone="text-success" />
            <Stat label="Missing" value={missing} tone="text-destructive" />
            <Stat label="Drift" value={drift} tone="text-warning" />
          </div>
        </div>
        <ObjectTable
          data={queues}
          kind="Queues"
          extraColumns={[
            {
              key: "agents",
              label: "Agents",
              render: (v: number) => (
                <span className="inline-flex items-center gap-1 text-xs">
                  <UsersIcon className="h-3 w-3 text-muted-foreground" /> {v ?? 0}
                </span>
              ),
            },
            {
              key: "routing",
              label: "Routing",
              render: (v: string) => (
                <span className="px-2 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-mono uppercase">{v}</span>
              ),
            },
          ]}
        />
      </div>
    </AppShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone?: string }) {
  return (
    <div className="px-3 py-1.5 rounded-md border bg-card text-center min-w-[64px]">
      <div className={`text-base font-bold tabular-nums ${tone ?? ""}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
