package prueba.sistemaFacturacion.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prueba.sistemaFacturacion.persistence.entity.Cliente;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByIdentificacion(String identificacion);
    Optional<Cliente> findByUsuarioCorreo(String correo);
}
