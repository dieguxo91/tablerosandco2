package proyecto.tablerosandco2.exception;

public class JuegoNotFoundException extends RuntimeException {
    public JuegoNotFoundException(Long id) {
        super("Not found Juego with id: " + id);
    }
}
