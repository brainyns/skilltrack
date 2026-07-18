package com.skilltrack.repository;

import com.skilltrack.model.HabilidadUsuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HabilidadUsuarioRepository extends JpaRepository<HabilidadUsuario, Long> {

    List<HabilidadUsuario> findByUsuarioId(Long usuarioId);

    Optional<HabilidadUsuario> findByUsuarioIdAndTecnologiaId(Long usuarioId, Long tecnologiaId);
}