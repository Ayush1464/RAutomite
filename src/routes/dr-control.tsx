import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { ControlPanel } from "@/components/dr/ControlPanel";
import { StepPipeline } from "@/components/dr/StepPipeline";
import { EventStream } from "@/components/dr/EventStream";
import { DependencyGraph } from "@/components/dr/DependencyGraph";
import { SyncFlowDiagram } from "@/components/dashboard/SyncFlowDiagram";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

export const Route = createFileRoute("/dr-control")({ component: Page });

function Page() {
  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Operations · Disaster Recovery
            </span>
            <StatusBadge status="running" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            DR <span className="text-gradient">Control Center</span>
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Run, pause, and observe the replication engine. Toggle Auto-Healing to let RAautomiTe restore drift automatically.
          </p>
        </div>

        <ControlPanel />
        <StepPipeline />
        <SyncFlowDiagram />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2"><DependencyGraph /></div>
          <EventStream />
        </div>
      </div>
    </AppShell>
  );
}
