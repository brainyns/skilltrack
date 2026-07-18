package com.skilltrack.dto;
 
import com.skilltrack.model.OrigenHabilidad;

import lombok.Getter;
import lombok.Setter;
 
@Getter
@Setter
public class HabilidadRequestDTO {
 
    private Long tecnologiaId;
    private Integer nivel;
    private OrigenHabilidad origen;
}