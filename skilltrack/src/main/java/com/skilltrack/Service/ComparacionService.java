package com.skilltrack.Service;

import com.skilltrack.model.*;
import com.skilltrack.repository.ComparacionRepository;
import com.skilltrack.repository.HabilidadUsuarioRepository;
import com.skilltrack.repository.ItemPlanRepository;
import com.skilltrack.repository.PlanEstudioRepository;
import com.skilltrack.repository.RequisitoOfertaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ComparacionService {

    private final ComparacionRepository comparacionRepository;
    private final HabilidadUsuarioRepository habilidadUsuarioRepository;
    private final RequisitoOfertaRepository requisitoOfertaRepository;
    private final PlanEstudioRepository planEstudioRepository;
    private final ItemPlanRepository itemPlanRepository;
    private final UsuarioService usuarioService;
    private final OfertaService ofertaService;

    public ComparacionService(ComparacionRepository comparacionRepository,
                               HabilidadUsuarioRepository habilidadUsuarioRepository,
                               RequisitoOfertaRepository requisitoOfertaRepository,
                               PlanEstudioRepository planEstudioRepository,
                               ItemPlanRepository itemPlanRepository,
                               UsuarioService usuarioService,
                               OfertaService ofertaService) {
        this.comparacionRepository = comparacionRepository;
        this.habilidadUsuarioRepository = habilidadUsuarioRepository;
        this.requisitoOfertaRepository = requisitoOfertaRepository;
        this.planEstudioRepository = planEstudioRepository;
        this.itemPlanRepository = itemPlanRepository;
        this.usuarioService = usuarioService;
        this.ofertaService = ofertaService;
    }

    /**
     * Compara las habilidades del usuario contra los requisitos de la oferta,
     * guarda el resultado (Comparacion) y genera automaticamente el PlanEstudio
     * con un ItemPlan por cada tecnologia faltante, una por semana.
     */
    @Transactional
    public Comparacion comparar(Long usuarioId, Long ofertaId) {
        Usuario usuario = usuarioService.obtenerPorId(usuarioId);
        Oferta oferta = ofertaService.obtenerPorId(ofertaId);

        Set<Long> tecnologiasUsuario = habilidadUsuarioRepository.findByUsuarioId(usuarioId).stream()
                .map(h -> h.getTecnologia().getId())
                .collect(Collectors.toSet());

        List<RequisitoOferta> requisitos = requisitoOfertaRepository.findByOfertaId(ofertaId);

        if (requisitos.isEmpty()) {
            throw new IllegalArgumentException("La oferta no tiene requisitos definidos");
        }

        long cumplidos = requisitos.stream()
                .filter(r -> tecnologiasUsuario.contains(r.getTecnologia().getId()))
                .count();

        double porcentaje = (cumplidos * 100.0) / requisitos.size();

        Comparacion comparacion = new Comparacion();
        comparacion.setUsuario(usuario);
        comparacion.setOferta(oferta);
        comparacion.setPorcentajeCompatibilidad(Math.round(porcentaje * 100.0) / 100.0);
        comparacion = comparacionRepository.save(comparacion);

        List<Tecnologia> debilidades = obtenerDebilidades(usuarioId, ofertaId);
        generarPlan(comparacion, debilidades);

        return comparacion;
    }

    public Comparacion obtenerPorId(Long comparacionId) {
        return comparacionRepository.findById(comparacionId)
                .orElseThrow(() -> new IllegalArgumentException("Comparacion no encontrada: " + comparacionId));
    }

    public List<Tecnologia> obtenerFortalezas(Long usuarioId, Long ofertaId) {
        Set<Long> tecnologiasUsuario = habilidadUsuarioRepository.findByUsuarioId(usuarioId).stream()
                .map(h -> h.getTecnologia().getId())
                .collect(Collectors.toSet());

        return requisitoOfertaRepository.findByOfertaId(ofertaId).stream()
                .map(RequisitoOferta::getTecnologia)
                .filter(t -> tecnologiasUsuario.contains(t.getId()))
                .collect(Collectors.toList());
    }

    public List<Tecnologia> obtenerDebilidades(Long usuarioId, Long ofertaId) {
        Set<Long> tecnologiasUsuario = habilidadUsuarioRepository.findByUsuarioId(usuarioId).stream()
                .map(h -> h.getTecnologia().getId())
                .collect(Collectors.toSet());

        return requisitoOfertaRepository.findByOfertaId(ofertaId).stream()
                .map(RequisitoOferta::getTecnologia)
                .filter(t -> !tecnologiasUsuario.contains(t.getId()))
                .collect(Collectors.toList());
    }

    /**
     * Genera un plan simple: una tecnologia faltante por semana, en el orden
     * en que vienen las debilidades. Si no hay debilidades (100% compatible),
     * no se crea plan.
     */
    private void generarPlan(Comparacion comparacion, List<Tecnologia> debilidades) {
        if (debilidades.isEmpty()) {
            return;
        }

        PlanEstudio plan = new PlanEstudio();
        plan.setComparacion(comparacion);
        plan.setSemanas(debilidades.size());
        plan = planEstudioRepository.save(plan);

        for (int i = 0; i < debilidades.size(); i++) {
            ItemPlan item = new ItemPlan();
            item.setPlan(plan);
            item.setTecnologia(debilidades.get(i));
            item.setSemanaAsignada(i + 1);
            item.setCompletado(false);
            itemPlanRepository.save(item);
        }
    }

    public List<ItemPlan> obtenerItemsDelPlan(Long comparacionId) {
        PlanEstudio plan = planEstudioRepository.findByComparacionId(comparacionId)
                .orElseThrow(() -> new IllegalArgumentException("Esta comparacion no tiene plan (usuario 100% compatible)"));

        return itemPlanRepository.findByPlanIdOrderBySemanaAsignadaAsc(plan.getId());
    }

    /**
     * Marca un item del plan como completado o pendiente. Alimenta el
     * modulo de seguimiento de progreso.
     */
    @Transactional
    public ItemPlan marcarItemCompletado(Long itemPlanId, boolean completado) {
        ItemPlan item = itemPlanRepository.findById(itemPlanId)
                .orElseThrow(() -> new IllegalArgumentException("Item de plan no encontrado: " + itemPlanId));
        item.setCompletado(completado);
        return itemPlanRepository.save(item);
    }
}