package com.skilltrack.Service;

import com.skilltrack.dto.AuthResponseDTO;
import com.skilltrack.dto.LoginRequestDTO;
import com.skilltrack.dto.RegistroRequestDTO;
import com.skilltrack.model.Usuario;
import com.skilltrack.repository.UsuarioRepository;
import com.skilltrack.security.JwtService;
import com.skilltrack.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(UsuarioRepository usuarioRepository,
                        PasswordEncoder passwordEncoder,
                        JwtService jwtService,
                        AuthenticationManager authenticationManager) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponseDTO registrar(RegistroRequestDTO request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Ya existe una cuenta con ese email");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setCarrera(request.getCarrera());
        usuario.setSemestre(request.getSemestre());
        usuario.setUniversidad(request.getUniversidad());
        usuario.setGithubUrl(request.getGithubUrl());

        usuario = usuarioRepository.save(usuario);

        UserPrincipal principal = new UserPrincipal(usuario);
        String token = jwtService.generarToken(principal, usuario.getId());

        return construirRespuesta(usuario, token);
    }

    public AuthResponseDTO login(LoginRequestDTO request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (BadCredentialsException e) {
            throw new IllegalArgumentException("Email o contraseña incorrectos");
        }

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email o contraseña incorrectos"));

        UserPrincipal principal = new UserPrincipal(usuario);
        String token = jwtService.generarToken(principal, usuario.getId());

        return construirRespuesta(usuario, token);
    }

    private AuthResponseDTO construirRespuesta(Usuario usuario, String token) {
        AuthResponseDTO respuesta = new AuthResponseDTO();
        respuesta.setToken(token);
        respuesta.setUsuarioId(usuario.getId());
        respuesta.setNombre(usuario.getNombre());
        respuesta.setEmail(usuario.getEmail());
        return respuesta;
    }
}
