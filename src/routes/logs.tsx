import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

import { logs } from "@/lib/mock-data";
import { Search, Download } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import LogRow from "@/components/logs/LogRow";


export const Route = createFileRoute("/logs")({ component: Page });

const levels = ["all", "info", "warn", "error", "debug"] as const;

function Page() {
  const [level, setLevel] = useState<(typeof levels)[number]>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () =>
      logs.filter(
        (l) =>
          (level === "all" || l.level === level) &&
          (q === "" || l.message.toLowerCase().includes(q.toLowerCase()) || l.job.includes(q))
      ),
    [level, q]
  );

  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Reliability</span>
            <h1 className="text-3xl font-bold tracking-tight mt-1">Engine logs</h1>
            <p className="mt-1 text-sm text-muted-foreground">Structured events from sync jobs · click any error to expand its stack.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-3 h-9 rounded-md border bg-background hover:bg-muted text-sm">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>

        <div className="rounded-2xl border bg-card shadow-elegant overflow-hidden">
          <div className="px-4 py-3 border-b flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Filter by job, object, message…"
                className="w-full h-9 pl-9 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring font-mono"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {levels.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(l)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium border uppercase font-mono transition",
                    level === l ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted border-border text-muted-foreground"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="max-h-[600px] overflow-y-auto">
            {filtered.map((l) => <LogRow key={l.id} log={l} />)}
            {filtered.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No logs match.</div>}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
