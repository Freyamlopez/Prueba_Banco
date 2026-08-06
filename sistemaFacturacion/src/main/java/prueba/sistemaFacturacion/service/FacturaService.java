package prueba.sistemaFacturacion.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import prueba.sistemaFacturacion.persistence.entity.*;
import prueba.sistemaFacturacion.persistence.mapper.FacturaMapper;
import prueba.sistemaFacturacion.persistence.repository.ClienteRepository;
import prueba.sistemaFacturacion.persistence.repository.FacturaRepository;
import prueba.sistemaFacturacion.persistence.repository.ProductoRepository;
import prueba.sistemaFacturacion.persistence.repository.UsuarioRepository;
import prueba.sistemaFacturacion.service.DTO.request.DetalleFacturaRequestDTO;
import prueba.sistemaFacturacion.service.DTO.request.FacturaRequestDTO;
import prueba.sistemaFacturacion.service.DTO.response.FacturaResponseDTO;
import prueba.sistemaFacturacion.web.excepcion.EstadoFacturaInvalidoException;
import prueba.sistemaFacturacion.web.excepcion.ResourceNotFoundException;
import prueba.sistemaFacturacion.web.excepcion.StockInsuficienteException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FacturaService   {

    private static final BigDecimal IVA = new BigDecimal("0.15");

    private final FacturaRepository facturaRepository;
    private final ClienteRepository clienteRepository;
    private final ProductoRepository productoRepository;
    private final UsuarioRepository usuarioRepository;
    private final FacturaMapper facturaMapper;


    @Transactional
    public FacturaResponseDTO crearFactura(FacturaRequestDTO request, String emailCajero) {

        Usuario cajero = usuarioRepository.findByEmail(emailCajero)
                .orElseThrow(() -> new ResourceNotFoundException("Cajero no encontrado"));

        Cliente cliente = clienteRepository.findById(request.clienteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cliente no encontrado con id: " + request.clienteId()));

        Factura factura = new Factura();
        factura.setCliente(cliente);
        factura.setCajero(cajero);
        factura.setNumeroFactura(generarNumeroFactura());
        factura.setFechaEmision(LocalDate.now());
        factura.setEstado(EstadoFactura.EMITIDA);

        List<DetalleFactura> detalles = new ArrayList<>();
        BigDecimal subtotalGlobal = BigDecimal.ZERO;

        for (DetalleFacturaRequestDTO item : request.detalles()) {

            Producto producto = productoRepository.findById(item.productoId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Producto no encontrado con id: " + item.productoId()));

            if (item.cantidad() > producto.getStock()) {
                throw new StockInsuficienteException(
                        "Stock insuficiente para el producto '" + producto.getNombre()
                                + "'. Disponible: " + producto.getStock()
                                + ", solicitado: " + item.cantidad());
            }

            BigDecimal precioVigente = producto.getPrecioUnitario();
            BigDecimal subtotalLinea = precioVigente.multiply(BigDecimal.valueOf(item.cantidad()));

            DetalleFactura detalle = new DetalleFactura();
            detalle.setFactura(factura);
            detalle.setProducto(producto);
            detalle.setCantidad(item.cantidad());
            detalle.setPrecioUnitario(precioVigente);
            detalle.setSubtotal(subtotalLinea);

            detalles.add(detalle);
            subtotalGlobal = subtotalGlobal.add(subtotalLinea);

            // Descuento automático de stock
            producto.setStock(producto.getStock() - item.cantidad());
            productoRepository.save(producto);
        }

        BigDecimal impuesto = subtotalGlobal.multiply(IVA);
        BigDecimal total = subtotalGlobal.add(impuesto);

        factura.setDetalles(detalles);
        factura.setSubtotal(subtotalGlobal);
        factura.setImpuesto(impuesto);
        factura.setTotal(total);

        Factura facturaGuardada = facturaRepository.save(factura); // cascade guarda los detalles

        return facturaMapper.toResponseDTO(facturaGuardada);
    }

    public Page<FacturaResponseDTO> obtenerPorCliente(Long idCliente, Pageable pageable) {
        return facturaRepository.findByClienteId(idCliente, pageable)
                .map(facturaMapper::toResponseDTO);
    }

    public Page<FacturaResponseDTO> obtenerPorCajero(Long idCajero, Pageable pageable) {
        return facturaRepository.findByCajeroId(idCajero, pageable)
                .map(facturaMapper::toResponseDTO);
    }


    @Transactional
    public FacturaResponseDTO anularFactura(Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Factura no encontrada con id: " + id));

        if (factura.getEstado() != EstadoFactura.EMITIDA) {
            throw new EstadoFacturaInvalidoException(
                    "Solo se pueden anular facturas en estado EMITIDA. Estado actual: " + factura.getEstado());
        }

        // Devolución de inventario
        for (DetalleFactura detalle : factura.getDetalles()) {
            Producto producto = detalle.getProducto();
            producto.setStock(producto.getStock() + detalle.getCantidad());
            productoRepository.save(producto);
        }

        factura.setEstado(EstadoFactura.ANULADA);
        Factura facturaActualizada = facturaRepository.save(factura);

        return facturaMapper.toResponseDTO(facturaActualizada);
    }

    @Transactional
    public FacturaResponseDTO registrarPago(Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Factura no encontrada con id: " + id));

        if (factura.getEstado() != EstadoFactura.EMITIDA) {
            throw new EstadoFacturaInvalidoException(
                    "Solo se pueden pagar facturas en estado EMITIDA. Estado actual: " + factura.getEstado());
        }

        factura.setEstado(EstadoFactura.PAGADA);
        Factura facturaActualizada = facturaRepository.save(factura);

        return facturaMapper.toResponseDTO(facturaActualizada);
    }

    private String generarNumeroFactura() {
        long siguiente = facturaRepository.count() + 1;
        return "FAC-" + String.format("%06d", siguiente);
    }

}