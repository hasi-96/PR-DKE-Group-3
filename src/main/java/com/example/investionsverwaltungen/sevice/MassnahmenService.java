package com.example.investionsverwaltungen.sevice;


import com.example.investionsverwaltungen.model.Massnahme;
import com.example.investionsverwaltungen.repository.MassnahmenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Der {@code MassnahmenService} bietet eine Reihe von Diensten zur Verwaltung von {@link Massnahme}-Objekten.
 * Diese Dienste ermöglichen das Abrufen, Erstellen, Aktualisieren und Löschen von Maßnahmendatensätzen.
 * Dieser Service dient als Brücke zwischen der Controller-Schicht und der Datenzugriffsschicht,
 * repräsentiert durch das {@link MassnahmenRepository}. Er implementiert die Geschäftslogik,
 * die auf die Maßnahmendaten angewendet wird, und abstrahiert die Datenzugriffsoperationen vom Controller.
 */
@Service
public class MassnahmenService {
    private final MassnahmenRepository massnahmenRepository;

    @Autowired
    public MassnahmenService(MassnahmenRepository massnahmenRepository) {
        this.massnahmenRepository = massnahmenRepository;
    }

    public List<Massnahme> getAllMassnahmen() {
        return massnahmenRepository.findAll();
    }

    public Massnahme getMassnahmeById(Long id) {
        return massnahmenRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Die Massnahme konnte nicht gefunden werden")
        );
    }

    public Massnahme createMassnahme(Massnahme massnahme) {
        return massnahmenRepository.save(massnahme);
    }

    public Massnahme updateMassnahme(Long id, Massnahme massnahmeDetails) {
        Massnahme massnahme = getMassnahmeById(id);
        massnahme.setAnmerkung(massnahmeDetails.getAnmerkung());
        massnahme.setStatus(massnahmeDetails.getStatus());
        massnahme.setDringlichkeit(massnahmeDetails.getDringlichkeit());
        massnahme.setObjektid(massnahmeDetails.getObjektid());
        massnahme.setBauteil(massnahmeDetails.getBauteil());
        return massnahmenRepository.save(massnahme);
    }

    public void deleteMassnahme(Long id) {
        massnahmenRepository.deleteById(id);
    }
}