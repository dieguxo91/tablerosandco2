package proyecto.tablerosandco2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto.tablerosandco2.domain.Partida;

@Repository
public interface PartidaRepository extends JpaRepository<Partida, Long> {
}
