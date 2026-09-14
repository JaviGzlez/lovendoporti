import type { Metadata } from "next";
import { getVentasPorMes } from "@/lib/admin/data";
import { formatPrecio } from "@/lib/utils";

export const metadata: Metadata = { title: "Ventas · Área privada" };
export const dynamic = "force-dynamic";

export default async function VentasPage() {
  const meses = await getVentasPorMes();
  const totalFacturado = meses.reduce((acc, m) => acc + m.totalFacturado, 0);
  const totalVentas = meses.reduce((acc, m) => acc + m.numVentas, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ventas</h1>
        <p className="mt-1 text-muted">
          Se registran solas: en cuanto marcas un equipo como «Vendido» en su ficha, aparece aquí.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card p-6">
          <p className="text-sm text-muted">Equipos vendidos (total)</p>
          <p className="mt-1 text-3xl font-bold">{totalVentas}</p>
        </div>
        <div className="card p-6">
          <p className="text-sm text-muted">Facturado (total)</p>
          <p className="mt-1 text-3xl font-bold">{formatPrecio(totalFacturado)}</p>
        </div>
      </div>

      {meses.length === 0 ? (
        <p className="card p-6 text-sm text-muted">Todavía no hay ninguna venta registrada.</p>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-surface text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3">Mes</th>
                  <th className="px-4 py-3">Equipos vendidos</th>
                  <th className="px-4 py-3">Facturado</th>
                </tr>
              </thead>
              <tbody>
                {meses.map((m) => (
                  <tr key={m.mes} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-medium capitalize">{m.etiqueta}</td>
                    <td className="px-4 py-3">{m.numVentas}</td>
                    <td className="px-4 py-3 font-semibold">{formatPrecio(m.totalFacturado)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
