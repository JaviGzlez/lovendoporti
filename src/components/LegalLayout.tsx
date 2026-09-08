export default function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="container-lv max-w-3xl py-10 lg:py-14">
      <p className="eyebrow mb-2">Información legal</p>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-muted">Última actualización: {updated}</p>
      <div className="prose-lv mt-8">{children}</div>
    </div>
  );
}
