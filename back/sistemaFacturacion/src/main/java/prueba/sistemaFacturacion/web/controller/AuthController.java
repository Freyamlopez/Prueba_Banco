package prueba.sistemaFacturacion.web.controller;


import org.springframework.security.core.userdetails.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import prueba.sistemaFacturacion.persistence.entity.Rol;
import prueba.sistemaFacturacion.persistence.entity.Usuario;
import prueba.sistemaFacturacion.persistence.mapper.UsuarioMapper;
import prueba.sistemaFacturacion.persistence.repository.RolRepository;
import prueba.sistemaFacturacion.persistence.repository.UsuarioRepository;
import prueba.sistemaFacturacion.service.DTO.response.AuthResponseDTO;
import prueba.sistemaFacturacion.service.DTO.response.LoginDto;
import prueba.sistemaFacturacion.service.DTO.response.RegisterDto;
import prueba.sistemaFacturacion.service.DTO.response.UsuarioResponse;
import prueba.sistemaFacturacion.web.config.JWTUtil;
import prueba.sistemaFacturacion.web.excepcion.RecursoDuplicadoException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final UsuarioMapper usuarioMapper;

    @PostMapping("/register")
    public ResponseEntity<UsuarioResponse> register(@Valid @RequestBody RegisterDto request) {

        if (usuarioRepository.existsByCorreo(request.getCorreo())) {
            throw new RecursoDuplicadoException("Ya existe un usuario registrado con el correo: " + request.getCorreo());
        }

        Rol rol = rolRepository.findById(request.getRolId())
                .orElseThrow();

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setCorreo(request.getCorreo());
        usuario.setContrasena(passwordEncoder.encode(request.getPassword())); // hash seguro, nunca texto plano
        usuario.setRol(rol);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioMapper.toResponseDTO(usuarioGuardado));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken login =
                new UsernamePasswordAuthenticationToken(loginDto.getCorreo(), loginDto.getPassword());

        Authentication authentication = authenticationManager.authenticate(login);

        User userDetails = (User) authentication.getPrincipal();
        String role = userDetails.getAuthorities().iterator().next().getAuthority(); // ej: "ROLE_ADMIN"

        String jwt = jwtUtil.create(userDetails.getUsername(), role);

        AuthResponseDTO body = new AuthResponseDTO(jwt, userDetails.getUsername(), role);
        return ResponseEntity.ok(body);
    }
}