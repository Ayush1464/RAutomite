import ReactFlow, {
  Background, Controls, Handle, Position, type Node, type Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { Layers, Sparkles, Building2, Users, GitBranch } from "lucide-react";
import { useMemo } from "react";

function NodeCard({ data }: any) {
  const Icon = data.icon;
  return (
    <div
      className={`relative rounded-xl border bg-card px-4 py-3 shadow-elegant min-w-[170px] ${
        data.center ? "ring-2 ring-primary/50 animate-node-pulse" : ""
      }`}
    >
      <Handle type="target" position={Position.Left} className="!bg-primary !border-card" />
      <Handle type="source" position={Position.Right} className="!bg-accent !border-card" />
      <div className="flex items-center gap-2.5">
        <div
          className={`h-8 w-8 rounded-lg grid place-items-center text-white ${
            data.center ? "bg-gradient-primary" : data.tone ?? "bg-primary"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            {data.kind}
          </div>
          <div className="text-sm font-bold leading-tight">{data.label}</div>
        </div>
      </div>
      {data.detail && (
        <div className="mt-2 text-[11px] text-muted-foreground font-mono">{data.detail}</div>
      )}
    </div>
  );
}

const nodeTypes = { card: NodeCard };

export function DependencyGraph() {
  const nodes: Node[] = useMemo(
    () => [
      {
        id: "queue", type: "card", position: { x: 280, y: 160 },
        data: { kind: "Queue", label: "support-tier-1", icon: Layers, center: true, detail: "id: q_8a1f · 24 agents" },
      },
      {
        id: "skill1", type: "card", position: { x: 0, y: 0 },
        data: { kind: "Skill", label: "English", icon: Sparkles, tone: "bg-accent" },
      },
      {
        id: "skill2", type: "card", position: { x: 0, y: 100 },
        data: { kind: "Skill", label: "Tier-1", icon: Sparkles, tone: "bg-accent" },
      },
      {
        id: "div", type: "card", position: { x: 0, y: 320 },
        data: { kind: "Division", label: "AMER", icon: Building2, tone: "bg-warning" },
      },
      {
        id: "users", type: "card", position: { x: 600, y: 80 },
        data: { kind: "Users", label: "24 agents", icon: Users, tone: "bg-success", detail: "Riya, Carlos, +22" },
      },
      {
        id: "flow", type: "card", position: { x: 600, y: 280 },
        data: { kind: "Flow", label: "IVR-main", icon: GitBranch, tone: "bg-primary-glow" },
      },
    ],
    []
  );

  const edges: Edge[] = useMemo(
    () => [
      { id: "e1", source: "skill1", target: "queue", animated: true, style: { stroke: "oklch(0.7 0.17 175)", strokeWidth: 2 } },
      { id: "e2", source: "skill2", target: "queue", animated: true, style: { stroke: "oklch(0.7 0.17 175)", strokeWidth: 2 } },
      { id: "e3", source: "div", target: "queue", animated: true, style: { stroke: "oklch(0.78 0.16 80)", strokeWidth: 2 } },
      { id: "e4", source: "queue", target: "users", animated: true, style: { stroke: "oklch(0.68 0.17 160)", strokeWidth: 2 } },
      { id: "e5", source: "queue", target: "flow", animated: true, style: { stroke: "oklch(0.7 0.16 210)", strokeWidth: 2 } },
    ],
    []
  );

  return (
    <div className="rounded-2xl border bg-card shadow-elegant overflow-hidden">
      <div className="px-5 py-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Dependency graph</h3>
          <p className="text-xs text-muted-foreground">Queue ⇄ Skills · Division · Users · Flow</p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" />Skill</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-warning" />Division</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Users</span>
        </div>
      </div>
      <div style={{ height: 460 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable
          panOnDrag
          zoomOnScroll
        >
          <Background gap={20} size={1} color="oklch(0.5 0.02 250 / 0.15)" />
          <Controls className="!bg-card !border !border-border [&_button]:!bg-card [&_button]:!border-border [&_button]:!text-foreground" />
        </ReactFlow>
      </div>
    </div>
  );
}
