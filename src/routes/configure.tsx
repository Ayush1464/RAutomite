
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/page-primitives";
import { genesysEntityTypes } from "@/lib/mock-data";

export const Route = createFileRoute("/configure")({ component: Page });

function Page() {
  return (
    <AppShell>
      <div className="max-w-[1100px] mx-auto space-y-6">
        <PageHeader
          eyebrow="Operations · Replication"
          title={<>Configure <span className="text-gradient">replication</span></>}
          description="Choose which Genesys entities to replicate, apply filters, and toggle dry-run mode."
          actions={
            <button className="h-10 px-5 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow">
              Save changes
            </button>
          }
        />

        <div className="rounded-2xl border bg-card p-6 shadow-elegant">
          <h3 className="font-semibold mb-4">Entities to replicate</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {genesysEntityTypes.map((e) => (
              <label key={e} className="flex items-center gap-2 px-3 py-2 rounded-md border bg-background hover:bg-muted cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">{e}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl border bg-card p-6 shadow-elegant">
            <h3 className="font-semibold mb-3">Filters</h3>
            <label className="block">
              <div className="text-xs font-medium text-muted-foreground mb-1.5">Division allowlist</div>
              <input defaultValue="AMER, EMEA" className="w-full h-10 px-3 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <label className="block mt-3">
              <div className="text-xs font-medium text-muted-foreground mb-1.5">Skill name regex</div>
              <input defaultValue="^(English|French|Spanish).*" className="w-full h-10 px-3 rounded-md border bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring" />
            </label>
          </div>
          <div className="rounded-2xl border bg-card p-6 shadow-elegant">
            <h3 className="font-semibold mb-3">Mode</h3>
            <label className="flex items-start gap-3 p-3 rounded-md border bg-background cursor-pointer">
              <input type="radio" name="mode" defaultChecked className="mt-1" />
              <div>
                <div className="font-medium text-sm">Dry-run</div>
                <div className="text-xs text-muted-foreground">Compute diffs without applying. Recommended for first 14 days.</div>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 rounded-md border bg-background cursor-pointer mt-2">
              <input type="radio" name="mode" className="mt-1" />
              <div>
                <div className="font-medium text-sm">Apply</div>
                <div className="text-xs text-muted-foreground">Push changes to DR org on every run.</div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </AppShell>
  );
}