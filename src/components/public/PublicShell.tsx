import { Link } from "@tanstack/react-router";
import { Zap, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useRole } from "@/context/RoleContext";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function PublicShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useRole();

  return (
    <div className="min-h-screen flex flex-col bg-background bg-mesh">
      <header className="sticky top-0 z-40 border-b bg-card/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center shadow-glow">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold tracking-tight">RAAutomite</div>
              <div className="text-[9px] uppercase tracking-widest text-muted-foreground">DR Replication</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-muted text-foreground" }}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/" className="hidden sm:inline-flex items-center px-4 h-9 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow transition">
                Open dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hidden sm:inline-flex items-center px-3 h-9 rounded-md border text-sm font-medium hover:bg-muted">
                  Sign in
                </Link>
                <Link to="/register" className="hidden sm:inline-flex items-center px-4 h-9 rounded-md bg-gradient-primary text-white text-sm font-semibold shadow-elegant hover:shadow-glow transition">
                  Get started
                </Link>
              </>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden h-9 w-9 grid place-items-center rounded-md border"
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t bg-card/95 backdrop-blur-xl px-4 py-3 space-y-1">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md text-sm hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <div className="border-t pt-2 mt-2 flex gap-2">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1 px-3 h-9 inline-flex items-center justify-center rounded-md border text-sm font-medium">Sign in</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="flex-1 px-3 h-9 inline-flex items-center justify-center rounded-md bg-gradient-primary text-white text-sm font-semibold">Get started</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-card/40">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-7 w-7 rounded-md bg-gradient-primary grid place-items-center"><Zap className="h-3.5 w-3.5 text-white" /></div>
              <span className="font-bold">RAAutomite</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">Disaster recovery & configuration replication for Genesys Cloud — built for the enterprise.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Product</div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>Genesys AppFoundry</li>
              <li>SOC 2 · ISO 27001</li>
              <li>Status</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Account</div>
            <ul className="space-y-1.5 text-muted-foreground">
              <li><Link to="/login" className="hover:text-foreground">Sign in</Link></li>
              <li><Link to="/register" className="hover:text-foreground">Create account</Link></li>
              <li><Link to="/forgot-password" className="hover:text-foreground">Forgot password</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} RAAutomite · All rights reserved</div>
      </footer>
    </div>
  );
}