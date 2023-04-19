package proyecto.tablerosandco2.domain;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
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

    @ManyToOne()
    @JoinColumn(name = "id",nullable = false)
    private Usuario id_admin ;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "partida",
            joinColumns = @JoinColumn(name = "id_juego", referencedColumnName = "id_juego"),
            inverseJoinColumns = @JoinColumn(name = "id_user", referencedColumnName = "id_user"))
    Set<Usuario> usuarios;

}
