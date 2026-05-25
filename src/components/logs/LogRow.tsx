import { useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";

import type { LogEntry } from "@/lib/mock-data";

import { cn } from "@/lib/utils";

const levelStyles: Record<LogEntry["level"], string> = {
  info: "bg-primary/10 text-primary border-primary/20",

  warn: "bg-warning/10 text-warning border-warning/20",

  error: "bg-destructive/10 text-destructive border-destructive/20",

  debug: "bg-muted text-muted-foreground border-border",
};

export function LogRow({ log }: { log: LogEntry }) {
  const [open, setOpen] = useState(false);

  const expandable = Boolean(log.details);

  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        onClick={() => expandable && setOpen((value) => !value)}
        className={cn(
          "grid w-full grid-cols-[20px_150px_76px_140px_1fr] items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-muted/50",

          !expandable && "cursor-default",
        )}
        aria-expanded={expandable ? open : undefined}
      >
        <span className="text-muted-foreground">
          {expandable ? (
            open ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )
          ) : null}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {log.ts}
        </span>
        <span
          className={cn(
            "w-fit rounded border px-2 py-0.5 font-mono text-[11px] uppercase",
            levelStyles[log.level],
          )}
        >
          {log.level}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {log.job}
        </span>
        <span className="min-w-0 truncate">
          {log.object && (
            <span className="mr-2 font-mono text-xs text-muted-foreground">
              {log.object}
            </span>
          )}

          {log.message}
        </span>
      </button>

      {open && log.details && (
        <div className="px-4 pb-4 pl-[224px]">
          <pre className="overflow-x-auto rounded-md border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
            {log.details}
          </pre>
        </div>
      )}
    </div>
  );
}
export default LogRow;
