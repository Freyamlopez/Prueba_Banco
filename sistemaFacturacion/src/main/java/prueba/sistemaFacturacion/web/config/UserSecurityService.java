package prueba.sistemaFacturacion.web.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import prueba.sistemaFacturacion.persistence.entity.Usuario;
import prueba.sistemaFacturacion.persistence.repository.UsuarioRepository;
import prueba.sistemaFacturacion.web.excepcion.ResourceNotFoundException;

@Service
public class UserSecurityService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con correo: " + correo));

        // Formatea el rol para Spring Security (ej. ROLE_ADMIN, ROLE_CAJERO, ROLE_CLIENTE)
        String role = usuario.getRol().getNombre();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }

        return User.builder()
                .username(usuario.getCorreo())
                .password(usuario.getContrasena())
                .roles(role.replace("ROLE_", ""))
                .build();
    }
}