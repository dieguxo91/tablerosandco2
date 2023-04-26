package proyecto.tablerosandco2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import proyecto.tablerosandco2.domain.Carta;


public interface CartasRepository extends JpaRepository<Carta, String> {
}
