package com.skilltrack.dto;
 
import lombok.Getter;
import lombok.Setter;
 
import java.util.List;
 
@Getter
@Setter
public class ComparacionResponseDTO {
 
    private Long id;
    private Long usuarioId;
    private Long ofertaId;
    private String ofertaTitulo;
    private Double porcentajeCompatibilidad;
    private List<TecnologiaResponseDTO> fortalezas;
    private List<TecnologiaResponseDTO> debilidades;
    private List<ItemPlanResponseDTO> plan;
}
 