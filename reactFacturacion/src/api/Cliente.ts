import type { Cliente, ClienteRequest } from "../interface/cliente";

const URL = "http://localhost:8080/clientes";

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

function buildHeaders(token?: string, withJson = false): Headers {
    const headers = new Headers();
    const authToken = getAuthToken(token);

    if (authToken) {
        headers.set("Authorization", authToken);
    }

    if (withJson) {
        headers.set("Content-Type", "application/json");
    }

    return headers;
}


export async function getClientes(token?: string): Promise<Cliente[]> {

    const headers = buildHeaders(token);
    const response = await fetch(URL, { headers });

    if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(message || "Error al listar clientes");
    }

    return await response.json();
}


export async function getClienteByIdentificacion(identificacion: string, token?: string): Promise<Cliente> {

    const headers = buildHeaders(token);
    const response = await fetch(`${URL}/${identificacion}`, { headers });

    if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(message || "Cliente no encontrado");
    }

    return await response.json();
}


export async function createCliente(data: ClienteRequest, token?: string): Promise<Cliente> {

    const headers = buildHeaders(token, true);

    const response = await fetch(URL, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(message || "Error al crear el cliente");
    }

    return await response.json();
}


export async function updateCliente(id: number, data: ClienteRequest, token?: string): Promise<Cliente> {

    const headers = buildHeaders(token, true);

    const response = await fetch(`${URL}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(message || "Error al actualizar el cliente");
    }

    return await response.json();
}


export async function deleteCliente(id: number, token?: string): Promise<void> {

    const headers = buildHeaders(token);

    const response = await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers
    });

    if (!response.ok) {
        const message = await response.text().catch(() => "");
        throw new Error(message || "Error al eliminar el cliente");
    }
}