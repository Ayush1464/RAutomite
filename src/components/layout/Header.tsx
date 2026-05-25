import { ChevronDown, Search, Crown, ShieldCheck, Building2, Wrench, Eye, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRole, ROLE_LABELS, type Role } from "@/context/RoleContext";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NotificationsPopover } from "@/components/notifications/NotificationsPopover";
import { customers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

function Dropdown({
  trigger, children,
}: { trigger: React.ReactNode; children: (close: () => void) => React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div className="absolute left-0 mt-2 min-w-[220px] rounded-xl border bg-popover shadow-glow overflow-hidden z-50 animate-fade-in">
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { role, setRole, customer, setCustomer, user, logout } = useRole();
  const [region, setRegion] = useState<{ name: string; code: string }>({ name: "us-west-2 → us-east-1", code: "AWS" });

  return (
    <header className="h-16 border-b bg-card/60 backdrop-blur-xl sticky top-0 z-30 flex items-center px-4 lg:px-6 gap-3">
      {/* Customer / Org selector */}
      <Dropdown
        trigger={
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border bg-background hover:bg-muted transition text-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="font-medium">{customer}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        }
      >
        {(close) => (
          <>
            <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Customer</div>
            {customers.map((c) => (
              <button
                key={c.id}
                onClick={() => { setCustomer(c.name); close(); }}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center justify-between gap-2 transition",
                  customer === c.name && "bg-primary/10 text-primary font-medium"
                )}
              >
                <span>{c.name}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{c.orgs} orgs</span>
              </button>
            ))}
          </>
        )}
      </Dropdown>

      <span className="text-muted-foreground hidden sm:inline">→</span>

      {/* Region selector */}
      <Dropdown
        trigger={
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md border bg-background hover:bg-muted transition text-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="font-mono text-xs">{region.name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        }
      >
        {(close) => (
          <>
            <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Region pair</div>
            {[
              { name: "us-west-2 → us-east-1", code: "AWS" },
              { name: "eu-west-1 → eu-central-1", code: "AWS" },
              { name: "ap-south-1 → ap-southeast-2", code: "AWS" },
            ].map((r) => (
              <button
                key={r.name}
                onClick={() => { setRegion(r); close(); }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-muted font-mono text-xs transition"
              >
                {r.name}
              </button>
            ))}
          </>
        )}
      </Dropdown>

      {/* Search */}
      <div className="flex-1 max-w-md hidden md:block ml-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className="w-full h-9 pl-9 pr-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Search queues, flows, jobs…"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Live status pill */}
        <div className="hidden md:flex items-center gap-2 px-3 h-9 rounded-md border bg-warning/10 border-warning/30 text-warning text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-warning animate-pulse" />
          Drift detected
        </div>

        <ThemeToggle />
        <NotificationsPopover />

        {/* Role switcher */}
        <Dropdown
          trigger={
            <button className="flex items-center gap-2 pl-2 pr-3 h-9 border rounded-md hover:bg-muted transition">
              <div className="h-7 w-7 rounded-full bg-gradient-primary text-white grid place-items-center text-xs font-semibold">
                {role === "super_admin" ? <Crown className="h-3.5 w-3.5" /> : "RA"}
              </div>
              <div className="hidden sm:block text-xs text-left">
                <div className="font-medium leading-tight">{user?.name ?? "Guest"}</div>
                <div className="text-muted-foreground text-[10px]">{ROLE_LABELS[role]}</div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          }
        >
          {(close) => {
            const items: { r: Role; icon: any }[] = [
              { r: "super_admin", icon: Crown },
              { r: "platform_admin", icon: ShieldCheck },
              { r: "tenant_admin", icon: Building2 },
              { r: "tenant_operator", icon: Wrench },
              { r: "guest", icon: Eye },
            ];
            return (
              <>
                <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Switch role (dev)</div>
                {items.map(({ r, icon: Icon }) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); close(); }}
                    className={cn("w-full text-left px-3 py-2 text-sm hover:bg-muted flex items-center gap-2 transition", role === r && "bg-primary/10 text-primary")}
                  >
                    <Icon className="h-4 w-4" /> {ROLE_LABELS[r]}
                  </button>
                ))}
                <div className="border-t my-1" />
                <Link to="/settings" onClick={close} className="block w-full text-left px-3 py-2 text-sm hover:bg-muted transition">Profile & settings</Link>
                <button onClick={() => { logout(); close(); }} className="w-full text-left px-3 py-2 text-sm hover:bg-muted text-destructive transition flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </>
            );
          }}
        </Dropdown>
      </div>
    </header>
  );
}
