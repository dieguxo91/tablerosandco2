package proyecto.tablerosandco2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto.tablerosandco2.domain.Juego;
import proyecto.tablerosandco2.domain.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
