import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMisFacturas, pagarFactura } from "../../api/facturas";
import { getAllProductos } from "../../api/producto";
import type { Factura } from "../../interface/factura";
import type { Producto } from "../../interface/producto";

function estadoBadge(estado: string) {
    const map: Record<string, string> = {
        EMITIDA: "bg-blue-100 text-blue-700 border border-blue-200",
        PAGADA:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
        ANULADA: "bg-red-100 text-red-500 border border-red-200",
    };
    return map[estado] ?? "bg-slate-100 text-slate-500";
}

export default function DashboardPage() {
    const navigate = useNavigate();
    const [hora, setHora]         = useState(new Date());
    const [facturas, setFacturas] = useState<Factura[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        const t = setInterval(() => setHora(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        Promise.all([getMisFacturas(0, 5), getAllProductos()])
            .then(([f, p]) => { setFacturas(f.content); setProductos(p); })
            .finally(() => setLoading(false));
    }, []);

    const hoy        = new Date().toISOString().split("T")[0];
    const hoyF       = facturas.filter(f => f.fechaEmision === hoy && f.estado !== "ANULADA");
    const ventasHoy  = hoyF.reduce((s, f) => s + f.total, 0);
    const emitidas   = facturas.filter(f => f.estado === "EMITIDA").length;
    const totalMes   = facturas.filter(f => f.estado !== "ANULADA").reduce((s, f) => s + f.total, 0);
    const stockBajo  = productos.filter(p => p.stock <= 5);
    const saludo     = hora.getHours() < 12 ? "Buenos días" : hora.getHours() < 18 ? "Buenas tardes" : "Buenas noches";

    const cobrar = async (id: number) => {
        await pagarFactura(id);
        setFacturas(prev => prev.map(f => f.id === id ? { ...f, estado: "PAGADA" } : f));
    };

    return (
        <div className="space-y-6">

            {/* Saludo */}
            <div className="rounded-2xl bg-white p-8 shadow flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">{saludo} 👋</h1>
                    <p className="text-slate-500 mt-1 text-sm">
                        {hora.toLocaleDateString("es-EC", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        {" · "}
                        <span className="font-mono">{hora.toLocaleTimeString("es-EC")}</span>
                    </p>
                </div>
                <button
                    onClick={() => navigate("/facturas")}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl shadow transition"
                >
                    + Nueva factura
                </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-6">
                {[
                    { label: "Ventas hoy",       value: `$${ventasHoy.toFixed(2)}`, sub: `${hoyF.length} transacciones`,   color: "#2563eb" },
                    { label: "Pendientes cobro", value: String(emitidas),            sub: "Facturas EMITIDAS",              color: "#f59e0b" },
                    { label: "Total del mes",    value: `$${totalMes.toFixed(2)}`,   sub: "Excluye anuladas",               color: "#10b981" },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-2xl shadow p-6" style={{ borderLeft: `5px solid ${s.color}` }}>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{s.label}</p>
                        <p className="text-4xl font-extrabold text-slate-800 tracking-tight">
                            {loading ? <span className="text-slate-200">—</span> : s.value}
                        </p>
                        <p className="text-sm text-slate-400 mt-1">{s.sub}</p>
                    </div>
                ))}
            </div>

            {/* Accesos rápidos + Stock */}
            <div className="grid grid-cols-3 gap-6">
                <button
                    onClick={() => navigate("/facturas")}
                    className="bg-blue-700 hover:bg-blue-800 text-white rounded-2xl shadow p-8 text-left transition"
                >
                    <div className="text-4xl mb-3">🧾</div>
                    <div className="text-xl font-bold">Emitir factura</div>
                    <div className="text-blue-200 text-sm mt-1">Registrar nueva venta</div>
                </button>

                <button
                    onClick={() => navigate("/productos")}
                    className="bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow p-8 text-left transition"
                >
                    <div className="text-4xl mb-3">📦</div>
                    <div className="text-xl font-bold text-slate-800">Ver productos</div>
                    <div className="text-slate-400 text-sm mt-1">Stock y disponibilidad</div>
                </button>

                <div className="bg-white rounded-2xl shadow p-6 border border-amber-100">
                    <div className="flex items-center gap-2 mb-4">
                        <span>⚠️</span>
                        <h3 className="font-bold text-slate-700 text-sm">Stock bajo</h3>
                    </div>
                    {loading ? (
                        <p className="text-slate-300 text-sm animate-pulse">Cargando...</p>
                    ) : stockBajo.length === 0 ? (
                        <p className="text-emerald-600 text-sm font-medium">Todo el stock está bien ✓</p>
                    ) : (
                        <div className="space-y-3">
                            {stockBajo.slice(0, 4).map(p => (
                                <div key={p.id} className="flex items-center justify-between">
                                    <span className="text-sm text-slate-600 truncate max-w-[130px]">{p.nombre}</span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                        p.stock === 0
                                            ? "bg-red-100 text-red-600"
                                            : "bg-amber-100 text-amber-700"
                                    }`}>
                                        {p.stock === 0 ? "Sin stock" : `${p.stock} uds`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Facturas recientes */}
            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800 text-lg">Mis facturas recientes</h2>
                    <button
                        onClick={() => navigate("/facturas")}
                        className="text-blue-700 text-sm font-semibold hover:underline"
                    >
                        Ver todas →
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">N° Factura</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Subtotal</th>
                            <th className="px-6 py-4">IVA 15%</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-slate-300 animate-pulse">
                                    Cargando...
                                </td>
                            </tr>
                        ) : facturas.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-12 text-center text-slate-400 text-sm">
                                    No hay facturas registradas aún
                                </td>
                            </tr>
                        ) : facturas.map((f, i) => (
                            <tr key={f.id} className={`hover:bg-slate-50 transition ${i > 0 ? "border-t border-slate-100" : ""}`}>
                                <td className="px-6 py-4 font-bold text-blue-700 text-sm">{f.numeroFactura}</td>
                                <td className="px-6 py-4 text-slate-700 text-sm">{f.clienteIdentificacion ?? "—"}</td>                                <td className="px-6 py-4 text-slate-400 text-sm">{f.fechaEmision}</td>
                                <td className="px-6 py-4 text-slate-600 text-sm">${f.subtotal.toFixed(2)}</td>
                                <td className="px-6 py-4 text-slate-400 text-sm">${f.impuesto.toFixed(2)}</td>
                                <td className="px-6 py-4 font-extrabold text-slate-800">${f.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${estadoBadge(f.estado)}`}>
                                        {f.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {f.estado === "EMITIDA" && (
                                        <button
                                            onClick={() => cobrar(f.id)}
                                            className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-emerald-100 transition"
                                        >
                                            Cobrar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}