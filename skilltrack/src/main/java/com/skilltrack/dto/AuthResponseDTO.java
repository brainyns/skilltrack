package com.skilltrack.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDTO {

    private String token;
    private Long usuarioId;
    private String nombre;
    private String email;
}