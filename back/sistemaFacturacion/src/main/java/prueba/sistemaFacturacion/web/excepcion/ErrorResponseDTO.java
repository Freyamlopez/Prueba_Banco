package prueba.sistemaFacturacion.web.excepcion;

import java.time.LocalDateTime;
import java.util.List;

public record ErrorResponseDTO(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        List<String> detalles
) {
    public ErrorResponseDTO(int status, String error, String message) {
        this(LocalDateTime.now(), status, error, message, null);
    }

    public ErrorResponseDTO(int status, String error, String message, List<String> detalles) {
        this(LocalDateTime.now(), status, error, message, detalles);
    }
}