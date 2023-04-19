package proyecto.tablerosandco2.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import proyecto.tablerosandco2.domain.Usuario;

import proyecto.tablerosandco2.exception.UsuarioNotFoundException;
import proyecto.tablerosandco2.repository.UsuarioRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> all() {
        return this.usuarioRepository.findAll();
    }

    public Map<String, Object> all(int pagina, int tamanio) {

        Pageable paginado = PageRequest.of(pagina, tamanio, Sort.by("id_juego").ascending());

        Page<Usuario> pageAll = this.usuarioRepository.findAll(paginado);

        Map<String, Object> response = new HashMap<>();

        response.put("usuarios", pageAll.getContent());
        response.put("currentPage", pageAll.getNumber());
        response.put("totalItems", pageAll.getTotalElements());
        response.put("totalPages", pageAll.getTotalPages());

        return response;
    }

    public Usuario save(Usuario usuario) {

        return this.usuarioRepository.save(usuario);
    }

    public Usuario one(Long id) {
        Usuario usuario = this.usuarioRepository.findById(id)
                .orElseThrow(() -> new UsuarioNotFoundException(id));
        System.out.println(usuario);
        return usuario;
    }

    public Usuario replace(Long id, Usuario usuario) {

        return this.usuarioRepository.findById(id).map( p -> (id.equals(usuario.getId_user())  ?
                        this.usuarioRepository.save(usuario) : null))
                .orElseThrow(() -> new UsuarioNotFoundException(id));

    }

    public void delete(Long id) {
        this.usuarioRepository.findById(id).map(p -> {this.usuarioRepository.delete(p);
                    return p;})
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }
}
