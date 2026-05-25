import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { SystemStats } from "@/components/admin/SystemStats";
import { CustomerTable } from "@/components/admin/CustomerTable";
import { useRole } from "@/context/RoleContext";
import { Crown, Lock } from "lucide-react";

export const Route = createFileRoute("/admin")({ component: Page });

function Page() {
  const { role, setRole } = useRole();

  if (role !== "super_admin") {
    return (
      <AppShell>
        <div className="max-w-md mx-auto mt-20 rounded-2xl border bg-card p-8 shadow-elegant text-center">
          <div className="h-14 w-14 mx-auto rounded-2xl bg-muted grid place-items-center mb-4">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold">Super Admin only</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This area manages all RAautomiTe customers and platform-wide configuration.
          </p>
          <button
            onClick={() => setRole("super_admin")}
            className="mt-5 inline-flex items-center gap-2 px-4 h-10 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow transition"
          >
            <Crown className="h-4 w-4" /> Switch to Super Admin
          </button>
          <div className="mt-3 text-xs text-muted-foreground">
            or <Link to="/" className="text-primary hover:underline">return to dashboard</Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-[1500px] mx-auto space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Platform</span>
            <span className="px-2 py-0.5 rounded-full bg-gradient-primary text-white text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
              <Crown className="h-3 w-3" /> Super Admin
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage tenants, monitor platform health, and review billing.</p>
        </div>
        <SystemStats />
        <CustomerTable />

        <div className="rounded-2xl border bg-card p-6 shadow-elegant">
          <h3 className="font-semibold mb-1">Billing</h3>
          <p className="text-xs text-muted-foreground mb-4">Aggregated invoices across all customers (placeholder)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { l: "April invoices", v: "$43,400", s: "12 tenants" },
              { l: "Pending payment", v: "$2,800", s: "1 tenant" },
              { l: "Year-to-date", v: "$167,200", s: "+18% YoY" },
            ].map((b) => (
              <div key={b.l} className="p-4 rounded-xl border bg-muted/30">
                <div className="text-xs text-muted-foreground">{b.l}</div>
                <div className="text-2xl font-bold mt-1">{b.v}</div>
                <div className="text-[11px] text-muted-foreground mt-1">{b.s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
