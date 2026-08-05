package prueba.sistemaFacturacion.persistence.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table (name = "Producto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Producto {

    @Column (name = "id_producto")
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String nombre;


    @Column(nullable = false)
    private String descripcion;

    @Column(name = "precio_unitario", nullable = false)
    private String precioUnitario;


    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    private Boolean activo;
}


