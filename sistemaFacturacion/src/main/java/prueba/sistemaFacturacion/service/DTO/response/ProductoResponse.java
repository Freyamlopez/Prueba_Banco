package prueba.sistemaFacturacion.service.DTO.response;

import lombok.*;

@Data
public class ProductoResponse {

    private Long id;
    private String nombre;
    private String descripcion;
    private Double precioUnitario;
    private Integer stock;
    private boolean activo;

}