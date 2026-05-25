import { useEffect, useState, useRef } from "react";
import { CheckCircle2, AlertTriangle, Wand2, RefreshCw, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Event = { id: number; ts: string; tone: string; icon: any; title: string; detail: string };

const templates = [
  { tone: "text-success bg-success/10", icon: CheckCircle2, title: "Queue restored", detail: "support-tier-2 → us-east-1" },
  { tone: "text-warning bg-warning/10", icon: AlertTriangle, title: "Drift detected", detail: "Division 'EMEA' · 3 properties" },
  { tone: "text-primary bg-primary/10", icon: Wand2, title: "Auto-heal triggered", detail: "Skill 'Spanish-L2' missing" },
  { tone: "text-accent bg-accent/10", icon: RefreshCw, title: "Replication tick", detail: "168 objects compared · 2 changed" },
  { tone: "text-destructive bg-destructive/10", icon: XCircle, title: "OAuth refresh failed", detail: "Retried · token rotated" },
  { tone: "text-success bg-success/10", icon: CheckCircle2, title: "User mirrored", detail: "Aiko Tanaka → DR org" },
  { tone: "text-primary bg-primary/10", icon: RefreshCw, title: "Snapshot created", detail: "v34.2 · 1,284 objects" },
];

export function EventStream() {
  const [events, setEvents] = useState<Event[]>(() =>
    templates.slice(0, 5).map((t, i) => ({ id: i, ts: `${i + 1}s ago`, ...t }))
  );
  const idRef = useRef(events.length);

  useEffect(() => {
    const id = setInterval(() => {
      const t = templates[Math.floor(Math.random() * templates.length)];
      idRef.current += 1;
      setEvents((prev) => [{ id: idRef.current, ts: "just now", ...t }, ...prev].slice(0, 12));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border bg-card shadow-elegant flex flex-col h-[460px]">
      <div className="px-5 py-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold">DR event stream</h3>
          <p className="text-xs text-muted-foreground">Live engine events · auto-scroll</p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Live
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <AnimatePresence initial={false}>
          {events.map((e) => (
            <motion.div
              key={e.id}
              layout
              initial={{ opacity: 0, x: -12, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-muted/40"
            >
              <div className={cn("h-8 w-8 rounded-md grid place-items-center shrink-0", e.tone)}>
                <e.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{e.title}</div>
                <div className="text-xs text-muted-foreground truncate">{e.detail}</div>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono shrink-0">{e.ts}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
