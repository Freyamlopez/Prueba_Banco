package prueba.sistemaFacturacion.service.DTO.request;

import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ClienteRequest {

    @NotBlank(message = "El usuario es obligatorio.")
    @Size(max = 100)
    private String usuario;

    @NotBlank(message = "La identificación es obligatoria.")
    @Length(min = 10, max = 10, message = "La identificación debe tener exactamente 10 dígitos.")
    @Pattern(regexp = "\\d+", message = "La identificación debe contener solo números.")
    private String identificacion;

    @NotBlank(message = "El teléfono es obligatorio.")
    @Length(min = 10, max = 10, message = "El teléfono debe tener exactamente 10 dígitos.")
    @Pattern(regexp = "\\d+", message = "El teléfono debe contener solo números.")
    private String telefono;
    
    @NotBlank(message = "La dirección es obligatoria.")
    @Size(max = 200)
    private String direccion;
}