import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { getMisFacturas, pagarFactura } from "../../api/facturas";
import type { Factura } from "../../interface/factura";
import Modal from "../../components/common/Modal";
import NuevaFacturaModal from "../../components/common/NuevaFacturaModal";

const ESTADO_ESTILOS: Record<string, string> = {
    EMITIDA: "bg-blue-100 text-blue-700",
    PAGADA: "bg-green-100 text-green-700",
    ANULADA: "bg-red-100 text-red-700",
};

export default function FacturaCajeroView() {
    const [facturas, setFacturas] = useState<Factura[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [mostrarNueva, setMostrarNueva] = useState(false);
    const [facturaAPagar, setFacturaAPagar] = useState<Factura | null>(null);
    const [pagando, setPagando] = useState(false);

    const cargar = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getMisFacturas(page, 10);
            setFacturas(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Error al cargar tus facturas");
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargar();
    }, [cargar]);

    const handleConfirmarPago = async () => {
        if (!facturaAPagar) return;
        setPagando(true);
        try {
            await pagarFactura(facturaAPagar.id);
            toast.success(`Factura ${facturaAPagar.numeroFactura} marcada como pagada`);
            setFacturaAPagar(null);
            cargar();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "No se pudo registrar el pago");
        } finally {
            setPagando(false);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Mis facturas</h1>
                    <p className="text-slate-500">Historial de facturas que has emitido</p>
                </div>
                <button
                    onClick={() => setMostrarNueva(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium"
                >
                    <Plus size={18} /> Nueva factura
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 text-sm">
                        <tr>
                            <th className="px-6 py-4">N° Factura</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Total</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                                    Cargando...
                                </td>
                            </tr>
                        ) : facturas.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                                    Todavía no has emitido ninguna factura
                                </td>
                            </tr>
                        ) : (
                            facturas.map((factura) => (
                                <tr key={factura.id} className="border-t">
                                    <td className="px-6 py-4 font-medium">{factura.numeroFactura}</td>
                                    <td className="px-6 py-4">{factura.clienteIdentificacion}</td>
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
                                                onClick={() => setFacturaAPagar(factura)}
                                                className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
                                            >
                                                Marcar pagada
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
                        <button disabled={page === 0} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 rounded border disabled:opacity-40">
                            Anterior
                        </button>
                        <span className="px-3 py-1 text-slate-600">Página {page + 1} de {totalPages}</span>
                        <button disabled={page + 1 >= totalPages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded border disabled:opacity-40">
                            Siguiente
                        </button>
                    </div>
                )}
            </div>

            {mostrarNueva && (
                <NuevaFacturaModal onClose={() => setMostrarNueva(false)} onCreada={cargar} />
            )}

            {facturaAPagar && (
                <Modal title="Registrar pago" onClose={() => setFacturaAPagar(null)}>
                    <p className="text-slate-600 mb-6">
                        ¿Confirmas que la factura <span className="font-semibold">{facturaAPagar.numeroFactura}</span> fue pagada?
                    </p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setFacturaAPagar(null)} disabled={pagando} className="px-4 py-2 rounded-lg border font-medium">
                            Cancelar
                        </button>
                        <button onClick={handleConfirmarPago} disabled={pagando} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium disabled:opacity-60">
                            {pagando ? "Guardando..." : "Sí, confirmar pago"}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
}