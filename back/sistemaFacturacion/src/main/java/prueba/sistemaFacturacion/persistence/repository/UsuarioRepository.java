package prueba.sistemaFacturacion.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prueba.sistemaFacturacion.persistence.entity.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByCorreo(String correo);

    boolean existsByCorreo(String correo);
}
