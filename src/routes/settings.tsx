import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/settings")({ component: Page });

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-muted-foreground mb-1.5">{label}</div>
      <input defaultValue={value} className={`w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring ${mono ? "font-mono" : ""}`} />
    </label>
  );
}

function Page() {
  return (
    <AppShell>
      <div className="max-w-[1100px] mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Configure orgs, retries, and sync schedule.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-card p-6 shadow-elegant">
            <div className="flex items-center gap-2 mb-4"><span className="h-2 w-2 rounded-full bg-primary" /><h3 className="font-semibold">Source Org</h3><span className="text-xs text-muted-foreground font-mono ml-auto">us-west-2</span></div>
            <div className="space-y-3">
              <Field label="Client ID" value="acme-prod-xxxx-1f3a" mono />
              <Field label="Client Secret" value="••••••••••••••••" mono />
              <Field label="Region" value="mypurecloud.com" mono />
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-elegant">
            <div className="flex items-center gap-2 mb-4"><span className="h-2 w-2 rounded-full bg-accent" /><h3 className="font-semibold">Destination Org</h3><span className="text-xs text-muted-foreground font-mono ml-auto">us-east-1</span></div>
            <div className="space-y-3">
              <Field label="Client ID" value="acme-dr-xxxx-9c2b" mono />
              <Field label="Client Secret" value="••••••••••••••••" mono />
              <Field label="Region" value="mypurecloud.com" mono />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-elegant">
          <h3 className="font-semibold mb-4">Retry & Schedule</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Max retries" value="5" />
            <Field label="Backoff strategy" value="exponential" />
            <Field label="Sync frequency" value="every 15 minutes" />
          </div>
          <div className="mt-5 flex justify-end gap-2">
            <button className="h-10 px-4 rounded-md border hover:bg-muted text-sm">Cancel</button>
            <button className="h-10 px-5 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant">Save changes</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
