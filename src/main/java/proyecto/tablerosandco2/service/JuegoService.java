package proyecto.tablerosandco2.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import proyecto.tablerosandco2.domain.Juego;
import proyecto.tablerosandco2.exception.JuegoNotFoundException;
import proyecto.tablerosandco2.repository.JuegoRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JuegoService {
    private final JuegoRepository juegoRepository;

    public JuegoService(JuegoRepository juegoRepository) {
        this.juegoRepository = juegoRepository;
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

    public Juego replace(Long id, Juego juego) {

        return this.juegoRepository.findById(id).map( p -> (id.equals(juego.getId_juego())  ?
                        this.juegoRepository.save(juego) : null))
                .orElseThrow(() -> new JuegoNotFoundException(id));

    }

    public void delete(Long id) {
        this.juegoRepository.findById(id).map(p -> {this.juegoRepository.delete(p);
                    return p;})
                .orElseThrow(() -> new JuegoNotFoundException(id));
    }
}
