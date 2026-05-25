import { Pause, Play, Wand2, Loader2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function ControlPanel() {
  const [running, setRunning] = useState(true);
  const [autoHeal, setAutoHeal] = useState(true);

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-elegant">
      <div className="flex flex-col xl:flex-row gap-6 xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center shadow-glow">
            {running ? (
              <Loader2 className="h-7 w-7 text-white animate-spin" />
            ) : (
              <Pause className="h-7 w-7 text-white" />
            )}
            {running && <span className="absolute inset-0 rounded-2xl ring-4 ring-primary/30 animate-ping" />}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Sync engine
            </div>
            <div className="text-2xl font-bold tracking-tight">
              {running ? "Replication active" : "Engine paused"}
            </div>
            <div className="text-xs text-muted-foreground font-mono mt-0.5">
              job_a91f · started 1m 24s ago · 842 / 1284 obj
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setRunning(true)}
            disabled={running}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Play className="h-4 w-4" /> Start sync
          </button>
          <button
            onClick={() => setRunning(false)}
            disabled={!running}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-md border bg-background hover:bg-muted text-sm font-medium disabled:opacity-50 transition"
          >
            <Pause className="h-4 w-4" /> Stop
          </button>
          <div className="h-8 w-px bg-border mx-1 hidden md:block" />
          <motion.button
            onClick={() => setAutoHeal(!autoHeal)}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex items-center gap-3 h-10 pl-4 pr-2 rounded-md border text-sm font-medium transition ${
              autoHeal ? "bg-success/10 border-success/30 text-success" : "bg-muted border-border text-muted-foreground"
            }`}
          >
            <Wand2 className="h-4 w-4" />
            Auto-Healing
            <span className={`relative w-9 h-5 rounded-full transition-colors ${autoHeal ? "bg-success" : "bg-muted-foreground/30"}`}>
              <motion.span
                className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow"
                animate={{ left: autoHeal ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
