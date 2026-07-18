package com.skilltrack.Service;

import com.skilltrack.model.FuenteOferta;
import com.skilltrack.model.Oferta;
import com.skilltrack.model.RequisitoOferta;
import com.skilltrack.model.Tecnologia;
import com.skilltrack.repository.OfertaRepository;
import com.skilltrack.repository.TecnologiaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfertaService {

    private final OfertaRepository ofertaRepository;
    private final TecnologiaRepository tecnologiaRepository;

    public OfertaService(OfertaRepository ofertaRepository, TecnologiaRepository tecnologiaRepository) {
        this.ofertaRepository = ofertaRepository;
        this.tecnologiaRepository = tecnologiaRepository;
    }

    public List<Oferta> listarTodas() {
        return ofertaRepository.findAll();
    }

    public Oferta obtenerPorId(Long id) {
        return ofertaRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Oferta no encontrada: " + id));
    }

    /**
     * Crea una oferta junto con sus requisitos.
     * tecnologiaIds: ids de tecnologias requeridas (ya normalizadas contra el catalogo).
     * tecnologiaIdsObligatorias: subconjunto de tecnologiaIds que son obligatorias (el resto se marca deseable).
     */
    public Oferta crearConRequisitos(String titulo, String empresa, String textoOriginal,
                                      FuenteOferta fuente, List<Long> tecnologiaIds,
                                      List<Long> tecnologiaIdsObligatorias) {
        Oferta oferta = new Oferta();
        oferta.setTitulo(titulo);
        oferta.setEmpresa(empresa);
        oferta.setTextoOriginal(textoOriginal);
        oferta.setFuente(fuente);

        for (Long tecnologiaId : tecnologiaIds) {
            Tecnologia tecnologia = tecnologiaRepository.findById(tecnologiaId)
                    .orElseThrow(() -> new IllegalArgumentException("Tecnologia no encontrada: " + tecnologiaId));

            RequisitoOferta requisito = new RequisitoOferta();
            requisito.setOferta(oferta);
            requisito.setTecnologia(tecnologia);
            requisito.setEsObligatorio(tecnologiaIdsObligatorias.contains(tecnologiaId));

            oferta.getRequisitos().add(requisito);
        }

        return ofertaRepository.save(oferta);
    }
}