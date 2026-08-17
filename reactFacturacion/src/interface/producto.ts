
export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precioUnitario: number;
    stock: number;
    activo: boolean;
}

export interface ProductoRequest {
    nombre: string;
    descripcion: string;
    precioUnitario: number;
    stock: number;
    activo: boolean;
}