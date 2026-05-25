import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, ShieldCheck, RefreshCw, Database, Users, Sparkles, Building2, GitBranch,
  History, ShieldAlert, ScrollText, Settings, Crown, Zap, ChevronRight, Layers, CreditCard,
  Bell, CalendarClock, FileBarChart2, Plug, SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRole, type Role } from "@/context/RoleContext";
import { useState } from "react";

type Item = { to: string; label: string; icon: any; badge?: string; roles?: Role[] };
type Group = { label: string; items: Item[] };

const ALL_TENANT: Role[] = ["super_admin", "platform_admin", "tenant_admin", "tenant_operator"];
const ADMIN_ONLY: Role[] = ["super_admin", "platform_admin"];
const TENANT_ADMIN_UP: Role[] = ["super_admin", "platform_admin", "tenant_admin"];

const groups: Group[] = [
  {
    label: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard, roles: ALL_TENANT },
      { to: "/dr-control", label: "DR Control Center", icon: ShieldCheck, badge: "live", roles: ALL_TENANT },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/sync-jobs", label: "Replication Jobs", icon: RefreshCw, roles: ALL_TENANT },
      { to: "/objects", label: "All Objects", icon: Database, roles: ALL_TENANT },
      { to: "/configure", label: "Configure", icon: SlidersHorizontal, roles: TENANT_ADMIN_UP },
      { to: "/connections", label: "Connections", icon: Plug, roles: TENANT_ADMIN_UP },
      { to: "/scheduling", label: "Scheduling", icon: CalendarClock, roles: TENANT_ADMIN_UP },
    ],
  },
  {
    label: "Configuration",
    items: [
      { to: "/queues", label: "Queues", icon: Layers, roles: ALL_TENANT },
      { to: "/users", label: "Users", icon: Users, roles: ALL_TENANT },
      { to: "/skills", label: "Skills", icon: Sparkles, roles: ALL_TENANT },
      { to: "/divisions", label: "Divisions", icon: Building2, roles: ALL_TENANT },
      { to: "/flows", label: "Flows", icon: GitBranch, roles: ALL_TENANT },
    ],
  },
  {
    label: "Reliability",
    items: [
      { to: "/backups", label: "Backups & Versions", icon: History, roles: ALL_TENANT },
      { to: "/dr-monitoring", label: "Monitoring & Alerts", icon: ShieldAlert, roles: ALL_TENANT },
      // { to: "/reports", label: "Audit Reports", icon: FileBarChart2, roles: ALL_TENANT },
      { to: "/logs", label: "Logs", icon: ScrollText, roles: ALL_TENANT },
      { to: "/notifications", label: "Notifications", icon: Bell, roles: ALL_TENANT },
    ],
  },
  {
    label: "Tenant",
    items: [
      { to: "/billing", label: "Billing", icon: CreditCard, roles: TENANT_ADMIN_UP },
      { to: "/settings", label: "Settings", icon: Settings, roles: ALL_TENANT },
    ],
  },
  {
    label: "Administration",
    items: [
      { to: "/admin", label: "Admin Console", icon: Crown, roles: ADMIN_ONLY, badge: "admin" },
    ],
  },
];

export function Sidebar() {
  const { pathname } = useLocation();
  const { role } = useRole();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar-bg text-sidebar-fg border-r border-white/5">
      <div className="px-6 py-5 border-b border-white/5 flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-white tracking-tight">RAAutomite</div>
          <div className="text-[10px] uppercase tracking-wider text-sidebar-fg/60">DR · Genesys Cloud</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
        {groups.map((group) => {
          const visibleItems = group.items.filter((i) => !i.roles || i.roles.includes(role));
          if (visibleItems.length === 0) return null;
          const isOpen = !collapsed[group.label];
          return (
            <div key={group.label}>
              <button
                onClick={() => setCollapsed((c) => ({ ...c, [group.label]: !c[group.label] }))}
                className="w-full flex items-center justify-between px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-sidebar-fg/40 hover:text-sidebar-fg/70 transition"
              >
                {group.label}
                <ChevronRight className={cn("h-3 w-3 transition-transform", isOpen && "rotate-90")} />
              </button>
              {isOpen && (
                <div className="space-y-0.5">
                  {visibleItems.map(({ to, label, icon: Icon, badge }) => {
                    const active = pathname === to;
                    return (
                      <Link
                        key={to}
                        to={to}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                          active
                            ? "bg-sidebar-active/15 text-white border border-sidebar-active/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                            : "text-sidebar-fg/80 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", active && "text-sidebar-active")} />
                        <span className="flex-1 truncate">{label}</span>
                        {badge && (
                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-success/20 text-success">
                            {badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {/* <div className="p-4 border-t border-white/5">
        <div className="rounded-lg bg-white/5 p-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-sidebar-fg/80">Engine online</span>
          </div>
          <div className="mt-1 text-[10px] text-sidebar-fg/50 font-mono">v2.4.1 · uptime 14d</div>
        </div>
      </div> */}
    </aside>
  );
}
