import { X, Wand2, History as HistoryIcon, Network, FileJson } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JsonViewer } from "./JsonViewer";
import { StatusPill } from "./StatusPill";
import type { GenericObject } from "@/lib/mock-data";

type Tab = "overview" | "json" | "deps" | "history";

export function DetailPanel({
  obj, onClose, kind,
}: { obj: GenericObject | null; onClose: () => void; kind: string }) {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <AnimatePresence>
      {obj && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[520px] bg-card border-l shadow-glow z-50 flex flex-col"
          >
            <div className="px-5 py-4 border-b flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{kind}</div>
                <div className="text-lg font-bold truncate">{obj.name}</div>
                <div className="mt-1.5 flex items-center gap-2">
                  <StatusPill status={obj.status} />
                  <span className="text-xs text-muted-foreground font-mono">{obj.lastSync}</span>
                </div>
              </div>
              <button onClick={onClose} className="h-8 w-8 grid place-items-center rounded-md hover:bg-muted">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex border-b text-xs font-medium px-2">
              {[
                { id: "overview", label: "Overview", icon: FileJson },
                { id: "json", label: "JSON", icon: FileJson },
                { id: "deps", label: "Dependencies", icon: Network },
                { id: "history", label: "History", icon: HistoryIcon },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as Tab)}
                  className={`px-3 py-2.5 flex items-center gap-1.5 border-b-2 transition ${
                    tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <t.icon className="h-3.5 w-3.5" /> {t.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {tab === "overview" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Source ID" value={obj.srcId} mono />
                    <Field label="Destination ID" value={obj.dstId ?? "—"} mono />
                    <Field label="Last sync" value={obj.lastSync} />
                    <Field label="Division" value={obj.divisionId ?? "—"} mono />
                    {obj.routing && <Field label="Routing" value={obj.routing} />}
                    {obj.agents !== undefined && <Field label="Agents" value={String(obj.agents)} />}
                  </div>
                  {obj.skills && (
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                        Required skills
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {obj.skills.map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
              {tab === "json" && (
                <JsonViewer value={{ id: obj.srcId, name: obj.name, divisionId: obj.divisionId, skills: obj.skills, mediaSettings: { call: { alertingTimeoutSeconds: 30, serviceLevel: { percentage: 0.8, durationMs: 20000 } } }, routingMethod: obj.routing, memberCount: obj.agents }} />
              )}
              {tab === "deps" && (
                <div className="space-y-2">
                  {(obj.skills ?? ["—"]).map((s, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30">
                      <Network className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">{s}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground font-mono">depends on</span>
                    </div>
                  ))}
                  {obj.divisionId && (
                    <div className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30">
                      <Network className="h-4 w-4 text-warning" />
                      <span className="text-sm font-medium">{obj.divisionId}</span>
                      <span className="ml-auto text-[10px] text-muted-foreground font-mono">division</span>
                    </div>
                  )}
                </div>
              )}
              {tab === "history" && (
                <ol className="relative space-y-3">
                  <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
                  {[
                    { t: "2m ago", e: "Replicated successfully" },
                    { t: "1h ago", e: "Drift cleared via auto-heal" },
                    { t: "yesterday", e: "Created in source org" },
                  ].map((h, i) => (
                    <li key={i} className="flex gap-3 relative">
                      <span className="relative z-10 mt-1 h-3.5 w-3.5 rounded-full bg-primary/20 border-2 border-primary" />
                      <div className="flex-1">
                        <div className="text-sm">{h.e}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{h.t}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div className="px-5 py-3 border-t flex items-center gap-2">
              <button className="flex-1 inline-flex items-center justify-center gap-2 h-10 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow transition">
                <Wand2 className="h-4 w-4" /> Restore to destination
              </button>
              <button className="h-10 px-4 rounded-md border bg-background hover:bg-muted text-sm transition">View logs</button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
      <div className={`mt-0.5 text-sm ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
  );
}
