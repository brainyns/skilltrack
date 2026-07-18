package com.skilltrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "habilidad_usuario", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"usuario_id", "tecnologia_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HabilidadUsuario {
    {}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnologia_id", nullable = false)
    private Tecnologia tecnologia;

    // Nivel 1 a 5 (las estrellas)
    @Column(nullable = false)
    private Integer nivel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrigenHabilidad origen;
}