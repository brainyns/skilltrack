package com.skilltrack.controller;

import com.skilltrack.dto.TecnologiaRequestDTO;
import com.skilltrack.dto.TecnologiaResponseDTO;
import com.skilltrack.model.Tecnologia;
import com.skilltrack.Service.TecnologiaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tecnologias")
public class TecnologiaController {

    private final TecnologiaService tecnologiaService;

    public TecnologiaController(TecnologiaService tecnologiaService) {
        this.tecnologiaService = tecnologiaService;
    }

    @GetMapping
    public ResponseEntity<List<TecnologiaResponseDTO>> listarTodas() {
        List<TecnologiaResponseDTO> respuesta = tecnologiaService.listarTodas().stream()
                .map(this::aResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(respuesta);
    }

    @PostMapping
    public ResponseEntity<TecnologiaResponseDTO> crear(@RequestBody TecnologiaRequestDTO request) {
        Tecnologia creada = tecnologiaService.crear(request.getNombre(), request.getCategoria(), request.getSinonimos());
        return ResponseEntity.status(HttpStatus.CREATED).body(aResponseDTO(creada));
    }

    private TecnologiaResponseDTO aResponseDTO(Tecnologia tecnologia) {
        TecnologiaResponseDTO dto = new TecnologiaResponseDTO();
        dto.setId(tecnologia.getId());
        dto.setNombre(tecnologia.getNombre());
        dto.setCategoria(tecnologia.getCategoria());
        dto.setSinonimos(tecnologia.getSinonimos());
        return dto;
    }
}