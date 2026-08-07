package prueba.sistemaFacturacion.service.DTO.response;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteResponse {
    
    private Long id;
    private String nombre;
    private String identificacion;
    private String telefono;
    private String direccion;
    
}