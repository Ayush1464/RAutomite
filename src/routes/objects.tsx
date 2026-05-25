import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useState } from "react";

export const Route = createFileRoute("/objects")({ component: Page });

const queues = [
  { name: "support-tier-1", src: "q_8a1f", dst: "q_8a1f", status: "synced" },
  { name: "support-tier-2", src: "q_8a2c", dst: "—", status: "missing" },
  { name: "billing-priority", src: "q_8a3d", dst: "q_8a3d", status: "synced" },
  { name: "sales-emea", src: "q_8a4e", dst: "q_8a4e", status: "synced" },
  { name: "vip-callback", src: "q_8a5f", dst: "—", status: "missing" },
  { name: "outbound-survey", src: "q_8a6a", dst: "q_8a6a", status: "drift" },
];

function Page() {
  const [sel, setSel] = useState(queues[1]);
  const json = JSON.stringify({ id: sel.src, name: sel.name, mediaSettings: { call: { alertingTimeoutSeconds: 30, serviceLevel: { percentage: 0.8, durationMs: 20000 } } }, divisionId: "div_emea_1", skillEvaluationMethod: "BEST", memberCount: 24 }, null, 2);
  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Objects · Queues</h1>
          <p className="mt-1 text-sm text-muted-foreground">Compare configuration objects between source and destination orgs.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border bg-card shadow-elegant overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
                <tr><th className="text-left px-5 py-3 font-medium">Queue</th><th className="text-left px-5 py-3 font-medium">Source ID</th><th className="text-left px-5 py-3 font-medium">Destination ID</th><th className="text-left px-5 py-3 font-medium">Status</th></tr>
              </thead>
              <tbody>
                {queues.map(q => {
                  const tone = q.status === "synced" ? "bg-success/10 text-success" : q.status === "missing" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning";
                  return (
                    <tr key={q.name} onClick={() => setSel(q)} className={`border-t cursor-pointer hover:bg-muted/30 ${sel.name === q.name ? "bg-primary/5" : ""}`}>
                      <td className="px-5 py-3 font-medium">{q.name}</td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{q.src}</td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{q.dst}</td>
                      <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${tone}`}>{q.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl border bg-card shadow-elegant overflow-hidden">
            <div className="px-4 py-3 border-b flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Object detail</div>
                <div className="font-semibold">{sel.name}</div>
              </div>
              <span className="text-[10px] uppercase font-mono text-muted-foreground">JSON</span>
            </div>
            <pre className="p-4 text-xs font-mono overflow-auto max-h-[460px] bg-sidebar-bg text-sidebar-fg">{json}</pre>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
