export interface Cliente {
    id: number;
    nombre: string;
    identificacion: string;
    telefono: string;
    correo: string;
    direccion: string;
}

export interface ClienteRequest {
    usuario: string;
    identificacion: string;
    telefono: string;
    direccion: string;
}