import { driftMatrix, driftRows } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tones = ["bg-muted/40", "bg-warning/30", "bg-warning/60", "bg-destructive/70"];

export function DriftHeatmap() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold">Drift heatmap · last 24h</h3>
          <p className="text-xs text-muted-foreground">Object types × hour buckets · darker = more drift events</p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span>none</span>
          {tones.map((t, i) => <span key={i} className={cn("h-3 w-4 rounded-sm", t)} />)}
          <span>high</span>
        </div>
      </div>
      <div className="space-y-1.5 overflow-x-auto">
        {driftRows.map((row, ri) => (
          <div key={row} className="flex items-center gap-2">
            <div className="w-20 shrink-0 text-xs text-muted-foreground font-medium">{row}</div>
            <div className="flex gap-1">
              {driftMatrix[ri].map((v, ci) => (
                <div
                  key={ci}
                  title={`${row} · ${ci}:00 · ${v} events`}
                  className={cn("h-5 w-5 rounded-sm transition-transform hover:scale-125 cursor-pointer", tones[Math.min(v, 3)])}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="flex gap-2 mt-2 ml-22">
          <div className="w-20 shrink-0" />
          <div className="flex gap-1 text-[9px] text-muted-foreground font-mono">
            {Array.from({ length: 24 }).map((_, h) => (
              <div key={h} className="w-5 text-center">{h % 6 === 0 ? `${h}h` : ""}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
