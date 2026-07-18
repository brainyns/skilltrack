package com.skilltrack.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilltrack.Service.UsuarioService;
import com.skilltrack.dto.ActualizarPerfilRequestDTO;
import com.skilltrack.dto.HabilidadRequestDTO;
import com.skilltrack.dto.HabilidadResponseDTO;
import com.skilltrack.dto.UsuarioResponseDTO;
import com.skilltrack.model.HabilidadUsuario;
import com.skilltrack.model.Usuario;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(aResponseDTO(usuarioService.obtenerPorId(id)));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizarPerfil(@PathVariable Long id,
                                                                @RequestBody ActualizarPerfilRequestDTO request) {
        Usuario actualizado = usuarioService.actualizarPerfil(
                id, request.getCarrera(), request.getSemestre(), request.getUniversidad(), request.getGithubUrl());
        return ResponseEntity.ok(aResponseDTO(actualizado));
    }

    @GetMapping("/{id}/habilidades")
    public ResponseEntity<List<HabilidadResponseDTO>> obtenerHabilidades(@PathVariable Long id) {
        List<HabilidadResponseDTO> respuesta = usuarioService.obtenerHabilidades(id).stream()
                .map(this::aHabilidadResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(respuesta);
    }

    @PostMapping("/{id}/habilidades")
    public ResponseEntity<HabilidadResponseDTO> agregarHabilidad(@PathVariable Long id,
                                                                  @RequestBody HabilidadRequestDTO request) {
        HabilidadUsuario habilidad = usuarioService.agregarHabilidad(
                id, request.getTecnologiaId(), request.getNivel(), request.getOrigen());
        return ResponseEntity.status(HttpStatus.CREATED).body(aHabilidadResponseDTO(habilidad));
    }

    private UsuarioResponseDTO aResponseDTO(Usuario usuario) {
        UsuarioResponseDTO dto = new UsuarioResponseDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setEmail(usuario.getEmail());
        dto.setCarrera(usuario.getCarrera());
        dto.setSemestre(usuario.getSemestre());
        dto.setUniversidad(usuario.getUniversidad());
        dto.setGithubUrl(usuario.getGithubUrl());
        dto.setFechaCreacion(usuario.getFechaCreacion());
        return dto;
    }

    private HabilidadResponseDTO aHabilidadResponseDTO(HabilidadUsuario habilidad) {
        HabilidadResponseDTO dto = new HabilidadResponseDTO();
        dto.setId(habilidad.getId());
        dto.setTecnologiaId(habilidad.getTecnologia().getId());
        dto.setTecnologiaNombre(habilidad.getTecnologia().getNombre());
        dto.setNivel(habilidad.getNivel());
        dto.setOrigen(habilidad.getOrigen());
        return dto;
    }
}