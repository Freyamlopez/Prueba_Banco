package prueba.sistemaFacturacion.persistence.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Table(name = "cliente")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_nombre", nullable = true)
    private Usuario usuario;

    @Column(name = "identificacion", unique = true, nullable = false, length = 10, updatable = false)
    private String identificacion;

    @Column(name = "telefono")
    private String telefono;

    @Column(name = "direccion")
    private String direccion;
}
