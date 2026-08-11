package prueba.sistemaFacturacion.service.DTO.response;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RegisterDto {
     @NotBlank(message = "El nombre es obligatorio")
     private String nombre;

     @NotBlank(message = "El correo es obligatorio")
     @Email(message = "El correo no tiene un formato válido")
     private String correo;

     @NotBlank(message = "La contraseña es obligatoria")
     @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
     private String password;

     @NotNull(message = "El rol es obligatorio")
     private Long rolId;

}
