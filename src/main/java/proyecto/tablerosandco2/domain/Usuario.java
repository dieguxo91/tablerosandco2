package proyecto.tablerosandco2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "apodo"),
                @UniqueConstraint(columnNames = "email")
        })
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;

    @NotBlank
    @Size(max = 30)
    private String name;

    @NotBlank
    @Size(max = 50)
    private String apellidos;

    @NotBlank
    @Size(max = 9)// por ahora solo números nacionales
    private String telefono;

    @NotBlank
    @Size(max = 50)
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @NotBlank
    @Size(max = 30)
    private String apodo;

    @OneToMany(mappedBy = "id_admin")
    @JsonIgnore
    @ToString.Exclude
    private List<Juego> usuarioJuegos;

    @OneToMany(mappedBy = "id_jugador_partida")
    @JsonIgnore
    @ToString.Exclude
    private List<Partida> id_jugador_partida;

}
