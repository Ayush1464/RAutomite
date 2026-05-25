import { customers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

const statusTone = {
  active: "bg-success/10 text-success border-success/30",
  trial: "bg-info/10 text-info border-info/30",
  paused: "bg-muted text-muted-foreground border-border",
};

export function CustomerTable() {
  return (
    <div className="rounded-2xl border bg-card shadow-elegant overflow-hidden">
      <div className="px-5 py-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Customer accounts</h3>
          <p className="text-xs text-muted-foreground">All RAautomiTe tenants under your management</p>
        </div>
        <button className="px-3 h-9 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow transition">
          + Add customer
        </button>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="text-left px-5 py-3 font-medium">Customer</th>
            <th className="text-left px-5 py-3 font-medium">Orgs</th>
            <th className="text-left px-5 py-3 font-medium">Objects synced</th>
            <th className="text-left px-5 py-3 font-medium">MRR</th>
            <th className="text-left px-5 py-3 font-medium">Last sync</th>
            <th className="text-left px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-t hover:bg-muted/40 transition">
              <td className="px-5 py-3 font-medium flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-gradient-primary text-white grid place-items-center text-xs font-bold">
                  {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </div>
                {c.name}
              </td>
              <td className="px-5 py-3">{c.orgs}</td>
              <td className="px-5 py-3 font-mono text-xs">{c.objects.toLocaleString()}</td>
              <td className="px-5 py-3 font-semibold">{c.mrr}</td>
              <td className="px-5 py-3 text-xs text-muted-foreground font-mono">{c.lastSync}</td>
              <td className="px-5 py-3">
                <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium border capitalize", statusTone[c.status])}>{c.status}</span>
              </td>
              <td className="px-5 py-3">
                <button className="h-7 w-7 grid place-items-center rounded hover:bg-muted">
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
