package prueba.sistemaFacturacion.service.DTO.request;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoRequest {

    @NotBlank(message = "El nombre es obligatorio.")
    @Size(max= 25, message = "Los nombres no pueden pasarse de 25 digitos")
    private String nombre;


    @NotBlank(message = "La descripcion es obligatorio.")
    @Size(max= 35, message = "La descripcion no puede pasarse de 35 digitos")
    private String descripcion;



    @NotNull(message = "El precio del producto no puede ir nulo.")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a cero.")
    @Digits(integer = 8, fraction = 2, message = "El precio debe tener máximo 8 enteros y 2 decimales.")
    private BigDecimal precioUnitario;

    @NotNull(message = "El stock no puede ir  null")
    @Min(value = 1, message = "La cantidad debe ser mayor a cero")
    private Integer stock;


    @NotNull(message = "El estado es obligatorio")
    private Boolean activo;


}
