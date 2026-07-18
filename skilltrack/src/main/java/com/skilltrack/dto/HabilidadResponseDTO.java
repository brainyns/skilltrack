package com.skilltrack.dto;

import com.skilltrack.model.OrigenHabilidad;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HabilidadResponseDTO {

    private Long id;
    private Long tecnologiaId;
    private String tecnologiaNombre;
    private Integer nivel;
    private OrigenHabilidad origen;
}