
import type { Factura } from "../../interface/factura";

interface FacturaModalProps {
    abierto: boolean;
    factura: Factura | null;
    onCerrar: () => void;
}

export default function FacturaModal({
    abierto,
    factura,
    onCerrar
}: FacturaModalProps) {

    if (!abierto || !factura) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

                {/* HEADER */}

                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                            Detalle de factura
                        </h2>

                        <p className="text-sm text-slate-500">
                            {factura.numeroFactura}
                        </p>
                    </div>

                    <button
                        onClick={onCerrar}
                        className="text-2xl text-slate-400 hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                {/* INFORMACIÓN */}

                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">

                    <div>
                        <p className="text-sm text-slate-500">
                            Número de factura
                        </p>

                        <p className="font-semibold text-slate-800">
                            {factura.numeroFactura}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Fecha de emisión
                        </p>

                        <p className="font-semibold text-slate-800">
                            {factura.fechaEmision}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Cliente
                        </p>

                        <p className="font-semibold text-slate-800">
                            {factura.clienteIdentificacion}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">
                            Estado
                        </p>

                        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                            {factura.estado}
                        </span>
                    </div>

                </div>

                {/* DETALLES */}

                <div className="px-6 pb-6">

                    <h3 className="mb-4 text-lg font-bold text-slate-800">
                        Productos
                    </h3>

                    <div className="overflow-hidden rounded-xl border">

                        <table className="w-full text-left">

                            <thead className="bg-slate-100">

                                <tr>
                                    <th className="px-4 py-3">
                                        Producto
                                    </th>

                                    <th className="px-4 py-3">
                                        Cantidad
                                    </th>

                                    <th className="px-4 py-3">
                                        Precio
                                    </th>

                                    <th className="px-4 py-3">
                                        Subtotal
                                    </th>
                                </tr>

                            </thead>

                            <tbody>

                                {factura.detalles.map((detalle) => (

                                    <tr
                                        key={detalle.id}
                                        className="border-t"
                                    >

                                        <td className="px-4 py-3">
                                            {detalle.productoNombre}
                                        </td>

                                        <td className="px-4 py-3">
                                            {detalle.cantidad}
                                        </td>

                                        <td className="px-4 py-3">
                                            ${detalle.precioUnitario.toFixed(2)}
                                        </td>

                                        <td className="px-4 py-3 font-semibold">
                                            ${detalle.subtotal.toFixed(2)}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* TOTALES */}

                <div className="border-t bg-slate-50 px-6 py-5">

                    <div className="ml-auto max-w-sm space-y-2">

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                Subtotal
                            </span>

                            <span className="font-semibold">
                                ${factura.subtotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-slate-500">
                                IVA
                            </span>

                            <span className="font-semibold">
                                ${factura.impuesto.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex justify-between border-t pt-2 text-lg">
                            <span className="font-bold">
                                Total
                            </span>

                            <span className="font-bold text-blue-700">
                                ${factura.total.toFixed(2)}
                            </span>
                        </div>

                    </div>

                </div>

                {/* FOOTER */}

                <div className="flex justify-end border-t px-6 py-4">

                    <button
                        onClick={onCerrar}
                        className="rounded-lg bg-slate-700 px-5 py-2.5 font-medium text-white hover:bg-slate-800"
                    >
                        Cerrar
                    </button>

                </div>

            </div>

        </div>
    );
}
