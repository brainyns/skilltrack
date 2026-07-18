package com.skilltrack.repository;

import com.skilltrack.model.ItemPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemPlanRepository extends JpaRepository<ItemPlan, Long> {

    List<ItemPlan> findByPlanIdOrderBySemanaAsignadaAsc(Long planId);
}