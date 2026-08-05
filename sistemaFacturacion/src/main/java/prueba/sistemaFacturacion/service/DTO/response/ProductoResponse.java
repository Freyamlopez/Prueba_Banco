package prueba.sistemaFacturacion.service.DTO.response; 

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductoResponse {

    private Long id;
    private String nombre;
    private Double precioUnitario;
    private String descripcion;
    private Boolean activo;
    private Integer stock;

}