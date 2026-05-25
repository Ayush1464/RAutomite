import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MetricCard({ label, value, delta, deltaTone = "up", icon: Icon, accent }: {
  label: string; value: string; delta?: string; deltaTone?: "up" | "down" | "neutral"; icon: any; accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border bg-card p-5 shadow-elegant relative overflow-hidden group hover:shadow-glow transition-shadow"
    >
      <div className={cn("absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-10 blur-2xl group-hover:opacity-25 transition-opacity duration-500", accent ?? "bg-primary")} />
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{label}</div>
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={cn("h-8 w-8 rounded-lg grid place-items-center text-white", accent ?? "bg-primary")}
        >
          <Icon className="h-4 w-4" />
        </motion.div>
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight tabular-nums animate-count-pop">{value}</div>
      {delta && (
        <div className={cn("mt-1 inline-flex items-center gap-1 text-xs font-medium",
          deltaTone === "up" && "text-success", deltaTone === "down" && "text-destructive", deltaTone === "neutral" && "text-muted-foreground"
        )}>
          {deltaTone === "up" ? <ArrowUpRight className="h-3 w-3" /> : deltaTone === "down" ? <ArrowDownRight className="h-3 w-3" /> : null}
          {delta}
        </div>
      )}
    </motion.div>
  );
}
