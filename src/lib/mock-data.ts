export type ObjectStatus = "synced" | "missing" | "drift" | "error";

export type GenericObject = {
  id: string;
  name: string;
  srcId: string;
  dstId: string | null;
  status: ObjectStatus;
  lastSync: string;
  divisionId?: string;
  skills?: string[];
  agents?: number;
  routing?: "bullseye" | "standard" | "preferred-agent";
  json?: Record<string, unknown>;
};

const ts = (m: number) => `${m}m ago`;

export const queues: GenericObject[] = [
  { id: "q1", name: "support-tier-1", srcId: "q_8a1f", dstId: "q_8a1f", status: "synced", lastSync: ts(2), divisionId: "div_amer", skills: ["English", "Tier-1"], agents: 24, routing: "bullseye" },
  { id: "q2", name: "support-tier-2", srcId: "q_8a2c", dstId: null, status: "missing", lastSync: ts(31), divisionId: "div_amer", skills: ["English", "Tier-2"], agents: 11, routing: "bullseye" },
  { id: "q3", name: "billing-priority", srcId: "q_8a3d", dstId: "q_8a3d", status: "synced", lastSync: ts(5), divisionId: "div_amer", skills: ["Billing"], agents: 8, routing: "standard" },
  { id: "q4", name: "sales-emea", srcId: "q_8a4e", dstId: "q_8a4e", status: "synced", lastSync: ts(7), divisionId: "div_emea", skills: ["French", "Sales"], agents: 15, routing: "preferred-agent" },
  { id: "q5", name: "vip-callback", srcId: "q_8a5f", dstId: null, status: "missing", lastSync: ts(27), divisionId: "div_amer", skills: ["VIP"], agents: 4, routing: "bullseye" },
  { id: "q6", name: "outbound-survey", srcId: "q_8a6a", dstId: "q_8a6a", status: "drift", lastSync: ts(12), divisionId: "div_amer", skills: ["Survey"], agents: 6, routing: "standard" },
  { id: "q7", name: "tech-escalation", srcId: "q_8a7b", dstId: "q_8a7b", status: "synced", lastSync: ts(3), divisionId: "div_amer", skills: ["Tier-3", "English"], agents: 9, routing: "bullseye" },
  { id: "q8", name: "spanish-support", srcId: "q_8a8c", dstId: "q_8a8c", status: "error", lastSync: ts(58), divisionId: "div_latam", skills: ["Spanish-L2"], agents: 7, routing: "standard" },
];

export const users: GenericObject[] = [
  { id: "u1", name: "Riya Adams", srcId: "u_001", dstId: "u_001", status: "synced", lastSync: ts(2), divisionId: "div_amer", skills: ["English", "Tier-2"] },
  { id: "u2", name: "Carlos Mendez", srcId: "u_002", dstId: "u_002", status: "synced", lastSync: ts(2), divisionId: "div_latam", skills: ["Spanish-L2"] },
  { id: "u3", name: "Aiko Tanaka", srcId: "u_003", dstId: null, status: "missing", lastSync: ts(33), divisionId: "div_apac", skills: ["Japanese"] },
  { id: "u4", name: "Emma Dupont", srcId: "u_004", dstId: "u_004", status: "synced", lastSync: ts(4), divisionId: "div_emea", skills: ["French", "Sales"] },
  { id: "u5", name: "Mohammed Hadi", srcId: "u_005", dstId: "u_005", status: "drift", lastSync: ts(18), divisionId: "div_emea", skills: ["Arabic"] },
  { id: "u6", name: "Wei Lin", srcId: "u_006", dstId: "u_006", status: "synced", lastSync: ts(2), divisionId: "div_apac", skills: ["Mandarin"] },
];

export const skills: GenericObject[] = [
  { id: "s1", name: "English", srcId: "sk_en", dstId: "sk_en", status: "synced", lastSync: ts(2) },
  { id: "s2", name: "Spanish-L2", srcId: "sk_es", dstId: "sk_es", status: "error", lastSync: ts(58) },
  { id: "s3", name: "French", srcId: "sk_fr", dstId: "sk_fr", status: "synced", lastSync: ts(2) },
  { id: "s4", name: "Japanese", srcId: "sk_jp", dstId: null, status: "missing", lastSync: ts(33) },
  { id: "s5", name: "Tier-2", srcId: "sk_t2", dstId: "sk_t2", status: "synced", lastSync: ts(2) },
  { id: "s6", name: "VIP", srcId: "sk_vip", dstId: "sk_vip", status: "drift", lastSync: ts(15) },
  { id: "s7", name: "Billing", srcId: "sk_bill", dstId: "sk_bill", status: "synced", lastSync: ts(2) },
];

