import { Building2, Database, DollarSign, Activity } from "lucide-react";
import { customers } from "@/lib/mock-data";
import { motion } from "framer-motion";

export function SystemStats() {
  const totalObjects = customers.reduce((a, c) => a + c.objects, 0);
  const totalOrgs = customers.reduce((a, c) => a + c.orgs, 0);
  const mrr = customers.reduce((a, c) => a + parseFloat(c.mrr.replace(/[^0-9.]/g, "")), 0);
  const stats = [
    { label: "Customers", value: customers.length.toString(), icon: Building2, accent: "bg-primary" },
    { label: "Genesys orgs", value: totalOrgs.toString(), icon: Activity, accent: "bg-accent" },
    { label: "Objects synced", value: totalObjects.toLocaleString(), icon: Database, accent: "bg-success" },
    { label: "Total MRR", value: `$${mrr.toLocaleString()}`, icon: DollarSign, accent: "bg-warning" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border bg-card p-5 shadow-elegant relative overflow-hidden"
        >
          <div className={`absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-10 blur-2xl ${s.accent}`} />
          <div className="flex items-center justify-between">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-medium">{s.label}</div>
            <div className={`h-8 w-8 rounded-lg grid place-items-center text-white ${s.accent}`}>
              <s.icon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-bold tracking-tight tabular-nums">{s.value}</div>
        </motion.div>
      ))}
    </div>
  );
}
