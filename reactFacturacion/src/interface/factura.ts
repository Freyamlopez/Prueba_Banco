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
    fechaEmision: string;
    subtotal: number;
    impuesto: number;
    total: number;
    estado: string;
    detalles: DetalleFactura[];
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