export const divisions: GenericObject[] = [
  { id: "d1", name: "AMER", srcId: "div_amer", dstId: "div_amer", status: "synced", lastSync: ts(2) },
  { id: "d2", name: "EMEA", srcId: "div_emea", dstId: "div_emea", status: "drift", lastSync: ts(27) },
  { id: "d3", name: "APAC", srcId: "div_apac", dstId: "div_apac", status: "synced", lastSync: ts(2) },
  { id: "d4", name: "LATAM", srcId: "div_latam", dstId: "div_latam", status: "synced", lastSync: ts(2) },
];

export const flows: GenericObject[] = [
  { id: "f1", name: "IVR-main", srcId: "fl_001", dstId: "fl_001", status: "synced", lastSync: ts(2) },
  { id: "f2", name: "callback-handler", srcId: "fl_002", dstId: "fl_002", status: "synced", lastSync: ts(2) },
  { id: "f3", name: "after-hours", srcId: "fl_003", dstId: null, status: "missing", lastSync: ts(45) },
  { id: "f4", name: "survey-outbound", srcId: "fl_004", dstId: "fl_004", status: "error", lastSync: ts(2) },
  { id: "f5", name: "vip-routing", srcId: "fl_005", dstId: "fl_005", status: "drift", lastSync: ts(20) },
];

export const objectsByType = { queues, users, skills, divisions, flows };

export type Job = { id: string; name: string; status: "running" | "completed" | "failed" | "queued"; duration: string; objects: number; errors: number; started: string };
export const jobs: Job[] = [
  { id: "job_a91f", name: "Scheduled DR Sync", status: "running", duration: "00:01:24", objects: 842, errors: 0, started: "Just now" },
  { id: "job_a91e", name: "Auto-heal · vip-callback", status: "completed", duration: "00:00:08", objects: 1, errors: 0, started: "2m ago" },
  { id: "job_a91d", name: "Manual Sync · Flows", status: "completed", duration: "00:02:14", objects: 68, errors: 0, started: "14m ago" },
  { id: "job_a91c", name: "Scheduled DR Sync", status: "failed", duration: "00:00:54", objects: 320, errors: 4, started: "1h ago" },
  { id: "job_a91b", name: "Backup Snapshot", status: "completed", duration: "00:00:32", objects: 1284, errors: 0, started: "3h ago" },
  { id: "job_a91a", name: "Drift Scan", status: "queued", duration: "—", objects: 0, errors: 0, started: "—" },
];

export type Alert = { id: string; severity: "critical" | "warning" | "info"; title: string; detail: string; time: string };
export const alerts: Alert[] = [
  { id: "al1", severity: "critical", title: "Queue 'vip-callback' missing in destination", detail: "Auto-heal queued · attempt 1/3", time: "27m ago" },
  { id: "al2", severity: "warning", title: "Drift on Division 'EMEA'", detail: "3 properties differ", time: "44m ago" },
  { id: "al3", severity: "info", title: "Skill 'Spanish-L2' rating threshold changed", detail: "Mirrored to destination", time: "1h ago" },
  { id: "al4", severity: "critical", title: "Sync failure on Flow 'survey-outbound'", detail: "OAuth token expired · refreshed", time: "2h ago" },
  { id: "al5", severity: "warning", title: "User 'Aiko Tanaka' missing in DR org", detail: "Pending restore window", time: "3h ago" },
];

