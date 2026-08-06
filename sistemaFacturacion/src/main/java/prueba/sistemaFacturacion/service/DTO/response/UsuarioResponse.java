package prueba.sistemaFacturacion.service.DTO.response;

import lombok.*;

@Data
public class UsuarioResponse {
    
    private Long id;
    private String nombre;
    private String email;
    private Rol rol;
}
