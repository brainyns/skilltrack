package com.skilltrack.Service;

import com.skilltrack.model.CategoriaTecnologia;
import com.skilltrack.model.Tecnologia;
import com.skilltrack.repository.TecnologiaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TecnologiaService {

    private final TecnologiaRepository tecnologiaRepository;

    public TecnologiaService(TecnologiaRepository tecnologiaRepository) {
        this.tecnologiaRepository = tecnologiaRepository;
    }

    public List<Tecnologia> listarTodas() {
        return tecnologiaRepository.findAll();
    }

    public Tecnologia crear(String nombre, CategoriaTecnologia categoria, String sinonimos) {
        tecnologiaRepository.findByNombreIgnoreCase(nombre).ifPresent(t -> {
            throw new IllegalArgumentException("La tecnologia '" + nombre + "' ya existe");
        });

        Tecnologia tecnologia = new Tecnologia();
        tecnologia.setNombre(nombre);
        tecnologia.setCategoria(categoria);
        tecnologia.setSinonimos(sinonimos);
        return tecnologiaRepository.save(tecnologia);
    }

    /**
     * Busca una tecnologia por nombre exacto o por sinonimo.
     * Es el metodo clave para normalizar texto libre (CV, ofertas pegadas)
     * contra el catalogo, evitando duplicados como "Docker" vs "docker" vs "Docker Compose".
     */
    public Tecnologia buscarPorNombreOSinonimo(String textoLibre) {
        String normalizado = textoLibre.trim().toLowerCase();

        return tecnologiaRepository.findAll().stream()
                .filter(t -> coincideNombreOSinonimo(t, normalizado))
                .findFirst()
                .orElse(null);
    }

    private boolean coincideNombreOSinonimo(Tecnologia tecnologia, String textoNormalizado) {
        if (tecnologia.getNombre().toLowerCase().equals(textoNormalizado)) {
            return true;
        }
        if (tecnologia.getSinonimos() == null) {
            return false;
        }
        String[] sinonimos = tecnologia.getSinonimos().split(",");
        for (String sinonimo : sinonimos) {
            if (sinonimo.trim().toLowerCase().equals(textoNormalizado)) {
                return true;
            }
        }
        return false;
    }
}