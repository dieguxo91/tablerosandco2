package proyecto.tablerosandco2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;
import proyecto.tablerosandco2.domain.Partida;
import proyecto.tablerosandco2.service.PartidaService;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/partida/")
public class PartidaController {

    private final PartidaService partidaService;

    public PartidaController(PartidaService partidaService) {
        this.partidaService = partidaService;
    }

    @GetMapping(value = {"","/"})
    public List<Partida> all() {
        log.info("Accediendo a todas las cartas");
        return this.partidaService.all();
    }


    @PostMapping({"","/"})
    public Partida newPartida(@RequestBody Partida partida) {
        return this.partidaService.save(partida);
    }

    @GetMapping("/{id}")
    public Partida one(@PathVariable("id") Long id) {
        return this.partidaService.one(id);
    }


    @ResponseBody
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteCarta(@PathVariable("id") Long id) {
        this.partidaService.delete(id);
    }
}
