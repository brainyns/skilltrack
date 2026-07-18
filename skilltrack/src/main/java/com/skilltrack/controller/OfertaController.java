package com.skilltrack.controller;

import com.skilltrack.dto.OfertaRequestDTO;
import com.skilltrack.dto.OfertaResponseDTO;
import com.skilltrack.dto.RequisitoResponseDTO;
import com.skilltrack.model.Oferta;
import com.skilltrack.model.RequisitoOferta;
import com.skilltrack.Service.OfertaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ofertas")
public class OfertaController {

    private final OfertaService ofertaService;

    public OfertaController(OfertaService ofertaService) {
        this.ofertaService = ofertaService;
    }

    @GetMapping
    public ResponseEntity<List<OfertaResponseDTO>> listarTodas() {
        List<OfertaResponseDTO> respuesta = ofertaService.listarTodas().stream()
                .map(this::aResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfertaResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(aResponseDTO(ofertaService.obtenerPorId(id)));
    }

    @PostMapping
    public ResponseEntity<OfertaResponseDTO> crear(@RequestBody OfertaRequestDTO request) {
        Oferta creada = ofertaService.crearConRequisitos(
                request.getTitulo(),
                request.getEmpresa(),
                request.getTextoOriginal(),
                request.getFuente(),
                request.getTecnologiaIds(),
                request.getTecnologiaIdsObligatorias());
        return ResponseEntity.status(HttpStatus.CREATED).body(aResponseDTO(creada));
    }

    private OfertaResponseDTO aResponseDTO(Oferta oferta) {
        OfertaResponseDTO dto = new OfertaResponseDTO();
        dto.setId(oferta.getId());
        dto.setTitulo(oferta.getTitulo());
        dto.setEmpresa(oferta.getEmpresa());
        dto.setFuente(oferta.getFuente());
        dto.setRequisitos(oferta.getRequisitos().stream()
                .map(this::aRequisitoResponseDTO)
                .collect(Collectors.toList()));
        return dto;
    }

    private RequisitoResponseDTO aRequisitoResponseDTO(RequisitoOferta requisito) {
        RequisitoResponseDTO dto = new RequisitoResponseDTO();
        dto.setTecnologiaId(requisito.getTecnologia().getId());
        dto.setTecnologiaNombre(requisito.getTecnologia().getNombre());
        dto.setEsObligatorio(requisito.getEsObligatorio());
        return dto;
    }
}