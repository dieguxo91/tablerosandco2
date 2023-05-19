package proyecto.tablerosandco2.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@EqualsAndHashCode(of = "id_juego")
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_juego;

    @NotBlank
    @Size(max = 50)
    private String name;

    @NotBlank
    @Size(max = 500)
    private String Description;

    @NotBlank
    @Size(max = 100)
    private String url;

    @NotBlank
    @Size(max = 100)
    private String urlHexa;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_admin",nullable = false)
    private Usuario id_admin ;

    @OneToMany(mappedBy = "id_juego_partida")
    @JsonIgnore
    @ToString.Exclude
    private List<Partida> id_juego_partida;

    @OneToMany(mappedBy = "id_juego_carta")
    @JsonIgnore
    @ToString.Exclude
    private List<Carta> juegosCartas;
}
