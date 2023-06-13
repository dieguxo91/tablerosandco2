package proyecto.tablerosandco2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import proyecto.tablerosandco2.domain.Carta;
import proyecto.tablerosandco2.service.CartaService;


import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/carta/")
public class CartaController {

    private final CartaService cartaService;

    public CartaController(CartaService cartaService) {
        this.cartaService = cartaService;
    }

    @GetMapping(value = {"","/"}, params={"!pagina", "!tamanio"})
    public List<Carta> all() {
        log.info("Accediendo a todas las cartas");
        return this.cartaService.all();
    }

    @GetMapping(value = {"","/"})
    public ResponseEntity<Map<String, Object>> all(@RequestParam(value = "pagina", defaultValue = "0") int pagina
            , @RequestParam(value = "tamanio", defaultValue = "3") int tamanio) {

        log.info("Accediendo a todos las cartas con paginación");

        Map<String, Object> responseAll = this.cartaService.all(pagina, tamanio);

        return ResponseEntity.ok(responseAll);
    }

    @Secured("ROL_ADMIN")
    @PostMapping({"","/"})
    public Carta newCarta(@RequestBody Carta carta) {
        return this.cartaService.save(carta);
    }

    @GetMapping("/{nombre}")
    public Carta one(@PathVariable("nombre") String nombre) {
        return this.cartaService.one(nombre);
    }

    @PutMapping("/{nombre}")
    public Carta replaceCarta(@PathVariable("nombre") String nombre, @RequestBody Carta carta) {
        return this.cartaService.replace(nombre, carta);
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{nombre}")
    public void deleteCarta(@PathVariable("nombre") String nombre) {
        this.cartaService.delete(nombre);
    }
}
