package com.example.inspektionsverwaltungen.repository;

import com.example.inspektionsverwaltungen.entity.Inspektion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InspektionRepository  extends JpaRepository<Inspektion, Long> {

}
