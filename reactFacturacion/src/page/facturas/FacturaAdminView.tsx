import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Search, SlidersHorizontal } from "lucide-react";
import { getAllFacturas, anularFactura, type FacturaFiltros  } from "../../api/facturas";
import type { Factura } from "../../interface/factura";
import Modal from "../../components/common/Modal";

const ESTADO_ESTILOS: Record<string, string> = {
    EMITIDA: "bg-blue-100 text-blue-700",
    PAGADA: "bg-green-100 text-green-700",
    ANULADA: "bg-red-100 text-red-700",
};

export default function FacturaAdminView() {
    const [facturas, setFacturas] = useState<Factura[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [facturaAAnular, setFacturaAAnular] = useState<Factura | null>(null);
    const [anulando, setAnulando] = useState(false);

    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [numeroFactura, setNumeroFactura] = useState("");
    const [estado, setEstado] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const cargarFacturas = useCallback(async () => {
        setLoading(true);
        const filtros: FacturaFiltros = { numeroFactura, estado, fechaInicio, fechaFin };
        try {
            const data = await getAllFacturas(page, 10, filtros);
            setFacturas(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error al cargar facturas");
        } finally {
            setLoading(false);
        }
    }, [page, numeroFactura, estado, fechaInicio, fechaFin]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarFacturas();
    }, [cargarFacturas]);

    const handleConfirmarAnular = async () => {
        if (!facturaAAnular) return;
        setAnulando(true);
        try {
            await anularFactura(facturaAAnular.id);
            toast.success(`Factura ${facturaAAnular.numeroFactura} anulada correctamente`);
            setFacturaAAnular(null);
            cargarFacturas(); // refresca la tabla para reflejar el nuevo estado y el stock devuelto
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "No se pudo anular la factura");
        } finally {
            setAnulando(false);
        }
    };

    const limpiarFiltros = () => {
        setNumeroFactura("");
        setEstado("");
        setFechaInicio("");
        setFechaFin("");
        setPage(0);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-800">Gestión de facturas</h1>
            <p className="text-slate-500 mb-6">Consulta el historial completo y anula facturas emitidas</p>

            {/* Barra de búsqueda + filtros */}
            <div className="flex items-center gap-3 mb-4">
                <button
                    onClick={() => setMostrarFiltros((v) => !v)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white text-slate-600 font-medium"
                >
                    <SlidersHorizontal size={16} />
                    Filtros
                </button>

                <div className="relative flex-1 max-w-xs">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        value={numeroFactura}
                        onChange={(e) => { setPage(0); setNumeroFactura(e.target.value); }}
                        placeholder="Número de factura"
                        className="w-full h-10 pl-9 pr-3 rounded-lg border bg-white outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
            </div>

            {mostrarFiltros && (
                <div className="bg-white rounded-2xl shadow p-5 mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Estado</label>
                        <select
                            value={estado}
                            onChange={(e) => { setPage(0); setEstado(e.target.value); }}
                            className="w-full h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">Todos</option>
                            <option value="EMITIDA">Emitida</option>
                            <option value="PAGADA">Pagada</option>
                            <option value="ANULADA">Anulada</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Fecha desde</label>
                        <input
                            type="date"
                            value={fechaInicio}
                            onChange={(e) => { setPage(0); setFechaInicio(e.target.value); }}
                            className="w-full h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Fecha hasta</label>
                        <input
                            type="date"
                            value={fechaFin}
                            onChange={(e) => { setPage(0); setFechaFin(e.target.value); }}
                            className="w-full h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={limpiarFiltros}
                            className="w-full h-10 rounded-lg border text-slate-600 font-medium hover:bg-slate-50"
                        >
                            Limpiar filtros
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 text-sm">
                        <tr>
                            <th className="px-6 py-4">N° Factura</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Cajero</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                                    Cargando facturas...
                                </td>
                            </tr>
                        ) : facturas.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-10 text-center text-slate-400">
                                    No hay facturas registradas
                                </td>
                            </tr>
                        ) : (
                            facturas.map((factura) => (
                                <tr key={factura.id} className="border-t">
                                    <td className="px-6 py-4 font-medium">{factura.numeroFactura}</td>
                                    <td className="px-6 py-4">{factura.clienteIdentificacion}</td>
                                    <td className="px-6 py-4">{factura.cajeroNombre}</td>
                                    <td className="px-6 py-4">{factura.fechaEmision}</td>
                                    <td className="px-6 py-4">${factura.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ESTADO_ESTILOS[factura.estado]}`}>
                                            {factura.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {factura.estado === "EMITIDA" ? (
                                            <button
                                                onClick={() => setFacturaAAnular(factura)}
                                                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium"
                                            >
                                                Anular
                                            </button>
                                        ) : (
                                            <span className="text-slate-300 text-sm">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-2 py-4 border-t">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 rounded border disabled:opacity-40"
                        >
                            Anterior
                        </button>
                        <span className="px-3 py-1 text-slate-600">
                            Página {page + 1} de {totalPages}
                        </span>
                        <button
                            disabled={page + 1 >= totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 rounded border disabled:opacity-40"
                        >
                            Siguiente
                        </button>
                    </div>
                )}
            </div>

            {facturaAAnular && (
                <Modal title="Anular factura" onClose={() => setFacturaAAnular(null)}>
                    <p className="text-slate-600 mb-6">
                        ¿Confirmas que deseas anular la factura{" "}
                        <span className="font-semibold">{facturaAAnular.numeroFactura}</span>? Esta acción
                        devolverá el stock de los productos y no se puede deshacer.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setFacturaAAnular(null)}
                            disabled={anulando}
                            className="px-4 py-2 rounded-lg border font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirmarAnular}
                            disabled={anulando}
                            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-60"
                        >
                            {anulando ? "Anulando..." : "Sí, anular"}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}