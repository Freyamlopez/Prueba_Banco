import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";
import { crearCliente } from "../../api/clientes";

interface NuevoClienteModalProps {
    onClose: () => void;
    onCreado: () => void;
}

export default function NuevoClienteModal({ onClose, onCreado }: NuevoClienteModalProps) {
    const [nombre, setNombre] = useState("");
    const [identificacion, setIdentificacion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = async () => {
        if (!nombre.trim() || !identificacion.trim() || !telefono.trim() || !direccion.trim()) {
            toast.error("Completa todos los campos");
            return;
        }

        setEnviando(true);
        try {
            await crearCliente({ usuario: nombre, identificacion, telefono, direccion });
            toast.success("Cliente registrado correctamente");
            onCreado();
            onClose();
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "No se pudo registrar el cliente");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Modal title="Añadir cliente" onClose={onClose}>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Nombre</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre del cliente"
                        className="w-full h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Identificación</label>
                    <input
                        value={identificacion}
                        onChange={(e) => setIdentificacion(e.target.value)}
                        placeholder="Cédula, RUC o RUT"
                        className="w-full h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Teléfono</label>
                    <input
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="0999999999"
                        className="w-full h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Dirección</label>
                    <input
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        placeholder="Calle y número"
                        className="w-full h-10 rounded-lg border px-3 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button onClick={onClose} disabled={enviando} className="px-4 py-2 rounded-lg border font-medium">
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={enviando}
                        className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium disabled:opacity-60"
                    >
                        {enviando ? "Guardando..." : "Añadir"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}