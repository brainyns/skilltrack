package com.skilltrack.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequisitoResponseDTO {

    private Long tecnologiaId;
    private String tecnologiaNombre;
    private Boolean esObligatorio;
}