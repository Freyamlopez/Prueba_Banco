package prueba.sistemaFacturacion.service.DTO.request;

import lombok.*;
import prueba.sistemaFacturacion.persistence.entity.Usuario;
import prueba.sistemaFacturacion.persistence.entity.Rol;

@Data
public class UsuarioRequest {
    
    private String nombre;
    private String email;
    private String contrasena;
    private Rol rol;

    public Usuario toEntity() {
        Usuario usuario = new Usuario();
        usuario.setNombre(this.nombre);
        usuario.setEmail(this.email);
        usuario.setContrasena(this.contrasena);
        usuario.setRol(this.rol);
        return usuario;
    }
}