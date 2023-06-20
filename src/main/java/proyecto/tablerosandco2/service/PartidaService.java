package proyecto.tablerosandco2.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import proyecto.tablerosandco2.domain.Carta;
import proyecto.tablerosandco2.domain.Partida;
import proyecto.tablerosandco2.exception.CartaNotFoundException;
import proyecto.tablerosandco2.exception.JuegoNotFoundException;
import proyecto.tablerosandco2.exception.PartidaNotFoundException;
import proyecto.tablerosandco2.repository.CartasRepository;
import proyecto.tablerosandco2.repository.PartidaRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PartidaService {
    private final PartidaRepository partidaRepository;

    public PartidaService(PartidaRepository partidaRepository) {
        this.partidaRepository = partidaRepository;
    }

    public List<Partida> all() {
        return this.partidaRepository.findAll();
    }


    public Partida save(Partida partida) {

        return this.partidaRepository.save(partida);
    }

    public Partida one(Long id) {
       Partida partida = this.partidaRepository.findById(id).orElseThrow(() -> new PartidaNotFoundException(id));
        System.out.println(partida);;
        return partida;
    }



    public void delete(Long id) {
        this.partidaRepository.findById(id).map(p -> {this.partidaRepository.delete(p);
                    return p;});
    }
}
