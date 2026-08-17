import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import type { Producto, ProductoRequest } from "../../interface/producto";
import { getProductos, createProducto, updateProducto, changeProductoStatus } from "../../api/producto";
import ProductoModal from "../../components/common/ProductoModal";
import ProductoTable from "./ProductoTable";



export default function ProductoPage() {

    const [productos, setProductos] = useState<Producto[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroEstado, setFiltroEstado] = useState<"todos" | "activo" | "inactivo">("todos");



    const cargarProductos = async () => {
        try {
            const data = await getProductos();
            setProductos(data);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("No se pudieron cargar los productos");
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarProductos();
    }, []);




    const handleNuevoProducto = () => {
        setProductoSeleccionado(null);
        setModalOpen(true);
    };



    const handleEditar = (producto: Producto) => {
        setProductoSeleccionado(producto);
        setModalOpen(true);
    };



    const handleGuardar = async (producto: ProductoRequest) => {

        try {
            if (productoSeleccionado) {
                await updateProducto(
                    productoSeleccionado.id,
                    producto
                );
                toast.success("Producto actualizado correctamente");
            } else {
                await createProducto(producto);
                toast.success("Producto creado correctamente");
            }

            setModalOpen(false);
            setProductoSeleccionado(null);
            await cargarProductos();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {

            toast.error(
                productoSeleccionado
                    ? "Error al actualizar el producto"
                    : "Error al crear el producto"
            );

        }

    };



    const handleCambiarEstado = async (producto: Producto) => {

        try {

            await changeProductoStatus(
                producto.id,
                !producto.activo
            );

            toast.success(
                producto.activo
                    ? "Producto desactivado correctamente"
                    : "Producto activado correctamente"
            );

            await cargarProductos();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error("No se pudo cambiar el estado del producto");
        }

    };



    const cerrarModal = () => {

        setModalOpen(false);
        setProductoSeleccionado(null);
    };


  return (

        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mb-7 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Gestión de productos
                    </h1>

                    <p className="mt-1 text-wrap text-gray-500">
                        Visualiza, busca y organiza el stock de tus productos
                    </p>

                </div>


                <button
                    type="button"
                    onClick={handleNuevoProducto}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-start font-medium text-white shadow-sm transition hover:bg-blue-700"
                >
                    <span className="text-2xl">
                        +
                    </span>

                    Añadir producto

                </button>

            </div>


            {/* FILTROS */}

            <div className="mb-5 flex flex-wrap items-center gap-4">

              
                <div className="relative">

                    <input
                        type="text"
                        value={filtroNombre}
                        onChange={(event) => setFiltroNombre(event.target.value)}
                        placeholder="Nombre producto"
                        className="w-48 rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm outline-none shadow-sm focus:border-blue-500"
                    />


                </div>

                <div>
                    <select
                        value={filtroEstado}
                        onChange={(event) => setFiltroEstado(event.target.value as "todos" | "activo" | "inactivo")}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none shadow-sm focus:border-blue-500"
                    >
                        <option value="todos">Todos</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                </div>

            </div>

            <ProductoTable
                productos={productos
                    .filter((producto) =>
                        producto.nombre
                            .toLowerCase()
                            .includes(filtroNombre.toLowerCase())
                    )
                    .filter((producto) => {
                        if (filtroEstado === "todos") return true;
                        return filtroEstado === "activo"
                            ? producto.activo
                            : !producto.activo;
                    })
                }
                onEditar={handleEditar}
                onCambiarEstado={handleCambiarEstado}
            />


            <ProductoModal
                abierto={modalOpen}
                producto={productoSeleccionado}
                onCerrar={cerrarModal}
                onGuardar={handleGuardar}
            />

        </div>

    );

}