package com.skilltrack.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ActualizarPerfilRequestDTO {

    private String carrera;
    private Integer semestre;
    private String universidad;
    private String githubUrl;
}