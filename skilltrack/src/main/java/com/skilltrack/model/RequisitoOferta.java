package com.skilltrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "requisito_oferta", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"oferta_id", "tecnologia_id"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequisitoOferta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oferta_id", nullable = false)
    private Oferta oferta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnologia_id", nullable = false)
    private Tecnologia tecnologia;

    @Column(name = "es_obligatorio", nullable = false)
    private Boolean esObligatorio = true;
}