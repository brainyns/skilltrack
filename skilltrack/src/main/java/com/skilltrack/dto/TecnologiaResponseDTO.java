package com.skilltrack.dto;
 
import com.skilltrack.model.CategoriaTecnologia;

import lombok.Getter;
import lombok.Setter;
 
@Getter
@Setter
public class TecnologiaResponseDTO {
 
    private Long id;
    private String nombre;
    private CategoriaTecnologia categoria;
    private String sinonimos;
}
 