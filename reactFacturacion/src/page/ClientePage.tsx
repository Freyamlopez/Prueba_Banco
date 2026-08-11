import { useEffect, useMemo, useState } from "react";
import { Plus, Search, SlidersHorizontal, Pencil, Trash2 } from "lucide-react";
import type { Cliente, ClienteRequest } from "../interface/cliente";
import { getClientes, createCliente, updateCliente, deleteCliente } from "../api/cliente";
import ClienteForm from "../components/cliente/ClienteForm";


export default function ClientePage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [busqueda, setBusqueda] = useState("");
    const [modalAbierto, setModalAbierto] = useState(false);
    const [clienteEnEdicion, setClienteEnEdicion] = useState<Cliente | null>(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => { cargarClientes(); }, []);

    async function cargarClientes() {
        try {
            setCargando(true);
            setError(null);
            const data = await getClientes();
            setClientes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al cargar los clientes");
        } finally {
            setCargando(false);
        }
    }

    const clientesFiltrados = useMemo(() => {
        const termino = busqueda.trim().toLowerCase();

        if (!termino) {
            return clientes;
        }

        return clientes.filter((c) => c.nombre.toLowerCase().includes(termino));
    }, [clientes, busqueda]);

    function abrirParaCrear() {
        setClienteEnEdicion(null);
        setModalAbierto(true);
    }

    function abrirParaEditar(cliente: Cliente) {
        setClienteEnEdicion(cliente);
        setModalAbierto(true);
    }

    function cerrarModal() {
        setModalAbierto(false);
        setClienteEnEdicion(null);
    }

    async function handleGuardar(data: ClienteRequest) {
        
        try {
            setGuardando(true);

             if (clienteEnEdicion) {
                await updateCliente(clienteEnEdicion.id, data);
            } else {
                await createCliente(data);
            }

            await cargarClientes();
            setModalAbierto(false);
            setClienteEnEdicion(null);
        } catch (err) {
            alert(err instanceof Error ? err.message : "No se pudo guardar el cliente");
        } finally {
            setGuardando(false);
        }
    }

    async function handleEliminar(cliente: Cliente) {
        if (!confirm(`¿Eliminar a ${cliente.nombre}?`)) {
            return;
        }

        try {
            await deleteCliente(cliente.id);
            setClientes((prev) => prev.filter((c) => c.id !== cliente.id));
        } catch (err) {
            alert(err instanceof Error ? err.message : "No se pudo eliminar el cliente");
        }
    }

    return (
        <div className="rounded-2xl bg-white p-8 shadow">
            <h1 className="text-3xl font-bold mb-4">Clientes</h1>
            <p>Gestión de clientes.</p>

            <h1 className="text-3xl font-bold text-slate-800">Gestión de clientes</h1>
            <p className="mt-1 text-slate-500">Visualiza, busca y organiza la información de tus clientes</p>

            {/* TOOLBAR */}
            <div className="mt-6 flex items-center justify-between gap-4">

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                        <SlidersHorizontal size={16} />
                        Filtros
                    </button>

                    <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2">
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Nombre cliente"
                            className="w-48 text-sm outline-none placeholder:text-slate-400"
                        />
                        <Search size={16} className="text-slate-400" />
                    </div>
                </div>

                <button
                    onClick={abrirParaCrear}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus size={16} />
                    Añadir cliente
                </button>
            </div>

            {/* TABLA */}
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-4 py-3 font-medium">Nombre</th>
                            <th className="px-4 py-3 font-medium">Cédula</th>
                            <th className="px-4 py-3 font-medium">Teléfono</th>
                            <th className="px-4 py-3 font-medium">Correo</th>
                            <th className="px-4 py-3 font-medium">Dirección</th>
                            <th className="px-4 py-3 font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cargando && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                                    Cargando clientes...
                                </td>
                            </tr>
                        )}

                        {!cargando && clientesFiltrados.map((cliente) => (
                            <tr key={cliente.id} className="border-t border-slate-100">
                                <td className="px-4 py-3 font-medium text-slate-700">{cliente.nombre}</td>
                                <td className="px-4 py-3 text-slate-600">{cliente.identificacion}</td>
                                <td className="px-4 py-3 text-slate-600">{cliente.telefono}</td>
                                <td className="px-4 py-3 text-slate-600">{cliente.correo}</td>
                                <td className="px-4 py-3 text-slate-600">{cliente.direccion}</td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => abrirParaEditar(cliente)}
                                            className="rounded-md bg-green-500 p-1.5 text-white hover:bg-green-600"
                                            title="Editar"
                                        >
                                            <Pencil size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleEliminar(cliente)}
                                            className="rounded-md bg-red-500 p-1.5 text-white hover:bg-red-600"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!cargando && !error && clientesFiltrados.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                                    No se encontraron clientes.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modalAbierto && (
                <ClienteForm
                    clienteInicial={clienteEnEdicion}
                    onClose={cerrarModal}
                    onGuardar={handleGuardar}
                />
            )}
        </div>
    );
}
