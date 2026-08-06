package prueba.sistemaFacturacion.service.DTO.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RegisterDto {
     private String nombre;
     private String correo;
     private String password;
     private Long rolId;

}
