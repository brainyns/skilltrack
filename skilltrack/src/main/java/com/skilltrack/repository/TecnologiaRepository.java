package com.skilltrack.repository;

import com.skilltrack.model.CategoriaTecnologia;
import com.skilltrack.model.Tecnologia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TecnologiaRepository extends JpaRepository<Tecnologia, Long> {

    Optional<Tecnologia> findByNombreIgnoreCase(String nombre);

    List<Tecnologia> findByCategoria(CategoriaTecnologia categoria);
}