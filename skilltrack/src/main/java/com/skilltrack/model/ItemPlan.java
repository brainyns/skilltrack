package com.skilltrack.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "item_plan")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    private PlanEstudio plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tecnologia_id", nullable = false)
    private Tecnologia tecnologia;

    @Column(name = "semana_asignada", nullable = false)
    private Integer semanaAsignada;

    @Column(nullable = false)
    private Boolean completado = false;
}