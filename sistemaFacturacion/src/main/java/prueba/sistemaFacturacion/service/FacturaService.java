package prueba.sistemaFacturacion.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import prueba.sistemaFacturacion.persistence.repository.FacturaRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

    @Service
    @RequiredArgsConstructor
    @Transactional
    public class FacturaService {

        private final FacturaRepository facturaRepository;
        private final VehiculoRepository vehiculoRepository;
        private final RepuestoRepository repuestoRepository;
        private final OrdenRepuestoRepository ordenRepuestoRepository;
        private final OrdenTrabajoMapper ordenTrabajoMapper;
        private final OrdenRepuestoMapper ordenRepuestoMapper;


        public OrdenTrabajoResponseDTO crearOrden(OrdenTrabajoRequestDTO dto) {

            Vehiculo vehiculo = vehiculoRepository.findById(dto.getVehiculoId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Vehículo no encontrado."));

            if (vehiculo.getEstado() == EstadoVehiculo.INACTIVO) {
                throw new BusinessException(
                        "No se puede crear una orden para un vehículo inactivo.");
            }

            OrdenTrabajo orden = ordenTrabajoMapper.toEntity(dto);

            orden.setVehiculo(vehiculo);
            orden.setFechaIngreso(LocalDateTime.now());
            orden.setEstado(EstadoOrden.PENDIENTE);
            orden.setTotal(BigDecimal.ZERO);

            facturaRepository.save(orden);

            return convertirResponse(orden);
        }


        public OrdenTrabajoResponseDTO asignarRepuestos(
                Long ordenId,
                List<OrdenRepuestoRequestDTO> repuestosDto) {

            OrdenTrabajo orden = facturaRepository.findById(ordenId)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Orden no encontrada."));

            BigDecimal total = orden.getTotal();

            for (OrdenRepuestoRequestDTO dto : repuestosDto) {

                Repuesto repuesto = repuestoRepository.findById(dto.getRepuestoId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Repuesto no encontrado."));

                if (repuesto.getStock() < dto.getCantidad()) {
                    throw new BusinessException(
                            "Stock insuficiente para el repuesto: "
                                    + repuesto.getNombre());
                }

                BigDecimal subtotal = repuesto.getPrecioUnitario()
                        .multiply(BigDecimal.valueOf(dto.getCantidad()));

                OrdenRepuesto detalle = OrdenRepuesto.builder()
                        .ordenTrabajo(orden)
                        .repuesto(repuesto)
                        .cantidad(dto.getCantidad())
                        .subtotal(subtotal)
                        .build();

                ordenRepuestoRepository.save(detalle);

                repuesto.setStock(repuesto.getStock() - dto.getCantidad());
                repuestoRepository.save(repuesto);

                total = total.add(subtotal);
            }

            orden.setTotal(total);

            facturaRepository.save(orden);

            return convertirResponse(orden);
        }


        @Transactional(readOnly = true)
        public List<OrdenTrabajoResponseDTO> listar(
                EstadoOrden estado,
                Long clienteId) {

            return facturaRepository.buscarOrdenes(estado, clienteId)
                    .stream()
                    .map(this::convertirResponse)
                    .toList();
        }


        @Transactional(readOnly = true)
        public OrdenTrabajoResponseDTO obtenerDetalle(Long id) {

            OrdenTrabajo orden = facturaRepository.findById(id)
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Orden no encontrada."));

            return convertirResponse(orden);
        }

        private OrdenTrabajoResponseDTO convertirResponse(OrdenTrabajo orden) {

            OrdenTrabajoResponseDTO response = ordenTrabajoMapper.toResponse(orden);

            List<OrdenRepuestoResponseDTO> detalles =
                    ordenRepuestoRepository.findByOrdenTrabajoId(orden.getId())
                            .stream()
                            .map(ordenRepuestoMapper::toResponse)
                            .toList();

            response.setRepuestos(detalles);

            return response;
        }

    }


