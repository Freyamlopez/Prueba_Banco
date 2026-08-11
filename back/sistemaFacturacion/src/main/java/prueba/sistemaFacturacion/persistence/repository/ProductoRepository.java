package prueba.sistemaFacturacion.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prueba.sistemaFacturacion.persistence.entity.Producto;

public interface ProductoRepository extends JpaRepository <Producto, Long> {
}
