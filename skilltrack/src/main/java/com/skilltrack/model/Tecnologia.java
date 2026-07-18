package com.skilltrack.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
 
import java.util.ArrayList;
import java.util.List;
 
@Entity
@Table(name = "tecnologia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Tecnologia {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false, unique = true)
    private String nombre;
 
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoriaTecnologia categoria;
 
    // Lista de sinonimos/alias separados por coma, ej: "Docker Compose,containers,dockerize"
    // Se usa para normalizar texto libre (CV, ofertas pegadas) contra este registro.
    @Column(columnDefinition = "TEXT")
    private String sinonimos;
 
    @OneToMany(mappedBy = "tecnologia")
    private List<HabilidadUsuario> habilidadesUsuario = new ArrayList<>();
 
    @OneToMany(mappedBy = "tecnologia")
    private List<RequisitoOferta> requisitos = new ArrayList<>();
}
 
