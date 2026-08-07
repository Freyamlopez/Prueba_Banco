package prueba.sistemaFacturacion.service.DTO.response;

import lombok.*;
import prueba.sistemaFacturacion.persistence.entity.Rol;

public record UsuarioResponse(
        Long id,
        String nombre,
        String correo,
        String rol
) {}