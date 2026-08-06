package prueba.sistemaFacturacion.service.DTO.request;

import lombok.*;
import prueba.sistemaFacturacion.persistence.entity.Usuario;
import prueba.sistemaFacturacion.persistence.entity.Rol;

@Data
public class UsuarioRequest {
    
    private String nombre;
    private String correo;
    private String contrasena;
    private Rol rol;

    public Usuario toEntity() {
        Usuario usuario = new Usuario();
        usuario.setNombre(this.nombre);
        usuario.setCorreo(this.correo);
        usuario.setContrasena(this.contrasena);
        usuario.setRol(this.rol);
        return usuario;
    }
}