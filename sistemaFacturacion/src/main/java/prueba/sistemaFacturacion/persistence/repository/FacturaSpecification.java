package prueba.sistemaFacturacion.persistence.repository;

import org.springframework.data.jpa.domain.Specification;
import prueba.sistemaFacturacion.persistence.entity.EstadoFactura;
import prueba.sistemaFacturacion.persistence.entity.Factura;

import java.time.LocalDate;

public class FacturaSpecification {

    public static Specification<Factura> conEstado(EstadoFactura estado) {
        return (root, query, cb) -> estado == null ? null : cb.equal(root.get("estado"), estado);
    }

    public static Specification<Factura> conNumeroFactura(String numeroFactura) {
        return (root, query, cb) -> (numeroFactura == null || numeroFactura.isBlank())
                ? null
                : cb.like(cb.lower(root.get("numeroFactura")), "%" + numeroFactura.toLowerCase() + "%");
    }

    public static Specification<Factura> conRangoFechas(LocalDate inicio, LocalDate fin) {
        return (root, query, cb) -> {
            if (inicio != null && fin != null) {
                return cb.between(root.get("fechaEmision"), inicio, fin);
            } else if (inicio != null) {
                return cb.greaterThanOrEqualTo(root.get("fechaEmision"), inicio);
            } else if (fin != null) {
                return cb.lessThanOrEqualTo(root.get("fechaEmision"), fin);
            }
            return null;
        };
    }
}