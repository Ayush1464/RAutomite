import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ObjectTable } from "@/components/objects/ObjectTable";
import { skills } from "@/lib/mock-data";

export const Route = createFileRoute("/skills")({ component: Page });

function Page() {
  const total = skills.length;
  const synced = skills.filter((q) => q.status === "synced").length;
  const missing = skills.filter((q) => q.status === "missing").length;
  const drift = skills.filter((q) => q.status === "drift").length;

  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Configuration</span>
            <h1 className="text-3xl font-bold tracking-tight mt-1">Skills</h1>
            <p className="mt-1 text-sm text-muted-foreground">Side-by-side comparison between source and destination Genesys orgs.</p>
          </div>
          <div className="flex gap-2">
            <Stat label="Total" value={total} />
            <Stat label="Synced" value={synced} tone="text-success" />
            <Stat label="Missing" value={missing} tone="text-destructive" />
            <Stat label="Drift" value={drift} tone="text-warning" />
          </div>
        </div>
        <ObjectTable data={skills} kind="Skills" />
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
