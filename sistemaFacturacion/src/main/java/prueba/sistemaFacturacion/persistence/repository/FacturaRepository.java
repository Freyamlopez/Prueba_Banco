package prueba.sistemaFacturacion.persistence.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import prueba.sistemaFacturacion.persistence.entity.Factura;

import java.time.LocalDate;

public interface FacturaRepository extends JpaRepository<Factura, Long> , JpaSpecificationExecutor<Factura> {

    // Para encontrar facturas por cliente/{idCliente}
    Page<Factura> findByClienteId(Long idCliente, Pageable pageable);

    //  Para encontrar facturas por cajero/{idCajero}
    Page<Factura> findByCajeroId(Long idCajero, Pageable pageable);

    // Para validar numeroFactura al generar uno nuevo
    boolean existsByNumeroFactura(String numeroFactura);

    // Filtro opcional por rango de fechas
    Page<Factura> findByFechaEmisionBetween(LocalDate fechaInicio, LocalDate fechaFin, Pageable pageable);
}
