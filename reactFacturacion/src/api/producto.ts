import type { Producto } from "../interface/producto";


const URL = "http://localhost:8080/producto";



function getAuthToken(token?: string): string | null {
    if (token) {
        return token.startsWith("Bearer ") ? token : `Bearer ${token}`;
    }

    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
        return null;
    }

    return storedToken.startsWith("Bearer ") ? storedToken : `Bearer ${storedToken}`;
}



export async function getOrdenes(token?: string): Promise<Producto[]> {

    const authToken = getAuthToken(token);
    const headers = new Headers();

    if (authToken) {
        headers.set("Authorization", authToken);
    }

    const response = await fetch(URL, { headers });

    if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(message || "Error al listar órdenes");
    }

    return await response.json();
}

