import { useState } from "react";
import { X } from "lucide-react";
import type { Cliente, ClienteRequest} from "../interface/cliente";

interface ClienteFormProps {
    clienteInicial?: Cliente | null;
    onClose: () => void;
    onGuardar: (data: ClienteRequest) => void;
}

interface FormState {
    usuario: string;
    identificacion: string;
    telefono: string;
    correo: string;
    direccion: string;
}

const initialState: FormState = {
    usuario: "",
    identificacion: "",
    telefono: "",
    correo: "",
    direccion: ""
};

export default function ClienteForm({ clienteInicial, onClose, onGuardar }: ClienteFormProps) {

    const esEdicion = !!clienteInicial;

    const [form, setForm] = useState<FormState>(
        clienteInicial
            ? {
                usuario: clienteInicial.nombre,
                identificacion: clienteInicial.identificacion,
                telefono: clienteInicial.telefono,
                correo: clienteInicial.correo,
                direccion: clienteInicial.direccion
            }
            : initialState
    );

    const [errores, setErrores] = useState<Partial<FormState>>({});

    function handleChange(campo: keyof FormState, valor: string) {
        setForm((prev) => ({ ...prev, [campo]: valor }));
    }

    function validar(): boolean {
        const nuevosErrores: Partial<FormState> = {};

        if (!form.usuario.trim()) {
            nuevosErrores.usuario = "El nombre es obligatorio.";
        }

        if (!/^\d{10}$/.test(form.identificacion)) {
            nuevosErrores.identificacion = "La cédula debe tener exactamente 10 dígitos.";
        }

        if (!/^\d{10}$/.test(form.telefono)) {
            nuevosErrores.telefono = "El teléfono debe tener exactamente 10 dígitos.";
        }

        if (!/^\S+@\S+\.\S+$/.test(form.correo)) {
            nuevosErrores.correo = "Ingresa un correo válido.";
        }

        if (!form.direccion.trim()) {
            nuevosErrores.direccion = "La dirección es obligatoria.";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!validar()) {
            return;
        }

        onGuardar({
            usuario: form.usuario,
            identificacion: form.identificacion,
            telefono: form.telefono,
            direccion: form.direccion
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">

                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-800">
                        {esEdicion ? "Editar cliente" : "Añadir cliente"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-600">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={form.usuario}
                            onChange={(e) => handleChange("usuario", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            placeholder="Nombre completo"
                        />
                        {errores.usuario && <p className="mt-1 text-xs text-red-500">{errores.usuario}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-600">
                                Cédula
                            </label>
                            <input
                                type="text"
                                value={form.identificacion}
                                onChange={(e) => handleChange("identificacion", e.target.value)}
                                disabled={esEdicion}
                                maxLength={10}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                                placeholder="0900000000"
                            />
                            {errores.identificacion && <p className="mt-1 text-xs text-red-500">{errores.identificacion}</p>}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-600">
                                Teléfono
                            </label>
                            <input
                                type="text"
                                value={form.telefono}
                                onChange={(e) => handleChange("telefono", e.target.value)}
                                maxLength={10}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                                placeholder="0900000000"
                            />
                            {errores.telefono && <p className="mt-1 text-xs text-red-500">{errores.telefono}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-600">
                            Correo
                        </label>
                        <input
                            type="email"
                            value={form.correo}
                            onChange={(e) => handleChange("correo", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            placeholder="cliente@correo.com"
                        />
                        {errores.correo && <p className="mt-1 text-xs text-red-500">{errores.correo}</p>}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-600">
                            Dirección
                        </label>
                        <input
                            type="text"
                            value={form.direccion}
                            onChange={(e) => handleChange("direccion", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
                            placeholder="Calle principal y secundaria"
                        />
                        {errores.direccion && <p className="mt-1 text-xs text-red-500">{errores.direccion}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Guardar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}