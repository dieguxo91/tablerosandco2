package proyecto.tablerosandco2.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import proyecto.tablerosandco2.domain.ERol;
import proyecto.tablerosandco2.domain.Rol;
import proyecto.tablerosandco2.domain.Usuario;

import proyecto.tablerosandco2.exception.UsuarioNotFoundException;
import proyecto.tablerosandco2.repository.RolRepository;
import proyecto.tablerosandco2.repository.UsuarioRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    @Autowired
    PasswordEncoder encoder;

    public UsuarioService(UsuarioRepository usuarioRepository,RolRepository rolRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
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

    public List<Usuario> admin(){
        Rol rol = rolRepository.findByRol(ERol.ROL_ADMIN).get();

        List<Usuario> administadores = this.usuarioRepository.findAll()
                                                            .stream()
                                                            .filter(u -> u.getRoles().contains(rol))
                                                            .collect(Collectors.toList());
        return administadores;
    }

    public Usuario replace(Long id, Usuario usuario) {
        String key = this.usuarioRepository.findById(id).get().getPassword();
        usuario.setId_user(id);

        if (!this.usuarioRepository.existsById(id)) {
            throw new UsuarioNotFoundException(id);
        }
        if(usuario.getPassword() != key){
            System.out.println("Hola");
            usuario.setPassword(encoder.encode(usuario.getPassword()));
        }else{
            System.out.println("Hola2");
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
