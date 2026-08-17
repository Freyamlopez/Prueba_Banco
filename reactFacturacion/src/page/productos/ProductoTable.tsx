import type { Producto } from "../../interface/producto";

interface ProductoTableProps {
    productos: Producto[];
    onEditar: (producto: Producto) => void;
    onCambiarEstado: (producto: Producto) => void;
}


export default function ProductoTable({ productos, onEditar, onCambiarEstado}: ProductoTableProps) {

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table className="w-full min-w">

                    {/* ENCABEZADO */}

                    <thead className="bg-[#062951] text-white">
                        <tr>
                            <th className="px-5 py-4 text-left text-sm font-medium">
                                Nombre
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-medium">
                                Descripción
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-medium">
                                Precio
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-medium">
                                Stock
                            </th>

                            <th className="px-5 py-4 text-left text-sm font-medium">
                                Estado
                            </th>

                            <th className="px-5 py-4 text-center text-sm font-medium">
                                Acciones
                            </th>

                        </tr>
                    </thead>


                    {/* CUERPO */}

                    <tbody>
                        {productos.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    No hay productos registrados.
                                </td>
                            </tr>

                        ) : (

                            productos.map((producto) => (
                                <tr
                                    key={producto.id}
                                    className="border-b border-gray-100 transition hover:bg-gray-50"
                                >

                                    {/* NOMBRE */}

                                    <td className="px-5 py-4 text-sm font-medium text-gray-800">
                                        {producto.nombre}
                                    </td>


                                    {/* DESCRIPCIÓN */}

                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {producto.descripcion}
                                    </td>


                                    {/* PRECIO */}

                                    <td className="px-5 py-4 text-sm text-gray-800">
                                        ${Number(producto.precioUnitario).toFixed(2)}
                                    </td>


                                    {/* STOCK */}

                                    <td className="px-5 py-4 text-sm text-gray-800">
                                        {producto.stock}
                                    </td>


                                    {/* ESTADO */}

                                    <td className="px-5 py-4">

                                        <span
                                            className={
                                                producto.activo
                                                    ? "text-sm font-medium text-green-600"
                                                    : "text-sm font-medium text-red-600"
                                            }
                                        >
                                            {producto.activo
                                                ? "ACTIVO"
                                                : "INACTIVO"
                                            }
                                        </span>

                                    </td>


                                    {/* ACCIONES */}

                                    <td className="px-5 py-4">

                                        <div className="flex justify-center gap-2">

                                            {/* EDITAR */}

                                            <button
                                                type="button"
                                                onClick={() => onEditar(producto)}
                                                title="Editar producto"
                                                className="flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white transition hover:bg-green-600"
                                            >
                                                ✎
                                            </button>


                                            {/* CAMBIAR ESTADO */}

                                            <button
                                                type="button"
                                                onClick={() => onCambiarEstado(producto)}
                                                title={
                                                    producto.activo
                                                        ? "Desactivar producto"
                                                        : "Activar producto"
                                                }
                                                className={
                                                    producto.activo
                                                        ? "flex h-8 w-8 items-center justify-center rounded-md bg-red-500 text-white transition hover:bg-red-600"
                                                        : "flex h-8 w-8 items-center justify-center rounded-md bg-green-500 text-white transition hover:bg-green-600"
                                                }
                                            >
                                                {producto.activo ? "✕" : "✓"}
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}