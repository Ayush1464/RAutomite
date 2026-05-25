import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  synced: 800 + Math.round(Math.sin(i / 2) * 200 + Math.random() * 150 + i * 30),
  failed: Math.max(0, Math.round(Math.random() * 25 - 5)),
}));

export function SyncTrendChart() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Sync Trends</h3>
          <p className="text-xs text-muted-foreground">Objects processed · last 14 days</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Synced</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Failed</span>
        </div>
      </div>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, right: 6, top: 6 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.55 0.18 220)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="oklch(0.55 0.18 220)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="oklch(0.6 0.22 25)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.7 0.02 250 / 0.2)" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11 }} stroke="oklch(0.5 0.02 250)" tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0.02 250)" tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
            <Area type="monotone" dataKey="synced" stroke="oklch(0.55 0.18 220)" strokeWidth={2} fill="url(#g1)" />
            <Area type="monotone" dataKey="failed" stroke="oklch(0.6 0.22 25)" strokeWidth={2} fill="url(#g2)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
