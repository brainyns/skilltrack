package com.skilltrack.exception;
 
import lombok.Getter;
import lombok.Setter;
 
import java.time.LocalDateTime;
 
@Getter
@Setter
public class ErrorResponse {
 
    private LocalDateTime timestamp;
    private int status;
    private String mensaje;
 
    public ErrorResponse(int status, String mensaje) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.mensaje = mensaje;
    }
}
 