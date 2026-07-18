package com.skilltrack.repository;

import com.skilltrack.model.Comparacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComparacionRepository extends JpaRepository<Comparacion, Long> {

    List<Comparacion> findByUsuarioIdOrderByFechaCreacionDesc(Long usuarioId);
}