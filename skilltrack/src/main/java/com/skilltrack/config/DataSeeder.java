package com.skilltrack.config;

import com.skilltrack.model.CategoriaTecnologia;
import com.skilltrack.model.FuenteOferta;
import com.skilltrack.model.Tecnologia;
import com.skilltrack.repository.TecnologiaRepository;
import com.skilltrack.Service.OfertaService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final TecnologiaRepository tecnologiaRepository;
    private final OfertaService ofertaService;

    public DataSeeder(TecnologiaRepository tecnologiaRepository, OfertaService ofertaService) {
        this.tecnologiaRepository = tecnologiaRepository;
        this.ofertaService = ofertaService;
    }

    @Override
    public void run(String... args) {
        if (tecnologiaRepository.count() > 0) {
            return; // ya hay datos, no volver a sembrar
        }

        Tecnologia java = crearTecnologia("Java", CategoriaTecnologia.BACKEND, null);
        Tecnologia springBoot = crearTecnologia("Spring Boot", CategoriaTecnologia.BACKEND, "Spring");
        Tecnologia python = crearTecnologia("Python", CategoriaTecnologia.BACKEND, null);
        Tecnologia react = crearTecnologia("React", CategoriaTecnologia.FRONTEND, "ReactJS");
        Tecnologia javascript = crearTecnologia("JavaScript", CategoriaTecnologia.FRONTEND, "JS");
        Tecnologia typescript = crearTecnologia("TypeScript", CategoriaTecnologia.FRONTEND, "TS");
        Tecnologia mysql = crearTecnologia("MySQL", CategoriaTecnologia.BASE_DATOS, null);
        Tecnologia postgresql = crearTecnologia("PostgreSQL", CategoriaTecnologia.BASE_DATOS, "Postgres");
        Tecnologia mongodb = crearTecnologia("MongoDB", CategoriaTecnologia.BASE_DATOS, "Mongo");
        Tecnologia docker = crearTecnologia("Docker", CategoriaTecnologia.DEVOPS, "Docker Compose,containers");
        Tecnologia kubernetes = crearTecnologia("Kubernetes", CategoriaTecnologia.DEVOPS, "K8s");
        Tecnologia aws = crearTecnologia("AWS", CategoriaTecnologia.CLOUD, "Amazon Web Services");
        Tecnologia git = crearTecnologia("Git", CategoriaTecnologia.CONTROL_VERSIONES, "GitHub,GitLab");
        Tecnologia testing = crearTecnologia("Testing", CategoriaTecnologia.TESTING, "JUnit,pruebas unitarias,unit testing");

        // Oferta de ejemplo 1: Backend Junior
        ofertaService.crearConRequisitos(
                "Backend Junior",
                "Empresa Ejemplo S.A.S",
                "Buscamos desarrollador backend junior con conocimientos en Java, Spring Boot, Git, "
                        + "Docker, Testing y PostgreSQL.",
                FuenteOferta.DATASET,
                idsDe(java, springBoot, git, docker, testing, postgresql),
                idsDe(java, springBoot, git));

        // Oferta de ejemplo 2: Frontend Junior
        ofertaService.crearConRequisitos(
                "Frontend Junior",
                "Empresa Ejemplo S.A.S",
                "Buscamos desarrollador frontend junior con React, JavaScript, Git y Testing.",
                FuenteOferta.DATASET,
                idsDe(react, javascript, git, testing),
                idsDe(react, javascript, git));

        // Oferta de ejemplo 3: Full Stack Junior
        ofertaService.crearConRequisitos(
                "Full Stack Junior",
                "Empresa Ejemplo S.A.S",
                "Buscamos desarrollador full stack junior con Java, Spring Boot, React, MySQL, Git y Docker.",
                FuenteOferta.DATASET,
                idsDe(java, springBoot, react, mysql, git, docker),
                idsDe(java, springBoot, react, git));
    }

    private Tecnologia crearTecnologia(String nombre, CategoriaTecnologia categoria, String sinonimos) {
        Tecnologia tecnologia = new Tecnologia();
        tecnologia.setNombre(nombre);
        tecnologia.setCategoria(categoria);
        tecnologia.setSinonimos(sinonimos);
        return tecnologiaRepository.save(tecnologia);
    }

    private List<Long> idsDe(Tecnologia... tecnologias) {
        return Arrays.stream(tecnologias).map(Tecnologia::getId).toList();
    }
}