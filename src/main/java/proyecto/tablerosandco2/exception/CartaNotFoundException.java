package proyecto.tablerosandco2.exception;

public class CartaNotFoundException extends RuntimeException{
    public CartaNotFoundException(String nombre) {
        super("Not found Carta with id: " + nombre);
    }
}
