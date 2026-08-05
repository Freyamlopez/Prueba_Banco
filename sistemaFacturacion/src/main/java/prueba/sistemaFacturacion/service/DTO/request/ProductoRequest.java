package prueba.sistemaFacturacion.service.DTO.request;

import jakarta.validation.constraints.*;

public class ProductoRequest {

    @NotBlank
    @Size(max = 100)
    private String nombre;

    @NotBlank
    @Size(max = 100)
    private String descripcion;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private Double precioUnitario;

    @NotNull
    @Min(value = 0)
    private Integer stock;

    @NotNull
    private boolean activo;

}
