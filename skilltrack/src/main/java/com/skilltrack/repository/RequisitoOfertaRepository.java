package com.skilltrack.repository;

import com.skilltrack.model.RequisitoOferta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequisitoOfertaRepository extends JpaRepository<RequisitoOferta, Long> {

    List<RequisitoOferta> findByOfertaId(Long ofertaId);
}