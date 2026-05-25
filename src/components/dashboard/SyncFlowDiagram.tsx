import { motion, AnimatePresence } from "framer-motion";
import { Cloud, Cpu, Database, Zap } from "lucide-react";
import { useEffect, useState } from "react";

function Node({ icon: Icon, title, region, tone, side }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex-1 min-w-[200px] group"
    >
      <div className="relative rounded-2xl border bg-card p-5 shadow-elegant overflow-hidden transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-glow">
        <div className={`absolute inset-x-0 top-0 h-0.5 ${tone}`} />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-mesh pointer-events-none" />
        <div className="flex items-start gap-3">
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.5 }}
            className={`h-10 w-10 rounded-lg grid place-items-center ${tone} bg-opacity-10`}
          >
            <Icon className="h-5 w-5 text-white" />
          </motion.div>
          <div>
            <div className="text-sm font-semibold flex items-center gap-1.5">
              {title}
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            </div>
            <div className="text-xs text-muted-foreground font-mono">{region}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { l: "Queues", v: 142 },
            { l: "Flows", v: 68 },
            { l: "Skills", v: 94 },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="rounded-md bg-muted/60 p-2 hover:bg-muted transition-colors cursor-default"
            >
              <div className="text-[10px] text-muted-foreground uppercase">{s.l}</div>
              <div className="text-sm font-bold">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Pipe({ reverse = false }: { reverse?: boolean }) {
  // 3 staggered packets traveling along the pipe
  const packets = [0, 0.4, 0.8];
  return (
    <div className="relative flex items-center justify-center w-full md:w-32 h-16 md:h-auto">
      <svg viewBox="0 0 120 40" className="w-full h-10" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pipeg" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.18 220)" />
            <stop offset="100%" stopColor="oklch(0.7 0.17 175)" />
          </linearGradient>
        </defs>
        <line x1="0" y1="20" x2="120" y2="20" stroke="url(#pipeg)" strokeWidth="2.5" strokeDasharray="8 6" className="animate-flow" />
        <polygon points="115,14 122,20 115,26" fill="oklch(0.7 0.17 175)" />
      </svg>
      {/* Animated data packets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {packets.map((delay, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-accent shadow-glow"
            initial={{ x: reverse ? "100%" : "-10%", opacity: 0 }}
            animate={{
              x: reverse ? "-10%" : "100%",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.6,
              delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.9, 1],
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function SyncFlowDiagram() {
  const [throughput, setThroughput] = useState(1284);
  useEffect(() => {
    const id = setInterval(() => {
      setThroughput((t) => Math.max(900, Math.min(1600, t + Math.round((Math.random() - 0.5) * 80))));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold">Replication Pipeline</h3>
          <p className="text-xs text-muted-foreground">Live data flow between source and DR destination</p>
        </div>
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Streaming
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-3">
        <Node icon={Cloud} title="Source Org" region="AWS · us-west-2" tone="bg-primary" side="left" />
        <Pipe />
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          whileHover={{ y: -3 }}
          className="flex-1 min-w-[200px]"
        >
          <div className="relative rounded-2xl border bg-gradient-primary p-5 text-white shadow-glow overflow-hidden animate-glow-breathe">
            <div className="absolute inset-0 bg-mesh opacity-30" />
            {/* Shimmer sweep */}
            <div className="absolute inset-0 animate-shimmer pointer-events-none" />
            <div className="relative flex items-start gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="h-10 w-10 rounded-lg bg-white/15 grid place-items-center animate-pulse-ring"
              >
                <Cpu className="h-5 w-5" />
              </motion.div>
              <div>
                <div className="text-sm font-semibold">RAautomiTe Engine</div>
                <div className="text-xs text-white/80 font-mono">v2.4.1 · diff + restore</div>
              </div>
            </div>
            <div className="relative mt-4 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/80">Throughput</span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={throughput}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="font-mono tabular-nums"
                  >
                    {throughput.toLocaleString()} obj/min
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="h-1.5 rounded-full bg-white/15 overflow-hidden">
                <motion.div
                  className="h-full bg-white/80"
                  animate={{ width: `${(throughput / 1600) * 100}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-white/70 font-mono">
                {["diff", "validate", "apply"].map((s, i) => (
                  <motion.span
                    key={s}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6 }}
                  >
                    <Zap className="inline h-3 w-3 mr-0.5" />{s}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <Pipe />
        <Node icon={Database} title="Destination Org" region="AWS · us-east-1" tone="bg-accent" side="right" />
      </div>
    </div>
  );
}
