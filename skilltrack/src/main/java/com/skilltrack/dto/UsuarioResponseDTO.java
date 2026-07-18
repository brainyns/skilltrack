package com.skilltrack.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioResponseDTO {

    private Long id;
    private String nombre;
    private String email;
    private String carrera;
    private Integer semestre;
    private String universidad;
    private String githubUrl;
    private LocalDateTime fechaCreacion;
}