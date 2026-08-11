package prueba.sistemaFacturacion.web.config;


import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import prueba.sistemaFacturacion.persistence.entity.Usuario;
import prueba.sistemaFacturacion.persistence.repository.UsuarioRepository;

@Service
@RequiredArgsConstructor
public class UserSecurityService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con correo: " + correo));

        String role = usuario.getRol().getNombre();

        return User.builder()
                .username(usuario.getCorreo())
                .password(usuario.getContrasena())
                .roles(role) // Spring antepone "ROLE_" automáticamente
                .build();
    }
}