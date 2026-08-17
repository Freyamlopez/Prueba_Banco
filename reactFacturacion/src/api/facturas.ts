import { apiFetch } from "./http";

import type { Factura, FacturaPage, PageResponse } from "../interface/factura";
export interface FacturaFiltros {
    estado?: string;
    numeroFactura?: string;
    fechaInicio?: string; // "2026-08-01"
    fechaFin?: string;
}

export interface DetalleFacturaInput {
    productoId: number;
    cantidad: number;
}

export interface FacturaCrearInput {
    clienteId: number;
    detalles: DetalleFacturaInput[];
}


export async function getAllFacturas(page = 0, size = 10, filtros: FacturaFiltros = {}): Promise<PageResponse<Factura>> {
    const params = new URLSearchParams({
        page: String(page),
        size: String(size),
        sort: "fechaEmision,desc",
    });

    if (filtros.estado) params.set("estado", filtros.estado);
    if (filtros.numeroFactura) params.set("numeroFactura", filtros.numeroFactura);
    if (filtros.fechaInicio) params.set("fechaInicio", filtros.fechaInicio);
    if (filtros.fechaFin) params.set("fechaFin", filtros.fechaFin);

    return apiFetch<PageResponse<Factura>>(`/facturas?${params.toString()}`);
}

export async function anularFactura(id: number): Promise<Factura> {
    return apiFetch<Factura>(`/facturas/${id}/anular`, { method: "PUT" });
}

export async function getMisFacturas(page = 0, size = 10): Promise<PageResponse<Factura>> {
    return apiFetch<PageResponse<Factura>>(`/facturas/mis-facturas?page=${page}&size=${size}`);
}

export async function crearFactura(input: FacturaCrearInput): Promise<Factura> {
    return apiFetch<Factura>(`/facturas`, {
        method: "POST",
        body: JSON.stringify(input),
    });
}

export async function pagarFactura(id: number): Promise<Factura> {
    return apiFetch<Factura>(`/facturas/${id}/pagar`, { method: "PUT" });
}

const URL = "http://localhost:8020/facturas";

export async function obtenerMisFacturas( page: number = 0, size: number = 10, 
    sort: string = "fechaEmision,desc" ): Promise<FacturaPage> {

    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No existe una sesión activa");
    }

    const params = new URLSearchParams({ page: page.toString(),
        size: size.toString(), sort
 });

    const response = await fetch(
        `${URL}/cliente-facturas?${params.toString()}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Sesión expirada");
    }

    if (response.status === 403) {
        throw new Error("No tienes permisos para consultar tus facturas");
    }

    if (!response.ok) {
        throw new Error("No se pudieron obtener las facturas");
    }

    return await response.json();
}
