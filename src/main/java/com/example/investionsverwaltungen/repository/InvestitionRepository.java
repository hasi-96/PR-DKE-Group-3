package com.example.investionsverwaltungen.repository;

import com.example.investionsverwaltungen.model.Investition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestitionRepository extends JpaRepository<Investition, Long> {

}
