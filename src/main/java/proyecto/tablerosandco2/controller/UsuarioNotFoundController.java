package proyecto.tablerosandco2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import proyecto.tablerosandco2.exception.JuegoNotFoundException;
import proyecto.tablerosandco2.exception.UsuarioNotFoundException;

@Slf4j
@ControllerAdvice
public class UsuarioNotFoundController {
    @ResponseBody
    @ExceptionHandler(UsuarioNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String UsuarioNotFoundHandler(UsuarioNotFoundException usuarioNotFoundException) {
        log.debug("Excepción - %s", usuarioNotFoundException.toString());
        return usuarioNotFoundException.getMessage();
    }
}
