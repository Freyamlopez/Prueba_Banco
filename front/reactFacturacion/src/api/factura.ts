import type { FacturaPage } from "../interface/factura";

const URL = "http://localhost:8080/facturas";


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
        `${URL}/mis-facturas?${params.toString()}`,
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