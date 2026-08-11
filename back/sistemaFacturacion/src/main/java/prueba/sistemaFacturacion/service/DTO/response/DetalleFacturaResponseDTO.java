package prueba.sistemaFacturacion.service.DTO.response;

import java.math.BigDecimal;

public record DetalleFacturaResponseDTO(
        Long id,
        Long productoId,
        String productoNombre,
        Integer cantidad,
        BigDecimal precioUnitario,
        BigDecimal subtotal
) {}
