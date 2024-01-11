package com.example.investionsverwaltungen.repository;

import com.example.investionsverwaltungen.model.Investition;
import com.example.investionsverwaltungen.model.Massnahme;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MassnahmenRepository  extends JpaRepository<Massnahme, Long> {
}
