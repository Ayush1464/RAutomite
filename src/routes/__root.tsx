import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { RoleProvider } from "@/context/RoleContext";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">Go home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RAautomiTe — DR & Sync Automation for Genesys Cloud" },
      { name: "description", content: "Enterprise disaster recovery and configuration sync automation for Genesys Cloud across regions." },
      { property: "og:title", content: "RAautomiTe — DR & Sync Automation for Genesys Cloud" },
      { name: "twitter:title", content: "RAautomiTe — DR & Sync Automation for Genesys Cloud" },
      { property: "og:description", content: "Enterprise disaster recovery and configuration sync automation for Genesys Cloud across regions." },
      { name: "twitter:description", content: "Enterprise disaster recovery and configuration sync automation for Genesys Cloud across regions." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/db6589f1-6b07-4bd9-ab6e-d7032af228d3/id-preview-ea743888--eca9daf0-9a7c-4022-8847-ea4961766ea0.lovable.app-1776753959160.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/db6589f1-6b07-4bd9-ab6e-d7032af228d3/id-preview-ea743888--eca9daf0-9a7c-4022-8847-ea4961766ea0.lovable.app-1776753959160.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: () => (
    <RoleProvider>
      <Outlet />
    </RoleProvider>
  ),
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeadContent />
      {children}
      <Scripts />
    </>
  );
}
