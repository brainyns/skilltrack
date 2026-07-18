package com.skilltrack.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroRequestDTO {

    private String nombre;
    private String email;
    private String password;
    private String carrera;
    private Integer semestre;
    private String universidad;
    private String githubUrl;
}