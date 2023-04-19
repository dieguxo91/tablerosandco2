package proyecto.tablerosandco2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto.tablerosandco2.domain.Juego;

@Repository
public interface JuegoRepository extends JpaRepository<Juego, Long> {
}
