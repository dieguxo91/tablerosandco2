package proyecto.tablerosandco2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import proyecto.tablerosandco2.exception.JuegoNotFoundException;

@Slf4j
@ControllerAdvice
public class JuegNotFoundController {
    @ResponseBody
    @ExceptionHandler(JuegoNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String JuegoNotFoundHandler(JuegoNotFoundException juegoNotFoundException) {
        log.debug("Excepción - %s", juegoNotFoundException.toString());
        return juegoNotFoundException.getMessage();
    }
}
