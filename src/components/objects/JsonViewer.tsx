export function JsonViewer({ value }: { value: unknown }) {
  const json = JSON.stringify(value, null, 2);
  // Simple syntax highlighting via regex
  const highlighted = json
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = "text-accent"; // number
      if (/^"/.test(match)) cls = /:$/.test(match) ? "text-primary-glow" : "text-success";
      else if (/true|false/.test(match)) cls = "text-warning";
      else if (/null/.test(match)) cls = "text-muted-foreground";
      return `<span class="${cls}">${match}</span>`;
    });
  return (
    <pre
      className="p-4 text-xs font-mono leading-relaxed overflow-auto bg-sidebar-bg text-sidebar-fg rounded-lg max-h-[420px]"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}
