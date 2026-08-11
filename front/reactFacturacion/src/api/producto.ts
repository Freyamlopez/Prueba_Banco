import type { Producto, ProductoRequest } from "../interface/producto";

const URL = "http://localhost:8080/productos";



function getHeaders() {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}



export async function getProductos(): Promise<Producto[]> {

    const response = await fetch(URL, {
        method: "GET",
        headers: getHeaders()
    });

    if (!response.ok) {
        throw new Error("Error al obtener los productos");
    }

    return await response.json();
}



export async function createProducto(producto: ProductoRequest): Promise<Producto> {

    const response = await fetch(URL, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(producto)
    });

    if (!response.ok) {
        throw new Error("Error al crear el producto");
    }

    return await response.json();
}




export async function updateProducto(id: number, producto: ProductoRequest): Promise<Producto> {

    const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(producto)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el producto");
    }

    return await response.json();
}




export async function changeProductoStatus(
    id: number,
    activo: boolean
): Promise<Producto> {

    const response = await fetch(
        `${URL}/${id}/estado?activo=${activo}`,
        {
            method: "PUT",
            headers: getHeaders()
        }
    );

    if (!response.ok) {
        throw new Error("Error al cambiar el estado del producto");
    }

    return await response.json();
}
    