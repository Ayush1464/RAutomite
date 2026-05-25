import { Layers, Sparkles, Shield, GitBranch, Users } from "lucide-react";

const objects = [
  { name: "Queues", icon: Layers, total: 142, synced: 138, missing: 3, errors: 1, accent: "from-sky-500 to-blue-600" },
  { name: "Users", icon: Users, total: 248, synced: 245, missing: 2, errors: 1, accent: "from-rose-500 to-pink-600" },
  { name: "Skills", icon: Sparkles, total: 94, synced: 94, missing: 0, errors: 0, accent: "from-emerald-500 to-teal-600" },
  { name: "Divisions", icon: Shield, total: 22, synced: 21, missing: 1, errors: 0, accent: "from-violet-500 to-indigo-600" },
  { name: "Flows", icon: GitBranch, total: 68, synced: 64, missing: 2, errors: 2, accent: "from-amber-500 to-orange-600" },
];

export function ObjectStatusGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {objects.map((o) => {
        const pct = Math.round((o.synced / o.total) * 100);
        return (
          <div key={o.name} className="rounded-2xl border bg-card p-5 shadow-elegant">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${o.accent} grid place-items-center text-white shadow-md`}>
                <o.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{o.name}</div>
                <div className="text-xs text-muted-foreground font-mono">{o.synced}/{o.total} synced</div>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${o.accent}`} style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div><div className="text-success font-bold">{o.synced}</div><div className="text-muted-foreground">Synced</div></div>
              <div><div className="text-warning font-bold">{o.missing}</div><div className="text-muted-foreground">Missing</div></div>
              <div><div className="text-destructive font-bold">{o.errors}</div><div className="text-muted-foreground">Errors</div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
