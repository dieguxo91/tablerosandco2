package proyecto.tablerosandco2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import proyecto.tablerosandco2.domain.Juego;
import proyecto.tablerosandco2.service.JuegoService;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/juego/")
public class JuegoController {
    private final JuegoService juegoService;

    public JuegoController(JuegoService juegoService) {
        this.juegoService = juegoService;
    }

    @GetMapping(value = {"","/"}, params={"!pagina", "!tamanio"})
    public List<Juego> all() {
        log.info("Accediendo a todas los juegos");
        return this.juegoService.all();
    }

    @GetMapping(value = {"","/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pagina", defaultValue = "0") int pagina
            , @RequestParam(value = "tamanio", defaultValue = "3") int tamanio) {

        log.info("Accediendo a todos los juegos con paginación");

        Map<String, Object> responseAll = this.juegoService.all(pagina, tamanio);

        return ResponseEntity.ok(responseAll);
    }


    @PostMapping({"","/"})
    public Juego newJuego(@RequestBody Juego juego) {
        return this.juegoService.save(juego);
    }

    @GetMapping("/{id_juego}")
    public Juego one(@PathVariable("id_juego") Long id) {
        return this.juegoService.one(id);
    }

    @GetMapping("/nombre")
    public List<Juego> porNombre(String nombre) {
        return this.juegoService.porNombre(nombre);
    }

    @PutMapping("/{id_juego}")
    public Juego replaceJuego(@PathVariable("id_juego") Long id, @RequestBody Juego juego) {
        return this.juegoService.replace(id, juego);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id_juego}")
    public void deleteJuego(@PathVariable("id_juego") Long id) {
        this.juegoService.delete(id);
    }

}
