import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaFileInvoiceDollar } from "react-icons/fa";
import { toast } from "react-toastify";

import type { Factura } from "../../interface/factura";
import { obtenerMisFacturas } from "../../api/facturas.ts";
import FacturaModal from "../../components/common/FacturaModal.tsx";
import FacturaTable from "./FacturaTalble.tsx";


export default function FacturasClientePage() {

    const navigate = useNavigate();
    const [facturas, setFacturas] = useState<Factura[]>([]);
    const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null);

    const [modalAbierto, setModalAbierto] = useState(false);
    const [pagina, setPagina] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const [cargando, setCargando] = useState(true);
    const TAMAÑO_PAGINA = 10;


    const cargarFacturas = async () => {
        try {
            setCargando(true);

            const data = await obtenerMisFacturas(
                pagina,
                TAMAÑO_PAGINA
            );

            setFacturas(data.content);
            setTotalPaginas(data.totalPages);

            console.log(data);

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(
                    "No se pudieron cargar las facturas."

                );
                console.log(error);
            }

            setFacturas([]);
            setTotalPaginas(0);

        } finally {
            setCargando(false);
        }
    };


    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        cargarFacturas();
    }, [pagina]);



    const verDetalle = (factura: Factura) => {
        setFacturaSeleccionada(factura);
        setModalAbierto(true);
    };


    const cerrarModal = () => {
        setModalAbierto(false);
        setFacturaSeleccionada(null);
    };


   
    const paginaAnterior = () => {
        if (pagina > 0) {
            setPagina(pagina - 1);
        }
    };


    const paginaSiguiente = () => {
        if (pagina < totalPaginas - 1) {
            setPagina(pagina + 1);
        }
    };


    return (

        <div className="min-h-screen bg-slate-100 p-6">
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-600 p-3 text-white">
                        <FaFileInvoiceDollar size={24} />
                    </div>

                    <div>                   
                        <h1 className="text-3xl font-bold text-slate-800">
                            Mis Facturas
                        </h1>

                        <p className="text-sm text-slate-500">
                            Consulta tus facturas y el detalle de tus compras
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                        className="ml-auto rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            {cargando ? (

                <div className="flex justify-center rounded-xl bg-white py-20 shadow-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600">
                    </div>
                </div>

            ) : (

             <>
                   <FacturaTable
                        facturas={facturas}
                        onVerDetalle={verDetalle}
                    />

                    {facturas.length > 0 && (

                        <div className="mt-4 flex items-center justify-between rounded-xl bg-white px-6 py-4 shadow-sm">
                            <p className="text-sm text-gray-500">
                                Página{" "}

                                <span className="font-semibold text-gray-700">
                                    {pagina + 1}
                                </span>

                                {" "}de{" "}

                                <span className="font-semibold text-gray-700">
                                    {totalPaginas}
                                </span>
                            </p>


                            <div className="flex gap-2">

                                <button
                                    onClick={paginaAnterior}
                                    disabled={pagina === 0}
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <FaChevronLeft />
                                    Anterior
                                </button>


                                <button
                                    onClick={paginaSiguiente}
                                    disabled={
                                        pagina >= totalPaginas - 1
                                    }
                                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                                >

                                    Siguiente

                                    <FaChevronRight />

                                </button>

                            </div>

                        </div>

                    )}

                </>

            )}

            <FacturaModal
                abierto={modalAbierto}
                factura={facturaSeleccionada}
                onCerrar={cerrarModal}
            />

        </div>

    );
}