import { CheckCircle2, AlertTriangle, XCircle, AlertOctagon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ObjectStatus } from "@/lib/mock-data";

const map = {
  synced:  { label: "Synced",  icon: CheckCircle2, cls: "bg-success/10 text-success border-success/30" },
  drift:   { label: "Drift",   icon: AlertTriangle, cls: "bg-warning/10 text-warning border-warning/40" },
  missing: { label: "Missing", icon: XCircle, cls: "bg-destructive/10 text-destructive border-destructive/30" },
  error:   { label: "Error",   icon: AlertOctagon, cls: "bg-destructive/10 text-destructive border-destructive/40" },
} as const;

export function StatusPill({ status }: { status: ObjectStatus }) {
  const { label, icon: Icon, cls } = map[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border", cls)}>
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}
