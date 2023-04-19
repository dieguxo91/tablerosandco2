package proyecto.tablerosandco2.exception;

public class UsuarioNotFoundException extends RuntimeException {
    public UsuarioNotFoundException(Long id) {
        super("Not found Usuario with id: " + id);
    }
}
