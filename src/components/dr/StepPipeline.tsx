import { useEffect, useState } from "react";
import { Search, GitCompare, Wand2, RefreshCw, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  { id: "fetch", label: "Fetching", desc: "Pulling source config", icon: Search },
  { id: "compare", label: "Comparing", desc: "Diffing object trees", icon: GitCompare },
  { id: "restore", label: "Restoring", desc: "Applying missing objects", icon: Wand2 },
  { id: "sync", label: "Syncing", desc: "Validating destination", icon: RefreshCw },
];

export function StepPipeline() {
  const [current, setCurrent] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % (steps.length + 1)), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold">Live execution pipeline</h3>
          <p className="text-xs text-muted-foreground">Current job_a91f progressing through stages</p>
        </div>
        <span className="text-xs font-mono text-muted-foreground">stage {Math.min(current + 1, steps.length)}/{steps.length}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
        {steps.map((s, i) => {
          const done = i < current;
          const active = i === current;
          const Icon = s.icon;
          return (
            <div key={s.id} className="relative">
              <motion.div
                animate={active ? { scale: [1, 1.02, 1] } : { scale: 1 }}
                transition={{ duration: 1.4, repeat: active ? Infinity : 0 }}
                className={cn(
                  "relative rounded-xl border p-4 overflow-hidden transition-colors",
                  done && "border-success/40 bg-success/5",
                  active && "border-primary/40 bg-primary/5",
                  !done && !active && "border-border bg-muted/30"
                )}
              >
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-recovery-sweep pointer-events-none" />
                )}
                <div className="relative flex items-center gap-3">
                  <div
                    className={cn(
                      "h-9 w-9 rounded-lg grid place-items-center",
                      done && "bg-success text-white",
                      active && "bg-primary text-white",
                      !done && !active && "bg-muted text-muted-foreground"
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : <Icon className={cn("h-4 w-4", active && "animate-spin-slow")} />}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{s.label}</div>
                    <div className="text-[11px] text-muted-foreground">{s.desc}</div>
                  </div>
                </div>
              </motion.div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 -translate-y-1/2 bg-border" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
