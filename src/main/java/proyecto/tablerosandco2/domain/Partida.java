package proyecto.tablerosandco2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_partida;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_juego",nullable = false)
    private Juego id_juego_partida ;

    @ManyToOne()
    @JoinColumn(name = "id_jugador",nullable = false)
    private Usuario id_jugador_partida ;






}
