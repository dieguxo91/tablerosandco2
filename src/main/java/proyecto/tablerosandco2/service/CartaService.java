package proyecto.tablerosandco2.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import proyecto.tablerosandco2.domain.Carta;
import proyecto.tablerosandco2.exception.CartaNotFoundException;
import proyecto.tablerosandco2.repository.CartasRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Service
public class CartaService {
    private final CartasRepository cartasRepository;

    public CartaService(CartasRepository cartasRepository) {
        this.cartasRepository = cartasRepository;
    }

    public List<Carta> all() {
        return this.cartasRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {

        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("nombre").ascending());

        Page<Carta> pageAll = this.cartasRepository.findAll(paginado);

        Map<String, Object> response = new HashMap<>();

        response.put("juegos", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public Carta save(Carta juego) {

        return this.cartasRepository.save(juego);
    }

    public Carta one(String nombre) {
        Carta carta = this.cartasRepository.findById(nombre)
                .orElseThrow(() -> new CartaNotFoundException(nombre));
        System.out.println(carta);
        return carta;
    }

    public Carta replace(String nombre, Carta carta) {

        return this.cartasRepository.findById(nombre).map( p -> (nombre.equals(carta.getNombre())  ?
                        this.cartasRepository.save(carta) : null))
                .orElseThrow(() -> new CartaNotFoundException(nombre));

    }

    public void delete(String nombre) {
        this.cartasRepository.findById(nombre).map(p -> {this.cartasRepository.delete(p);
                    return p;})
                .orElseThrow(() -> new CartaNotFoundException(nombre));
    }
}
