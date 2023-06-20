package proyecto.tablerosandco2.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import proyecto.tablerosandco2.exception.JuegoNotFoundException;
import proyecto.tablerosandco2.exception.PartidaNotFoundException;

@Slf4j
@ControllerAdvice
public class PartidaNotFoundController {
    @ResponseBody
    @ExceptionHandler(PartidaNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String PartidaNotFoundHandler(PartidaNotFoundException partidaNotFoundException) {
        log.debug("Excepción - %s", partidaNotFoundException.toString());
        return partidaNotFoundException.getMessage();
    }
}
