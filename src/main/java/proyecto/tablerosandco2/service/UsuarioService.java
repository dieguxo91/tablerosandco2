package proyecto.tablerosandco2.service;

import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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
        log.debug(usuario.toString());
        return usuario;
    }

    public Usuario replace(Long id, Usuario usuario) {
        usuario.setId_user(id);

        if (!this.usuarioRepository.existsById(id)) {
            throw new UsuarioNotFoundException(id);
        }
        this.usuarioRepository.save(usuario);
        return usuario;
    }

    public void delete(Long id) {
        this.usuarioRepository.findById(id).map(p -> {this.usuarioRepository.delete(p);
                    return p;})
                .orElseThrow(() -> new UsuarioNotFoundException(id));
    }
}
