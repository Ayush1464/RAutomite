import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Role =
  | "super_admin"
  | "platform_admin"
  | "tenant_admin"
  | "tenant_operator"
  | "guest";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  platform_admin: "Platform Admin",
  tenant_admin: "Tenant Admin",
  tenant_operator: "Tenant Operator",
  guest: "Guest",
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  tenantId?: string;
};

type Ctx = {
  // legacy aliases (kept for existing components)
  role: Role;
  setRole: (r: Role) => void;
  customer: string;
  setCustomer: (c: string) => void;

  // new mock-auth surface
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, role?: Role) => void;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
};

const RoleCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "RAAutomite.auth.v1";

const DEFAULT_USER: AuthUser = {
  id: "u_riya",
  name: "Riya Adams",
  email: "riya@acme.io",
  role: "tenant_admin",
  tenantId: "tn_acme",
};
function loadUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return null;

    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => loadUser());
  const [customer, setCustomer] = useState("Acme Corp");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const role: Role = user?.role ?? "guest";

  const value: Ctx = {
    role,
    setRole: (r) => setUser((u) => (u ? { ...u, role: r } : null)),
    customer,
    setCustomer,
    user,
    isAuthenticated: !!user,
    login: (email, r = "tenant_admin") =>
      setUser({
        id: "u_" + email.split("@")[0],
        name: email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role: r,
        tenantId: "tn_acme",
      }),
    logout: () => setUser(null),
    hasRole: (...roles) => roles.includes(role),
  };

  return <RoleCtx.Provider value={value}>{children}</RoleCtx.Provider>;
}

export function useRole() {
  const v = useContext(RoleCtx);
  if (!v) throw new Error("useRole must be used inside RoleProvider");
  return v;
}

export function useAuth() {
  return useRole();
}
