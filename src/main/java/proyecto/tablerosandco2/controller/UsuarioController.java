package proyecto.tablerosandco2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import proyecto.tablerosandco2.domain.Usuario;
import proyecto.tablerosandco2.service.UsuarioService;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/usuario/")
public class UsuarioController {
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping(value = {"","/"}, params={"!pagina", "!tamanio"})
    public List<Usuario> all() {
        log.info("Accediendo a todas los usuarios");
        return this.usuarioService.all();
    }

    @GetMapping(value = {"","/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pagina", defaultValue = "0") int pagina
            , @RequestParam(value = "tamanio", defaultValue = "3") int tamanio) {

        log.info("Accediendo a todos los usuarios con paginación");

        Map<String, Object> responseAll = this.usuarioService.all(pagina, tamanio);

        return ResponseEntity.ok(responseAll);
    }
/*
    //@Secured("ROL_ADMIN")
    // @PostMapping({"","/"})
    public Usuario newUsuario(@RequestBody Usuario usuario) {
        return this.usuarioService.save(usuario);
    }*/

    @GetMapping("/{id_user}")
    public Usuario one(@PathVariable("id_user") Long id) {
        return this.usuarioService.one(id);
    }

    @PutMapping("/{id_user}")
    public Usuario replaceUsuario(@PathVariable("id_user") Long id, @RequestBody Usuario usuario) {
        return this.usuarioService.replace(id, usuario);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id_user}")
    public void deleteUsuario(@PathVariable("id_user") Long id) {
        this.usuarioService.delete(id);
    }

}
