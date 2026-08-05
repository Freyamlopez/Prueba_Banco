package prueba.sistemaFacturacion.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import prueba.sistemaFacturacion.persistence.enttity.EstadoFactura;
import prueba.sistemaFacturacion.persistence.enttity.Factura;

import java.util.List;
import java.util.Optional;

public interface FacturaRepository extends JpaRepository<Factura, Long> {

    Optional<Factura> findByNumeroFactura(Long numeroFactura);

    @Query("""
            SELECT o
            FROM Factura o
            WHERE (:estado IS NULL OR o.estado = :estado)
            ORDER BY o.fechaEmision DESC
            """)
    List<Factura> buscarOrdenes(
            @Param("estado") EstadoFactura estado,
            @Param("clienteId") Long clienteId);
}
