import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { History, RotateCcw, GitCompare } from "lucide-react";

export const Route = createFileRoute("/backups")({ component: Page });

const versions = [
  { ts: "2025-04-21 14:02 UTC", count: 12847, tag: "auto · scheduled" },
  { ts: "2025-04-21 13:47 UTC", count: 12842, tag: "auto · scheduled" },
  { ts: "2025-04-21 09:12 UTC", count: 12830, tag: "manual · pre-deploy" },
  { ts: "2025-04-20 22:04 UTC", count: 12814, tag: "auto · scheduled" },
];

function Page() {
  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Backup & Versions</h1>
          <p className="mt-1 text-sm text-muted-foreground">Immutable configuration snapshots. Restore or diff any point in time.</p>
        </div>
        <div className="rounded-2xl border bg-card shadow-elegant divide-y">
          {versions.map((v, i) => (
            <div key={i} className="flex items-center gap-4 p-4 hover:bg-muted/30">
              <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center text-primary"><History className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold font-mono text-sm">{v.ts}</div>
                <div className="text-xs text-muted-foreground">{v.count.toLocaleString()} objects · {v.tag}</div>
              </div>
              <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md border hover:bg-muted text-sm"><GitCompare className="h-4 w-4" />Compare</button>
              <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-gradient-primary text-white text-sm font-medium"><RotateCcw className="h-4 w-4" />Restore</button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
