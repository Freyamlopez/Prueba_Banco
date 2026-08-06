package prueba.sistemaFacturacion.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Table(name = "clientes")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @Column(name = "identificacion",unique = true)
    private String identificacion;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "direccion")
    private String direccion;

}
