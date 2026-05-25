import { CheckCircle2, AlertTriangle, RefreshCw, XCircle, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const events = [
  { t: "2 min ago", icon: CheckCircle2, tone: "text-success bg-success/10", title: "Queue 'support-tier-2' recreated", desc: "Restored in us-east-1 · 142ms" },
  { t: "8 min ago", icon: RefreshCw, tone: "text-primary bg-primary/10", title: "Scheduled sync completed", desc: "1,284 objects · 0 failures" },
  { t: "27 min ago", icon: AlertTriangle, tone: "text-warning bg-warning/10", title: "Drift detected on Division 'EMEA'", desc: "3 properties differ · auto-heal queued" },
  { t: "1 hr ago", icon: GitBranch, tone: "text-accent bg-accent/10", title: "Flow 'IVR-main' v34 published", desc: "Snapshot stored · ready for replication" },
  { t: "3 hr ago", icon: XCircle, tone: "text-destructive bg-destructive/10", title: "Sync error on Skill 'Spanish-L2'", desc: "OAuth token refresh failed · retried OK" },
];

export function ActivityTimeline() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold">Recent Activity</h3>
          <p className="text-xs text-muted-foreground">Engine event stream</p>
        </div>
        <button className="text-xs text-primary hover:underline">View all</button>
      </div>
      <ol className="relative space-y-4">
        <span className="absolute left-[15px] top-2 bottom-2 w-px bg-border" />
        {events.map((e, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className="flex gap-3 relative group"
          >
            <motion.div
              whileHover={{ scale: 1.15, rotate: 5 }}
              className={cn("relative z-10 h-8 w-8 rounded-full grid place-items-center shrink-0 transition-shadow group-hover:shadow-glow", e.tone)}
            >
              <e.icon className={cn("h-4 w-4", i === 1 && "animate-spin")} />
            </motion.div>
            <div className="flex-1 min-w-0 group-hover:translate-x-0.5 transition-transform">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-medium truncate">{e.title}</div>
                <div className="text-[11px] text-muted-foreground font-mono shrink-0">{e.t}</div>
              </div>
              <div className="text-xs text-muted-foreground">{e.desc}</div>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
