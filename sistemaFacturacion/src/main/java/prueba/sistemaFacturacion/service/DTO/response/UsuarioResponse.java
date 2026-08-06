package prueba.sistemaFacturacion.service.DTO.response;

import lombok.*;
import prueba.sistemaFacturacion.persistence.entity.Rol;

@Data
public class UsuarioResponse {
    
    private Long id;
    private String nombre;
    private String email;
    private Rol rol;
}
