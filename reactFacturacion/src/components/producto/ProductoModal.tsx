import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { Producto, ProductoRequest} from "../../interface/producto";


interface ProductoModalProps {
    abierto: boolean;
    producto: Producto | null;
    onCerrar: () => void;
    onGuardar: (producto: ProductoRequest) => void;
}


export default function ProductoModal({ abierto, producto, onCerrar, onGuardar }: ProductoModalProps) {

    const { register, handleSubmit, reset, formState: { errors }} = useForm<ProductoRequest>({
        defaultValues: {
            nombre: "",
            descripcion: "",
            precioUnitario: 0,
            stock: 1,
            activo: true
        }
    });

    useEffect(() => {

        if (producto) {
            reset({
                nombre: producto.nombre,
                descripcion: producto.descripcion,
                precioUnitario: producto.precioUnitario,
                stock: producto.stock,
                activo: producto.activo
            });

        } else {
            reset({
                nombre: "",
                descripcion: "",
                precioUnitario: 0,
                stock: 1,
                activo: true
             });
        }
    }, [producto, abierto, reset]);



    if (!abierto) {
        return null;
    }



    const submit = (data: ProductoRequest) => {
        onGuardar({
            ...data,
            activo: producto
                ? producto.activo
                : true
        });

    };


    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
                
                {/* HEADER */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>

                        <h2 className="text-xl font-bold text-gray-800">

                            {producto
                                ? "Editar producto"
                                : "Añadir producto"
                            }

                        </h2>

                        <p className="mt-1 text-sm text-gray-500">

                            {producto
                                ? "Modifica la información del producto"
                                : "Ingresa la información del nuevo producto"
                            }

                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={onCerrar}
                        className="text-2xl text-gray-400 hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>


                {/* FORMULARIO */}

                <form
                    onSubmit={handleSubmit(submit)}
                    className="space-y-5 p-6"
                >

                    {/* NOMBRE */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Nombre
                        </label>

                        <input
                            type="text"
                            placeholder="Ej. Xiaomi Redmi Note 13"
                            className={`w-full rounded-lg border px-4 py-3 outline-none transition
                                ${
                                    errors.nombre
                                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                }`}
                            {...register("nombre", {
                                required: "El nombre es obligatorio.",
                                maxLength: {
                                    value: 25,
                                    message: "El nombre no puede superar los 25 caracteres."
                                }
                            })}
                        />

                        {errors.nombre && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.nombre.message}
                            </p>
                        )}

                    </div>


                    {/* DESCRIPCIÓN */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Descripción
                        </label>

                        <textarea
                            rows={3}
                            placeholder="Descripción del producto"
                            className={`w-full resize-none rounded-lg border px-4 py-3 outline-none transition
                                ${
                                    errors.descripcion
                                        ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                }`}
                            {...register("descripcion", {
                                required: "La descripción es obligatoria.",
                                maxLength: {
                                    value: 35,
                                    message: "La descripción no puede superar los 35 caracteres."
                                }
                            })}
                        />

                        {errors.descripcion && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.descripcion.message}
                            </p>
                        )}

                    </div>


                    {/* PRECIO Y STOCK */}

                    <div className="grid grid-cols-2 gap-4">

                        {/* PRECIO */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Precio unitario
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="0.00"
                                className={`w-full rounded-lg border px-4 py-3 outline-none transition
                                    ${
                                        errors.precioUnitario
                                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    }`}
                                {...register("precioUnitario", {
                                    required: "El precio es obligatorio.",
                                    valueAsNumber: true,
                                    min: {
                                        value: 0.01,
                                        message: "El precio debe ser mayor a 0."
                                    }
                                })}
                            />

                            {errors.precioUnitario && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.precioUnitario.message}
                                </p>
                            )}

                        </div>


                        {/* STOCK */}

                        <div>

                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Stock
                            </label>

                            <input
                                type="number"
                                min="1"
                                step="1"
                                placeholder="1"
                                className={`w-full rounded-lg border px-4 py-3 outline-none transition
                                    ${
                                        errors.stock
                                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    }`}
                                {...register("stock", {
                                    required: "El stock es obligatorio.",
                                    valueAsNumber: true,
                                    min: {
                                        value: 1,
                                        message: "El stock debe ser mayor a 0."
                                    },
                                    validate: (value) =>
                                        Number.isInteger(value) ||
                                        "El stock debe ser un número entero."
                                })}
                            />

                            {errors.stock && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.stock.message}
                                </p>
                            )}

                        </div>

                    </div>


                    {/* BOTONES */}

                    <div className="flex justify-end gap-3 border-t pt-5">

                        <button
                            type="button"
                            onClick={onCerrar}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                        >
                            {producto
                                ? "Guardar cambios"
                                : "Añadir producto"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}