import type { Factura } from "../../interface/factura";


interface FacturaTableProps {
    facturas: Factura[];
    onVerDetalle: (factura: Factura) => void;
}

export default function FacturaTable({ facturas, onVerDetalle }: FacturaTableProps) {

    const formatearFecha = (fecha: string) => {
        const [year, month, day] = fecha.split("-");

        return `${day}/${month}/${year}`;
    };


    const formatearDinero = (valor: number) => {
        return new Intl.NumberFormat("es-EC", {
            style: "currency",
            currency: "USD"
        }).format(valor);
    };


    const obtenerEstado = (estado: string) => {

        switch (estado) {
            case "EMITIDA":
                return "bg-blue-100 text-blue-700";
            case "PAGADA":
                return "bg-green-100 text-green-700";
            case "ANULADA":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    if (facturas.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">

                <p className="text-gray-500 text-lg">
                    No tienes facturas registradas.
                </p>

            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">

                    <thead className="bg-slate-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Factura
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Fecha
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Subtotal
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Impuesto
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Total
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Estado
                            </th>

                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                Acción
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {facturas.map((factura) => (
                            <tr
                                key={factura.id}
                                className="hover:bg-slate-50 transition"
                            >
                                <td className="px-6 py-4">
                                    <span className="font-semibold text-blue-700">
                                        {factura.numeroFactura}
                                    </span>

                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {formatearFecha(factura.fechaEmision)}
                                </td>

                                <td className="px-6 py-4 text-gray-700">
                                    {formatearDinero(factura.subtotal)}
                                </td>

                                <td className="px-6 py-4 text-gray-700">
                                    {formatearDinero(factura.impuesto)}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-900">
                                    {formatearDinero(factura.total)}
                                </td>

                                <td className="px-6 py-4">

                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${obtenerEstado(factura.estado)}`}
                                    >
                                        {factura.estado}
                                    </span>

                                </td>

                                <td className="px-6 py-4 text-center">

                                    <button
                                        onClick={() => onVerDetalle(factura)}
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                                    >
                                        Ver detalle
                                    </button>

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
}