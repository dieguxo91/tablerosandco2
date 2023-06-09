package proyecto.tablerosandco2.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "cartas")
@Entity
public class Carta {
    @Id
    private String nombre;
    @NotBlank
    private String url;
    @NotBlank
    private  String reverso;
    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean seleccionado;
    @Column(nullable = true, columnDefinition = "INT")
    private Integer numeroDescarte;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_juego_carta",nullable = false)
    private Juego id_juego_carta ;

}