export type LogEntry = { id: string; ts: string; level: "info" | "warn" | "error" | "debug"; job: string; object?: string; message: string; details?: string };
export const logs: LogEntry[] = Array.from({ length: 24 }).map((_, i) => {
  const levels: LogEntry["level"][] = ["info", "info", "info", "warn", "info", "error", "info", "debug"];
  const lvl = levels[i % levels.length];
  return {
    id: `log_${i}`,
    ts: `2024-04-21 14:${String(59 - i).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
    level: lvl,
    job: i % 3 === 0 ? "job_a91f" : i % 3 === 1 ? "job_a91d" : "job_a91c",
    object: i % 4 === 0 ? "Queue:support-tier-2" : i % 4 === 1 ? "Skill:Spanish-L2" : undefined,
    message:
      lvl === "error"
        ? "OAuth token refresh failed · retrying"
        : lvl === "warn"
        ? "Drift detected on division properties"
        : lvl === "debug"
        ? "Diff hash computed · 0xa91fe2"
        : "Object replicated successfully",
    details:
      lvl === "error"
        ? `Error: 401 Unauthorized\n  at oauth.refresh (engine/auth.ts:42)\n  at SyncJob.exec (engine/job.ts:118)\n  at Scheduler.run (engine/scheduler.ts:91)`
        : undefined,
  };
});

export type Customer = { id: string; name: string; orgs: number; objects: number; mrr: string; status: "active" | "trial" | "paused"; lastSync: string };
export const customers: Customer[] = [
  { id: "c1", name: "Acme Corp", orgs: 4, objects: 12847, mrr: "$8,400", status: "active", lastSync: "2m ago" },
  { id: "c2", name: "Globex Telecom", orgs: 6, objects: 28910, mrr: "$14,200", status: "active", lastSync: "5m ago" },
  { id: "c3", name: "Initech BPO", orgs: 2, objects: 4220, mrr: "$2,800", status: "trial", lastSync: "1h ago" },
  { id: "c4", name: "Umbrella Health", orgs: 3, objects: 9180, mrr: "$6,100", status: "active", lastSync: "12m ago" },
  { id: "c5", name: "Stark Financial", orgs: 5, objects: 19400, mrr: "$11,900", status: "paused", lastSync: "3d ago" },
];

// drift heatmap: 7 object types × 24 hours, value 0-3
export const driftMatrix = Array.from({ length: 7 }).map(() =>
  Array.from({ length: 24 }).map(() => Math.max(0, Math.round(Math.random() * 3 - 0.6)))
);
export const driftRows = ["Queues", "Users", "Skills", "Divisions", "Flows", "Wrap-ups", "Schedules"];

export const dependencyMap = {
  centerQueue: { id: "q_8a1f", name: "support-tier-1" },
  skills: ["English", "Tier-1"],
  division: "AMER",
  agents: ["Riya Adams", "Carlos Mendez", "Wei Lin", "+21 more"],
  flow: "IVR-main",
};

/* ------------------------------------------------------------------ */
/* RAAutomite — extended platform models                                    */
/* ------------------------------------------------------------------ */

export type Tenant = {
  id: string;
  name: string;
  region: "us-east-1" | "eu-west-1" | "ap-south-1";
  status: "active" | "suspended" | "trial";
  plan: "Starter" | "Pro" | "Enterprise";
  mrr: number;
  createdAt: string;
  primaryOrgId: string;
  drOrgId: string;
  users: number;
  jobs30d: number;
  successRate: number;
};

export const tenants: Tenant[] = [
  { id: "tn_acme", name: "Acme Corp", region: "us-east-1", status: "active", plan: "Enterprise", mrr: 8400, createdAt: "2024-09-12", primaryOrgId: "org_acme_p", drOrgId: "org_acme_dr", users: 42, jobs30d: 184, successRate: 99.7 },
  { id: "tn_globex", name: "Globex Telecom", region: "eu-west-1", status: "active", plan: "Enterprise", mrr: 14200, createdAt: "2024-06-04", primaryOrgId: "org_glx_p", drOrgId: "org_glx_dr", users: 88, jobs30d: 312, successRate: 99.4 },
  { id: "tn_initech", name: "Initech BPO", region: "us-east-1", status: "trial", plan: "Starter", mrr: 0, createdAt: "2025-03-20", primaryOrgId: "org_init_p", drOrgId: "org_init_dr", users: 6, jobs30d: 22, successRate: 95.2 },
  { id: "tn_umbrella", name: "Umbrella Health", region: "us-east-1", status: "active", plan: "Pro", mrr: 6100, createdAt: "2024-11-30", primaryOrgId: "org_umb_p", drOrgId: "org_umb_dr", users: 31, jobs30d: 140, successRate: 98.9 },
  { id: "tn_stark", name: "Stark Financial", region: "ap-south-1", status: "suspended", plan: "Pro", mrr: 11900, createdAt: "2024-02-18", primaryOrgId: "org_strk_p", drOrgId: "org_strk_dr", users: 54, jobs30d: 0, successRate: 0 },
];

export type TenantUser = {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: "tenant_admin" | "tenant_operator";
  mfaEnabled: boolean;
  lastLogin: string;
};
export const tenantUsers: TenantUser[] = [
  { id: "tu1", tenantId: "tn_acme", name: "Riya Adams", email: "riya@acme.io", role: "tenant_admin", mfaEnabled: true, lastLogin: "2m ago" },
  { id: "tu2", tenantId: "tn_acme", name: "Carlos Mendez", email: "carlos@acme.io", role: "tenant_operator", mfaEnabled: true, lastLogin: "14m ago" },
  { id: "tu3", tenantId: "tn_acme", name: "Wei Lin", email: "wei@acme.io", role: "tenant_operator", mfaEnabled: false, lastLogin: "2h ago" },
  { id: "tu4", tenantId: "tn_acme", name: "Emma Dupont", email: "emma@acme.io", role: "tenant_operator", mfaEnabled: true, lastLogin: "1d ago" },
];

export type ReplicationJob = {
  id: string;
  tenantId: string;
  type: "full" | "incremental" | "dry-run";
  status: "RUNNING" | "SUCCESS" | "PARTIAL" | "FAILED";
  startedAt: string;
  duration: string;
  entitiesAffected: number;
  triggeredBy: string;
};
export const replicationJobs: ReplicationJob[] = [
  { id: "rj_2401", tenantId: "tn_acme", type: "incremental", status: "RUNNING", startedAt: "Just now", duration: "00:01:24", entitiesAffected: 842, triggeredBy: "scheduler" },
  { id: "rj_2400", tenantId: "tn_acme", type: "incremental", status: "SUCCESS", startedAt: "15m ago", duration: "00:02:11", entitiesAffected: 38, triggeredBy: "scheduler" },
  { id: "rj_2399", tenantId: "tn_acme", type: "dry-run", status: "SUCCESS", startedAt: "1h ago", duration: "00:00:48", entitiesAffected: 1284, triggeredBy: "Riya Adams" },
  { id: "rj_2398", tenantId: "tn_acme", type: "incremental", status: "PARTIAL", startedAt: "3h ago", duration: "00:03:02", entitiesAffected: 412, triggeredBy: "scheduler" },
  { id: "rj_2397", tenantId: "tn_acme", type: "full", status: "SUCCESS", startedAt: "Yesterday", duration: "00:14:32", entitiesAffected: 12847, triggeredBy: "Riya Adams" },
  { id: "rj_2396", tenantId: "tn_acme", type: "incremental", status: "FAILED", startedAt: "Yesterday", duration: "00:00:54", entitiesAffected: 0, triggeredBy: "scheduler" },
];

export type JobEntitySummary = {
  entityType: string;
  created: number;
  updated: number;
  deleted: number;
  skipped: number;
  failed: number;
};
export const jobEntitySummary: JobEntitySummary[] = [
  { entityType: "Users", created: 2, updated: 14, deleted: 0, skipped: 8, failed: 0 },
  { entityType: "Queues", created: 1, updated: 6, deleted: 0, skipped: 2, failed: 0 },
  { entityType: "Scripts", created: 0, updated: 4, deleted: 1, skipped: 0, failed: 0 },
  { entityType: "IVR Flows", created: 0, updated: 2, deleted: 0, skipped: 1, failed: 1 },
  { entityType: "Skills", created: 3, updated: 0, deleted: 0, skipped: 4, failed: 0 },
  { entityType: "Roles", created: 0, updated: 1, deleted: 0, skipped: 6, failed: 0 },
  { entityType: "Data Tables", created: 0, updated: 0, deleted: 0, skipped: 12, failed: 0 },
];

export const genesysEntityTypes = [
  "Users", "Queues", "Scripts", "IVR Flows", "Skills", "Roles",
  "Wrap-up Codes", "Data Tables", "Schedules", "Routing",
] as const;

export type SubscriptionPlan = {
  id: string;
  name: "Starter" | "Pro" | "Enterprise";
  price: number;
  features: string[];
  limits: { entities: string; jobsPerDay: string; users: string };
};
export const plans: SubscriptionPlan[] = [
  {
    id: "pl_starter", name: "Starter", price: 299,
    features: ["1 Genesys org pair", "Daily incremental sync", "Email alerts", "7-day audit retention"],
    limits: { entities: "Up to 2,500", jobsPerDay: "4", users: "5" },
  },
  {
    id: "pl_pro", name: "Pro", price: 1299,
    features: ["3 org pairs", "Hourly sync", "Slack + email alerts", "90-day audit retention", "Dry-run mode", "Priority support"],
    limits: { entities: "Up to 25,000", jobsPerDay: "24", users: "25" },
  },
  {
    id: "pl_ent", name: "Enterprise", price: 4999,
    features: ["Unlimited org pairs", "Continuous sync", "Auto-heal & rollback", "1-year audit retention", "SAML SSO", "Dedicated CSM", "Custom SLAs"],
    limits: { entities: "Unlimited", jobsPerDay: "Unlimited", users: "Unlimited" },
  },
];

export type Invoice = {
  id: string;
  tenantId: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  issuedAt: string;
  dueAt: string;
};
export const invoices: Invoice[] = [
  { id: "inv_0241", tenantId: "tn_acme", amount: 8400, status: "paid", issuedAt: "Apr 1, 2025", dueAt: "Apr 15, 2025" },
  { id: "inv_0240", tenantId: "tn_acme", amount: 8400, status: "paid", issuedAt: "Mar 1, 2025", dueAt: "Mar 15, 2025" },
  { id: "inv_0239", tenantId: "tn_acme", amount: 8400, status: "paid", issuedAt: "Feb 1, 2025", dueAt: "Feb 15, 2025" },
  { id: "inv_0238", tenantId: "tn_acme", amount: 8400, status: "pending", issuedAt: "May 1, 2025", dueAt: "May 15, 2025" },
];

export type SupportTicket = {
  id: string;
  tenantId: string;
  subject: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
};
export const supportTickets: SupportTicket[] = [
  { id: "tk_018", tenantId: "tn_globex", subject: "OAuth token rotation failing on EU org", severity: "high", status: "in_progress", createdAt: "32m ago" },
  { id: "tk_017", tenantId: "tn_acme", subject: "Add SSO via Okta", severity: "medium", status: "open", createdAt: "2h ago" },
  { id: "tk_016", tenantId: "tn_initech", subject: "Trial extension request", severity: "low", status: "open", createdAt: "5h ago" },
  { id: "tk_015", tenantId: "tn_stark", subject: "Reactivate suspended account", severity: "critical", status: "resolved", createdAt: "1d ago" },
];

export type ActivityLog = {
  id: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  timestamp: string;
};
export const activityLogs: ActivityLog[] = [
  { id: "ac1", actor: "Riya Adams", action: "Triggered manual sync", target: "rj_2399", ip: "203.0.113.42", timestamp: "1h ago" },
  { id: "ac2", actor: "scheduler", action: "Started incremental job", target: "rj_2400", ip: "internal", timestamp: "15m ago" },
  { id: "ac3", actor: "Carlos Mendez", action: "Updated replication config", target: "Queues filter", ip: "203.0.113.45", timestamp: "3h ago" },
  { id: "ac4", actor: "Riya Adams", action: "Reset MFA", target: "Wei Lin", ip: "203.0.113.42", timestamp: "Yesterday" },
  { id: "ac5", actor: "platform", action: "Renewed OAuth tokens", target: "Primary org", ip: "internal", timestamp: "Yesterday" },
];

export type AuditReport = {
  id: string;
  jobId: string;
  type: "drift" | "reconciliation";
  generatedAt: string;
  downloadUrl: string;
};
export const auditReports: AuditReport[] = [
  { id: "rep_018", jobId: "rj_2400", type: "reconciliation", generatedAt: "15m ago", downloadUrl: "#" },
  { id: "rep_017", jobId: "rj_2399", type: "drift", generatedAt: "1h ago", downloadUrl: "#" },
  { id: "rep_016", jobId: "rj_2398", type: "reconciliation", generatedAt: "3h ago", downloadUrl: "#" },
  { id: "rep_015", jobId: "rj_2397", type: "drift", generatedAt: "Yesterday", downloadUrl: "#" },
];
