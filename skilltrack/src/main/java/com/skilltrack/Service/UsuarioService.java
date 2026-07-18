package com.skilltrack.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.skilltrack.model.HabilidadUsuario;
import com.skilltrack.model.OrigenHabilidad;
import com.skilltrack.model.Tecnologia;
import com.skilltrack.model.Usuario;
import com.skilltrack.repository.HabilidadUsuarioRepository;
import com.skilltrack.repository.TecnologiaRepository;
import com.skilltrack.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final HabilidadUsuarioRepository habilidadUsuarioRepository;
    private final TecnologiaRepository tecnologiaRepository;

    public UsuarioService(UsuarioRepository usuarioRepository,
                           HabilidadUsuarioRepository habilidadUsuarioRepository,
                           TecnologiaRepository tecnologiaRepository) {
        this.usuarioRepository = usuarioRepository;
        this.habilidadUsuarioRepository = habilidadUsuarioRepository;
        this.tecnologiaRepository = tecnologiaRepository;
    }

    public Usuario obtenerPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado: " + id));
    }

    /**
     * Actualiza los datos opcionales del perfil (carrera, semestre, universidad, github).
     * Nombre, email y password no se tocan aqui.
     */
    public Usuario actualizarPerfil(Long id, String carrera, Integer semestre, String universidad, String githubUrl) {
        Usuario usuario = obtenerPorId(id);
        usuario.setCarrera(carrera);
        usuario.setSemestre(semestre);
        usuario.setUniversidad(universidad);
        usuario.setGithubUrl(githubUrl);
        return usuarioRepository.save(usuario);
    }

    public List<HabilidadUsuario> obtenerHabilidades(Long usuarioId) {
        return habilidadUsuarioRepository.findByUsuarioId(usuarioId);
    }

    /**
     * Agrega o actualiza (upsert) una habilidad del usuario para una tecnologia dada.
     * Si el usuario ya tenia esa tecnologia registrada, solo actualiza nivel y origen.
     */
    public HabilidadUsuario agregarHabilidad(Long usuarioId, Long tecnologiaId, Integer nivel, OrigenHabilidad origen) {
        if (nivel < 1 || nivel > 5) {
            throw new IllegalArgumentException("El nivel debe estar entre 1 y 5");
        }

        Usuario usuario = obtenerPorId(usuarioId);

        Tecnologia tecnologia = tecnologiaRepository.findById(tecnologiaId)
                .orElseThrow(() -> new IllegalArgumentException("Tecnologia no encontrada: " + tecnologiaId));

        HabilidadUsuario habilidad = habilidadUsuarioRepository
                .findByUsuarioIdAndTecnologiaId(usuarioId, tecnologiaId)
                .orElse(new HabilidadUsuario());

        habilidad.setUsuario(usuario);
        habilidad.setTecnologia(tecnologia);
        habilidad.setNivel(nivel);
        habilidad.setOrigen(origen);

        return habilidadUsuarioRepository.save(habilidad);
    }
}