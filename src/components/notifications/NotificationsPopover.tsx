import { Bell, AlertOctagon, AlertTriangle, Info } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { alerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const sevIcon = { critical: AlertOctagon, warning: AlertTriangle, info: Info };
const sevTone = {
  critical: "text-destructive bg-destructive/10",
  warning: "text-warning bg-warning/10",
  info: "text-info bg-info/10",
};

export function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  const unread = alerts.filter((a) => a.severity !== "info").length;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative h-9 w-9 grid place-items-center rounded-md border hover:bg-muted transition"
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold grid place-items-center">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[360px] rounded-xl border bg-popover shadow-glow overflow-hidden z-50 animate-fade-in">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="font-semibold text-sm">Alerts</div>
            <span className="text-xs text-muted-foreground">{alerts.length} total</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {alerts.map((a) => {
              const Icon = sevIcon[a.severity];
              return (
                <div key={a.id} className="px-4 py-3 border-b last:border-0 hover:bg-muted/40 cursor-pointer transition">
                  <div className="flex gap-3">
                    <div className={cn("h-7 w-7 rounded-md grid place-items-center shrink-0", sevTone[a.severity])}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{a.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{a.detail}</div>
                      <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{a.time}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="px-4 py-2.5 border-t bg-muted/30 text-center">
            <button className="text-xs text-primary font-medium hover:underline">View all alerts</button>
          </div>
        </div>
      )}
    </div>
  );
}
