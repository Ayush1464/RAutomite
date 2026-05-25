import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRole, type Role } from "@/context/RoleContext";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-1.5">
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm text-muted-foreground max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "bg-primary",
}: {
  label: string;
  value: ReactNode;
  delta?: ReactNode;
  icon?: any;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-elegant relative overflow-hidden">
      <div className={cn("absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-10 blur-2xl", accent)} />
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{label}</div>
        {Icon && (
          <div className={cn("h-8 w-8 rounded-lg grid place-items-center text-white", accent)}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="mt-3 text-3xl font-bold tracking-tight tabular-nums">{value}</div>
      {delta && <div className="mt-1 text-xs text-muted-foreground">{delta}</div>}
    </div>
  );
}

type StatusTone = "success" | "warning" | "error" | "info" | "neutral";
const TONES: Record<StatusTone, string> = {
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  error: "bg-destructive/15 text-destructive border-destructive/30",
  info: "bg-primary/15 text-primary border-primary/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ tone = "neutral", children }: { tone?: StatusTone; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold uppercase tracking-wider", TONES[tone])}>
      <span className={cn("h-1.5 w-1.5 rounded-full", {
        "bg-success": tone === "success",
        "bg-warning": tone === "warning",
        "bg-destructive": tone === "error",
        "bg-primary": tone === "info",
        "bg-muted-foreground": tone === "neutral",
      })} />
      {children}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon?: any;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed bg-card/50 p-10 text-center">
      {Icon && (
        <div className="h-14 w-14 mx-auto rounded-2xl bg-muted grid place-items-center mb-4">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <h3 className="font-semibold text-lg">{title}</h3>
      {description && <p className="mt-1.5 text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function RoleGuard({
  allow,
  fallback,
  children,
}: {
  allow: Role[];
  fallback?: ReactNode;
  children: ReactNode;
}) {
  const { role } = useRole();
  if (!allow.includes(role)) return <>{fallback ?? null}</>;
  return <>{children}</>;
}