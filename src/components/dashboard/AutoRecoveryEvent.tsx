import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Wand2, X } from "lucide-react";
import { useEffect, useState } from "react";

type RecoveryStep = { label: string; ms: number };

const STEPS: RecoveryStep[] = [
  { label: "Drift detected · Queue 'support-tier-2' missing in DR", ms: 900 },
  { label: "Snapshotting source configuration", ms: 1100 },
  { label: "Validating dependencies (Division → Skills)", ms: 1200 },
  { label: "Applying restore to us-east-1", ms: 1400 },
  { label: "✓ Auto-Recovery complete · DR consistent", ms: 1600 },
];

export function AutoRecoveryEvent() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Demo trigger: opens 4s after mount, then loops every ~24s
  useEffect(() => {
    const trigger = () => {
      setStep(0);
      setDone(false);
      setOpen(true);
    };
    const t1 = setTimeout(trigger, 4000);
    const t2 = setInterval(trigger, 24000);
    return () => {
      clearTimeout(t1);
      clearInterval(t2);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (step >= STEPS.length - 1) {
      setDone(true);
      const close = setTimeout(() => setOpen(false), 4000);
      return () => clearTimeout(close);
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEPS[step].ms);
    return () => clearTimeout(t);
  }, [open, step]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed bottom-6 right-6 z-50 w-[360px] rounded-2xl border bg-card shadow-glow overflow-hidden"
        >
          {/* Sweep highlight */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-recovery-sweep" />
          </div>

          {/* Top bar */}
          <div className="relative flex items-center gap-2 px-4 py-3 bg-gradient-primary text-white">
            <motion.div
              animate={done ? { rotate: 0 } : { rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.8, repeat: done ? 0 : Infinity }}
              className="h-7 w-7 rounded-md bg-white/20 grid place-items-center"
            >
              {done ? <ShieldCheck className="h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="text-xs uppercase tracking-widest text-white/80 font-semibold">
                {done ? "Recovery complete" : "Auto-Recovery triggered"}
              </div>
              <div className="text-sm font-bold truncate">DR Self-Healing in progress</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="h-6 w-6 rounded grid place-items-center hover:bg-white/15 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Steps */}
          <div className="relative p-4 space-y-2">
            {STEPS.slice(0, step + 1).map((s, i) => {
              const isCurrent = i === step && !done;
              const isComplete = i < step || done;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2 text-xs"
                >
                  <span className="mt-0.5 h-4 w-4 shrink-0 grid place-items-center">
                    {isComplete ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        className="h-3.5 w-3.5 rounded-full bg-success grid place-items-center text-[8px] text-white font-bold"
                      >
                        ✓
                      </motion.span>
                    ) : isCurrent ? (
                      <span className="relative h-3 w-3">
                        <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                        <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-muted" />
                    )}
                  </span>
                  <span
                    className={
                      isComplete
                        ? "text-foreground"
                        : isCurrent
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {s.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="relative h-1 bg-muted/50">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
