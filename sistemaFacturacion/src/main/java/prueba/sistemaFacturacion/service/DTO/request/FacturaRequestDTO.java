package prueba.sistemaFacturacion.service.DTO.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record FacturaRequestDTO(

        @NotNull(message = "El id del cliente es obligatorio")
        Long clienteId,

        @NotEmpty(message = "La factura debe tener al menos un detalle")
        List<@Valid DetalleFacturaRequestDTO> detalles
) {}