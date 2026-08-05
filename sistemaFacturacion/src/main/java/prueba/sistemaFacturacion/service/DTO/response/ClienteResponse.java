package prueba.sistemaFacturacion.service.DTO.response;

import lombok.*;

@Data
public class ClienteResponse {
    
    private Long id;
    private String nombre;
    private String identificacion;
    private String telefono;
    private String direccion;
    
}