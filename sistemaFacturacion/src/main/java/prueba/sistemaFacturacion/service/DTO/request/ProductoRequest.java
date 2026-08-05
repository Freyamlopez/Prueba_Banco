package prueba.sistemaFacturacion.service.DTO.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProductoRequest {

    @NotBlank
    @Size(max = 100)
    private String nombre;

    @NotNull
    @Min(0)
    private Double precioUnitario;

    @NotBlank
    @Size(max = 255)    
    private String descripcion;

    @NotNull
    private Boolean activo;

    @NotNull
    @Min(0)
    private Integer stock;

}