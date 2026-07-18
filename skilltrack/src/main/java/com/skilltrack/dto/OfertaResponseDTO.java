package com.skilltrack.dto;
 
import com.skilltrack.model.FuenteOferta;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class OfertaResponseDTO {
 
    private Long id;
    private String titulo;
    private String empresa;
    private FuenteOferta fuente;
    private List<RequisitoResponseDTO> requisitos;
}