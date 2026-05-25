import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { StatusPill } from "./StatusPill";
import { DetailPanel } from "./DetailPanel";
import type { GenericObject, ObjectStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const filters: { id: ObjectStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "synced", label: "Synced" },
  { id: "missing", label: "Missing" },
  { id: "drift", label: "Drift" },
  { id: "error", label: "Errors" },
];

export function ObjectTable({
  data, kind, extraColumns,
}: {
  data: GenericObject[];
  kind: string;
  extraColumns?: { key: keyof GenericObject; label: string; render?: (v: any) => React.ReactNode }[];
}) {
  const [filter, setFilter] = useState<ObjectStatus | "all">("all");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<GenericObject | null>(null);

  const rows = useMemo(
    () =>
      data.filter(
        (r) =>
          (filter === "all" || r.status === filter) &&
          (q === "" || r.name.toLowerCase().includes(q.toLowerCase()))
      ),
    [data, filter, q]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: data.length, synced: 0, missing: 0, drift: 0, error: 0 };
    data.forEach((r) => (c[r.status] = (c[r.status] || 0) + 1));
    return c;
  }, [data]);

  return (
    <>
      <div className="rounded-2xl border bg-card shadow-elegant overflow-hidden">
        <div className="px-5 py-4 border-b flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${kind.toLowerCase()}…`}
              className="w-full h-9 pl-9 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Filter className="h-3.5 w-3.5 text-muted-foreground mr-1" />
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium border transition",
                  filter === f.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background hover:bg-muted border-border text-muted-foreground"
                )}
              >
                {f.label} <span className="opacity-60 ml-1">{counts[f.id]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Name</th>
                <th className="text-left px-5 py-3 font-medium">Source ID</th>
                <th className="text-left px-5 py-3 font-medium">Destination ID</th>
                {extraColumns?.map((c) => (
                  <th key={String(c.key)} className="text-left px-5 py-3 font-medium">{c.label}</th>
                ))}
                <th className="text-left px-5 py-3 font-medium">Last sync</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => setSel(r)}
                  className="border-t cursor-pointer hover:bg-muted/40 transition"
                >
                  <td className="px-5 py-3 font-medium">{r.name}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.srcId}</td>
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.dstId ?? "—"}</td>
                  {extraColumns?.map((c) => {
                    const v = r[c.key];
                    return <td key={String(c.key)} className="px-5 py-3 text-xs">{c.render ? c.render(v) : (v ?? "—") as any}</td>;
                  })}
                  <td className="px-5 py-3 text-xs text-muted-foreground font-mono">{r.lastSync}</td>
                  <td className="px-5 py-3"><StatusPill status={r.status} /></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-muted-foreground">No {kind.toLowerCase()} match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DetailPanel obj={sel} onClose={() => setSel(null)} kind={kind} />
    </>
  );
}
