package prueba.sistemaFacturacion.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prueba.sistemaFacturacion.persistence.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
}