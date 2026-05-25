import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

type Status = "synced" | "drift" | "running";

export function StatusBadge({ status }: { status: Status }) {
  const map = {
    synced: { label: "All Systems Synced", icon: CheckCircle2, cls: "bg-success/10 text-success border-success/30" },
    drift: { label: "Drift Detected", icon: AlertTriangle, cls: "bg-warning/10 text-warning border-warning/40" },
    running: { label: "Sync Running", icon: RefreshCw, cls: "bg-primary/10 text-primary border-primary/30" },
  } as const;
  const { label, icon: Icon, cls } = map[status];
  return (
    <span className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border", cls)}>
      <Icon className={cn("h-3.5 w-3.5", status === "running" && "animate-spin")} />
      {label}
    </span>
  );
}
