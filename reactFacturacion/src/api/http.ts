const BASE_URL = "http://localhost:8020";

function getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers: {
            ...getAuthHeaders(),
            ...(options.headers || {}),
        },
    });

    if (!response.ok) {
        let mensaje = `Error ${response.status}`;
        try {
            const body = await response.json();
            mensaje = body.message || mensaje;
        } catch {
            // el body no era JSON, nos quedamos con el mensaje genérico
        }
        throw new Error(mensaje);
    }

    // 204 No Content no tiene body que parsear
    if (response.status === 204) {
        return undefined as T;
    }

    return response.json();
}

export { BASE_URL };