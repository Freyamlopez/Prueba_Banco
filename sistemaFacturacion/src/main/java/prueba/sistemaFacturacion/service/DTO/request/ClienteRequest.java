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

    @NotBlank(message = "El nombre es obligatorio.")
    @Size(max = 100)
    private String nombre;

    @NotBlank(message = "El rol es obligatorio.")
    @Size(max = 100)
    private String rol;

    @NotBlank(message = "La identificación es obligatoria.")
    @Size(max = 20)     
    private String identificacion;

    @NotBlank(message = "El teléfono es obligatorio.")
    @Size(max = 10)
    private String telefono;
    
    @NotBlank(message = "La dirección es obligatoria.")
    @Size(max = 200)
    private String direccion;
}