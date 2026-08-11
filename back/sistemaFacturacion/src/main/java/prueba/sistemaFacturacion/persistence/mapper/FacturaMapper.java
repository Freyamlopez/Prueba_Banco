package prueba.sistemaFacturacion.persistence.mapper;

import org.springframework.stereotype.Component;
import prueba.sistemaFacturacion.persistence.entity.DetalleFactura;
import prueba.sistemaFacturacion.persistence.entity.Factura;
import prueba.sistemaFacturacion.service.DTO.response.DetalleFacturaResponseDTO;
import prueba.sistemaFacturacion.service.DTO.response.FacturaResponseDTO;

import java.util.List;

@Component
public class FacturaMapper {

    public FacturaResponseDTO toResponseDTO(Factura factura) {
        List<DetalleFacturaResponseDTO> detallesDTO = factura.getDetalles().stream()
                .map(this::toDetalleResponseDTO)
                .toList();

        return new FacturaResponseDTO(
                factura.getId(),
                factura.getNumeroFactura(),
                factura.getCliente().getId(),
                factura.getCliente().getIdentificacion(),
                factura.getCajero().getId(),
                factura.getCajero().getNombre(),
                factura.getFechaEmision(),
                factura.getSubtotal(),
                factura.getImpuesto(),
                factura.getTotal(),
                factura.getEstado().name(),
                detallesDTO
        );
    }

    public DetalleFacturaResponseDTO toDetalleResponseDTO(DetalleFactura detalle) {
        return new DetalleFacturaResponseDTO(
                detalle.getId(),
                detalle.getProducto().getId(),
                detalle.getProducto().getNombre(),
                detalle.getCantidad(),
                detalle.getPrecioUnitario(),
                detalle.getSubtotal()
        );
    }
}