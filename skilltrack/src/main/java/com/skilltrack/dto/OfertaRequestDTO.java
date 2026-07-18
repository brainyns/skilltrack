package com.skilltrack.dto;
 
import java.util.List;

import com.skilltrack.model.FuenteOferta;

import lombok.Getter;
import lombok.Setter;
 
@Getter
@Setter
public class OfertaRequestDTO {
 
    private String titulo;
    private String empresa;
    private String textoOriginal;
    private FuenteOferta fuente;
 
    // Todas las tecnologias requeridas (ids del catalogo)
    private List<Long> tecnologiaIds;
 
    // Subconjunto de tecnologiaIds que son obligatorias; el resto se marca deseable
    private List<Long> tecnologiaIdsObligatorias;
}