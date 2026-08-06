package prueba.sistemaFacturacion.service.DTO.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteRequest {

    @NotBlank
    @Size(max = 100)
    private String nombre;

    @NotBlank
    @Size(max = 100)
    private String rol;

    @NotBlank
    @Size(max = 20)     
    private String identificacion;

    @NotBlank
    @Size(max = 15)
    private String telefono;
    
    @NotBlank
    @Size(max = 200)    
    private String direccion;
}