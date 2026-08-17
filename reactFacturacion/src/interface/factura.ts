export interface DetalleFactura {
    id: number;
    productoId: number;
    productoNombre: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

export interface Factura {
    id: number;
    numeroFactura: string;
    clienteId: number;
    clienteIdentificacion: string;
    cajeroId: number;
    cajeroNombre: string;
    fechaEmision: string; // ISO date, ej "2026-08-07"
    subtotal: number;
    impuesto: number;
    total: number;
    estado: "EMITIDA" | "ANULADA" | "PAGADA";
    detalles: DetalleFactura[];
}

export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number; // página actual (0-indexed)
    size: number;
}

export interface FacturaPage {
    content: Factura[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    totalElements: number;
    totalPages: number;
}