package prueba.sistemaFacturacion.service.DTO.response;

public record AuthResponseDTO(
        String token,
        String correo,
        String rol
) {}