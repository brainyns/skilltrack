package com.skilltrack.repository;

import com.skilltrack.model.FuenteOferta;
import com.skilltrack.model.Oferta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OfertaRepository extends JpaRepository<Oferta, Long> {

    List<Oferta> findByFuente(FuenteOferta fuente);

    List<Oferta> findByTituloContainingIgnoreCase(String titulo);
}