package com.skilltrack.dto;
 
import lombok.Getter;
import lombok.Setter;
 
@Getter
@Setter
public class ItemPlanResponseDTO {
 
    private Long id;
    private Long tecnologiaId;
    private String tecnologiaNombre;
    private Integer semanaAsignada;
    private Boolean completado;
}