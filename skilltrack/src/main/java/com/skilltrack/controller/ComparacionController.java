package com.skilltrack.controller;

import com.skilltrack.dto.*;
import com.skilltrack.model.Comparacion;
import com.skilltrack.model.ItemPlan;
import com.skilltrack.model.Tecnologia;
import com.skilltrack.Service.ComparacionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comparaciones")
public class ComparacionController {

    private final ComparacionService comparacionService;

    public ComparacionController(ComparacionService comparacionService) {
        this.comparacionService = comparacionService;
    }

    @PostMapping
    public ResponseEntity<ComparacionResponseDTO> comparar(@RequestBody ComparacionRequestDTO request) {
        Comparacion comparacion = comparacionService.comparar(request.getUsuarioId(), request.getOfertaId());
        return ResponseEntity.status(HttpStatus.CREATED).body(construirResponseDTO(comparacion));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComparacionResponseDTO> obtenerPorId(@PathVariable Long id) {
        Comparacion comparacion = comparacionService.obtenerPorId(id);
        return ResponseEntity.ok(construirResponseDTO(comparacion));
    }

    @PatchMapping("/plan-items/{itemPlanId}")
    public ResponseEntity<ItemPlanResponseDTO> marcarItemCompletado(@PathVariable Long itemPlanId,
                                                                     @RequestBody ItemPlanUpdateDTO request) {
        ItemPlan item = comparacionService.marcarItemCompletado(itemPlanId, request.getCompletado());
        return ResponseEntity.ok(aItemPlanResponseDTO(item));
    }

    /**
     * Arma el DTO completo: porcentaje + fortalezas + debilidades + plan,
     * recalculando fortalezas/debilidades a partir de las habilidades y
     * requisitos actuales (no se guardan duplicados en la base de datos).
     */
    private ComparacionResponseDTO construirResponseDTO(Comparacion comparacion) {
        Long usuarioId = comparacion.getUsuario().getId();
        Long ofertaId = comparacion.getOferta().getId();

        ComparacionResponseDTO dto = new ComparacionResponseDTO();
        dto.setId(comparacion.getId());
        dto.setUsuarioId(usuarioId);
        dto.setOfertaId(ofertaId);
        dto.setOfertaTitulo(comparacion.getOferta().getTitulo());
        dto.setPorcentajeCompatibilidad(comparacion.getPorcentajeCompatibilidad());

        dto.setFortalezas(comparacionService.obtenerFortalezas(usuarioId, ofertaId).stream()
                .map(this::aTecnologiaResponseDTO)
                .collect(Collectors.toList()));

        dto.setDebilidades(comparacionService.obtenerDebilidades(usuarioId, ofertaId).stream()
                .map(this::aTecnologiaResponseDTO)
                .collect(Collectors.toList()));

        List<ItemPlanResponseDTO> plan;
        try {
            plan = comparacionService.obtenerItemsDelPlan(comparacion.getId()).stream()
                    .map(this::aItemPlanResponseDTO)
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            // Usuario 100% compatible, no hay plan generado
            plan = Collections.emptyList();
        }
        dto.setPlan(plan);

        return dto;
    }

    private TecnologiaResponseDTO aTecnologiaResponseDTO(Tecnologia tecnologia) {
        TecnologiaResponseDTO dto = new TecnologiaResponseDTO();
        dto.setId(tecnologia.getId());
        dto.setNombre(tecnologia.getNombre());
        dto.setCategoria(tecnologia.getCategoria());
        dto.setSinonimos(tecnologia.getSinonimos());
        return dto;
    }

    private ItemPlanResponseDTO aItemPlanResponseDTO(ItemPlan item) {
        ItemPlanResponseDTO dto = new ItemPlanResponseDTO();
        dto.setId(item.getId());
        dto.setTecnologiaId(item.getTecnologia().getId());
        dto.setTecnologiaNombre(item.getTecnologia().getNombre());
        dto.setSemanaAsignada(item.getSemanaAsignada());
        dto.setCompletado(item.getCompletado());
        return dto;
    }
}