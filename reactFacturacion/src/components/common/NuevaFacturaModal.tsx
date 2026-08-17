import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { getAllClientes } from "../../api/clientes";
import { getAllProductos } from "../../api/producto";
import { crearFactura , type DetalleFacturaInput } from "../../api/facturas";
import type { Cliente } from "../../interface/cliente";
import type { Producto } from "../../interface/producto";

interface NuevaFacturaModalProps {
    onClose: () => void;
    onCreada: () => void;
}

interface FilaDetalle {
    productoId: number | "";
    cantidad: number;
}

export default function NuevaFacturaModal({ onClose, onCreada }: NuevaFacturaModalProps) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [clienteId, setClienteId] = useState<number | "">("");
    const [filas, setFilas] = useState<FilaDetalle[]>([{ productoId: "", cantidad: 1 }]);
    const [enviando, setEnviando] = useState(false);
    const [cargandoDatos, setCargandoDatos] = useState(true);

    useEffect(() => {
        Promise.all([getAllClientes(0, 100), getAllProductos()])
            .then(([clientesPage, productosLista]) => {
                setClientes(clientesPage.content);
                setProductos(productosLista.filter((p) => p.activo && p.stock > 0));
            })
            .catch(() => toast.error("No se pudieron cargar clientes/productos"))
            .finally(() => setCargandoDatos(false));
    }, []);

    const agregarFila = () => setFilas((f) => [...f, { productoId: "", cantidad: 1 }]);

    const quitarFila = (index: number) =>
        setFilas((f) => f.filter((_, i) => i !== index));

    const actualizarFila = (index: number, cambios: Partial<FilaDetalle>) =>
        setFilas((f) => f.map((fila, i) => (i === index ? { ...fila, ...cambios } : fila)));

    const stockDisponible = (productoId: number | "") =>
        productos.find((p) => p.id === productoId)?.stock ?? 0;

    const handleSubmit = async () => {
        if (clienteId === "") {
            toast.error("Selecciona un cliente");
            return;
        }
        const detalles: DetalleFacturaInput[] = [];
        for (const fila of filas) {
            if (fila.productoId === "" || fila.cantidad <= 0) {
                toast.error("Completa todos los productos y cantidades (mayores a 0)");
                return;
            }
            if (fila.cantidad > stockDisponible(fila.productoId)) {
                const nombre = productos.find((p) => p.id === fila.productoId)?.nombre;
                toast.error(`Stock insuficiente para "${nombre}"`);
                return;
            }
            detalles.push({ productoId: fila.productoId, cantidad: fila.cantidad });
        }

        setEnviando(true);
        try {
            const factura = await crearFactura({ clienteId, detalles });
            toast.success(`Factura ${factura.numeroFactura} creada correctamente`);
            onCreada();
            onClose();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "No se pudo crear la factura");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Modal title="Nueva factura" onClose={onClose}>
            {cargandoDatos ? (
                <p className="text-slate-500 text-center py-6">Cargando clientes y productos...</p>
            ) : (
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Cliente</label>
                        <select
                            value={clienteId}
                            onChange={(e) => setClienteId(e.target.value ? Number(e.target.value) : "")}
                            className="w-full h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option value="">Selecciona un cliente</option>
                            {clientes.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.identificacion}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-2">Productos</label>
                        <div className="space-y-3">
                            {filas.map((fila, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <select
                                        value={fila.productoId}
                                        onChange={(e) =>
                                            actualizarFila(index, {
                                                productoId: e.target.value ? Number(e.target.value) : "",
                                            })
                                        }
                                        className="flex-1 h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                                    >
                                        <option value="">Selecciona un producto</option>
                                        {productos.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.nombre} — ${p.precioUnitario.toFixed(2)} (stock: {p.stock})
                                            </option>
                                        ))}
                                    </select>

                                    <input
                                        type="number"
                                        min={1}
                                        value={fila.cantidad}
                                        onChange={(e) => actualizarFila(index, { cantidad: Number(e.target.value) })}
                                        className="w-20 h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                                    />

                                    {filas.length > 1 && (
                                        <button
                                            onClick={() => quitarFila(index)}
                                            className="text-red-500 hover:text-red-700"
                                            type="button"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={agregarFila}
                            type="button"
                            className="flex items-center gap-1 text-blue-700 text-sm font-medium mt-3"
                        >
                            <Plus size={16} /> Agregar producto
                        </button>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={onClose}
                            disabled={enviando}
                            className="px-4 py-2 rounded-lg border font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={enviando}
                            className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium disabled:opacity-60"
                        >
                            {enviando ? "Creando..." : "Crear factura"}
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    );
}