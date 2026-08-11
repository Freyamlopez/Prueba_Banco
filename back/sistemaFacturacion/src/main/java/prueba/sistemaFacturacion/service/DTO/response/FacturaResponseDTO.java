package prueba.sistemaFacturacion.service.DTO.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record FacturaResponseDTO(
        Long id,
        String numeroFactura,
        Long clienteId,
        String clienteIdentificacion,
        Long cajeroId,
        String cajeroNombre,
        LocalDate fechaEmision,
        BigDecimal subtotal,
        BigDecimal impuesto,
        BigDecimal total,
        String estado,
        List<DetalleFacturaResponseDTO> detalles
) {}