package proyecto.tablerosandco2.exception;

public class PartidaNotFoundException extends RuntimeException{
    public PartidaNotFoundException(Long id) {
        super("Not found Partida with id: " + id);
    }
}
