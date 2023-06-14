package proyecto.tablerosandco2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import proyecto.tablerosandco2.domain.Juego;
import proyecto.tablerosandco2.exception.JuegoNotFoundException;
import proyecto.tablerosandco2.exception.UsuarioNotFoundException;
import proyecto.tablerosandco2.repository.JuegoRepository;
import proyecto.tablerosandco2.repository.UsuarioRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JuegoService {
    private final JuegoRepository juegoRepository;

    private final UsuarioRepository usuarioRepository;
    public JuegoService(JuegoRepository juegoRepository , UsuarioRepository usuarioRepository) {
        this.juegoRepository = juegoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<Juego> all() {
        return this.juegoRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {

        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("id_juego").ascending());

        Page<Juego> pageAll = this.juegoRepository.findAll(paginado);

        Map<String, Object> response = new HashMap<>();

        response.put("juegos", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public Juego save(Juego juego) {

        return this.juegoRepository.save(juego);
    }

    public Juego one(Long id) {
        Juego juego = this.juegoRepository.findById(id)
                .orElseThrow(() -> new JuegoNotFoundException(id));
        System.out.println(juego);
        return juego;
    }
    public List<Juego> porNombre(String nombre){
        return this.juegoRepository.findAll()
                                    .stream()
                                    .filter(u-> u.getName() == nombre)
                                    .collect(Collectors.toList());
    }

    public Juego replace(Long id, Juego juego) {
        juego.setId_juego(id);

        if (!this.juegoRepository.existsById(id)) {
            throw new JuegoNotFoundException(id);
        }
        this.juegoRepository.save(juego);

        return juego;
    }

    public void delete(Long id) {
        this.juegoRepository.findById(id).map(p -> {this.juegoRepository.delete(p);
                    return p;})
                .orElseThrow(() -> new JuegoNotFoundException(id));
    }
}
