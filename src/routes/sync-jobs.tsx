import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Play, Square, FileText, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/sync-jobs")({ component: Page });

const jobs = [
  { id: "job_a91f3", status: "running", duration: "00:02:14", objects: 482, started: "2m ago" },
  { id: "job_a91e7", status: "completed", duration: "00:04:32", objects: 1284, started: "18m ago" },
  { id: "job_a91d1", status: "completed", duration: "00:03:51", objects: 1201, started: "33m ago" },
  { id: "job_a91c8", status: "failed", duration: "00:00:41", objects: 12, started: "1h ago" },
  { id: "job_a91b0", status: "completed", duration: "00:05:12", objects: 1340, started: "2h ago" },
];

function StatusPill({ s }: { s: string }) {
  const map: any = {
    running: { cls: "bg-primary/10 text-primary border-primary/30", icon: RefreshCw, spin: true },
    completed: { cls: "bg-success/10 text-success border-success/30", icon: CheckCircle2 },
    failed: { cls: "bg-destructive/10 text-destructive border-destructive/30", icon: XCircle },
  };
  const m = map[s];
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${m.cls}`}><m.icon className={`h-3 w-3 ${m.spin ? "animate-spin" : ""}`} />{s}</span>;
}

function Page() {
  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sync Jobs</h1>
            <p className="mt-1 text-sm text-muted-foreground">Monitor and control replication jobs across regions.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 h-10 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant"><Play className="h-4 w-4" />New Sync</button>
        </div>
        <div className="rounded-2xl border bg-card shadow-elegant overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr><th className="text-left px-5 py-3 font-medium">Job ID</th><th className="text-left px-5 py-3 font-medium">Status</th><th className="text-left px-5 py-3 font-medium">Duration</th><th className="text-left px-5 py-3 font-medium">Objects</th><th className="text-left px-5 py-3 font-medium">Started</th><th className="text-right px-5 py-3 font-medium">Actions</th></tr>
            </thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j.id} className="border-t hover:bg-muted/30">
                  <td className="px-5 py-3 font-mono text-xs">{j.id}</td>
                  <td className="px-5 py-3"><StatusPill s={j.status} /></td>
                  <td className="px-5 py-3 font-mono">{j.duration}</td>
                  <td className="px-5 py-3 font-medium">{j.objects.toLocaleString()}</td>
                  <td className="px-5 py-3 text-muted-foreground">{j.started}</td>
                  <td className="px-5 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      {j.status === "running" ? <button className="h-8 w-8 grid place-items-center rounded-md border hover:bg-muted"><Square className="h-3.5 w-3.5" /></button> : <button className="h-8 w-8 grid place-items-center rounded-md border hover:bg-muted"><Play className="h-3.5 w-3.5" /></button>}
                      <button className="h-8 w-8 grid place-items-center rounded-md border hover:bg-muted"><FileText className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
