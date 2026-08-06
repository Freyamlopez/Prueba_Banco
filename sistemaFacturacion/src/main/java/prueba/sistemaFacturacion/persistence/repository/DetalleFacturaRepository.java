package prueba.sistemaFacturacion.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import prueba.sistemaFacturacion.persistence.entity.DetalleFactura;

import java.time.LocalDate;
import java.util.List;

public interface DetalleFacturaRepository extends JpaRepository<DetalleFactura, Long> {

    List<DetalleFactura> findByFacturaId(Long idFactura);

    // Top 5 productos más vendidos en un rango de fechas (punto extra del spec)
    @Query("""
        SELECT d.producto.id, d.producto.nombre, SUM(d.cantidad) as totalVendido
        FROM DetalleFactura d
        WHERE d.factura.estado <> 'ANULADA'
          AND d.factura.fechaEmision BETWEEN :inicio AND :fin
        GROUP BY d.producto.id, d.producto.nombre
        ORDER BY totalVendido DESC
        """)
    List<Object[]> findTopProductosVendidos(@Param("inicio") LocalDate inicio, @Param("fin") LocalDate fin);
}