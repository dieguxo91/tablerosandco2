package proyecto.tablerosandco2.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import proyecto.tablerosandco2.domain.ERol;
import proyecto.tablerosandco2.domain.Rol;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository <Rol, Long> {
    Optional<Rol> findByRol(ERol rol);
}
