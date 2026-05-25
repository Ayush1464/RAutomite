import { AlertOctagon, AlertTriangle, Info } from "lucide-react";
import type { Alert } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const sev = {
  critical: { icon: AlertOctagon, cls: "border-destructive/40 bg-destructive/5", iconCls: "text-destructive bg-destructive/10" },
  warning:  { icon: AlertTriangle, cls: "border-warning/40 bg-warning/5",        iconCls: "text-warning bg-warning/10" },
  info:     { icon: Info, cls: "border-info/40 bg-info/5",                       iconCls: "text-info bg-info/10" },
} as const;

export function AlertCard({ alert }: { alert: Alert }) {
  const { icon: Icon, cls, iconCls } = sev[alert.severity];
  return (
    <div className={cn("flex items-center gap-3 p-4 rounded-xl border", cls)}>
      <div className={cn("h-9 w-9 rounded-lg grid place-items-center shrink-0", iconCls)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">{alert.title}</div>
        <div className="text-xs text-muted-foreground truncate">{alert.detail}</div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{alert.severity}</span>
        <span className="text-xs text-muted-foreground font-mono">{alert.time}</span>
      </div>
    </div>
  );
}
