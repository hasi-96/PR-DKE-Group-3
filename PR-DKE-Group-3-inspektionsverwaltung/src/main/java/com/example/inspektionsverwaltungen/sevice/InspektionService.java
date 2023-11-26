package com.example.inspektionsverwaltungen.sevice;

import com.example.inspektionsverwaltungen.entity.Inspektion;
import com.example.inspektionsverwaltungen.repository.InspektionRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InspektionService {

    private final InspektionRepository inspektionRepository;

    @Autowired
    public InspektionService(InspektionRepository inspektionRepository) {
        this.inspektionRepository = inspektionRepository;
    }

    public List<Inspektion> getAllInspektionen() {
        return inspektionRepository.findAll();
    }

    public Inspektion getInspektionById(Long id) {
        return inspektionRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Inspektion nicht gefunden"));
    }

    public Inspektion createInspektion(Inspektion inspektion) {
        return inspektionRepository.save(inspektion);
    }

    public Inspektion updateInspektion(Long id, Inspektion inspektionDetails) {
        Inspektion inspektion = getInspektionById(id);
        inspektion.setMaßnahmeID(inspektionDetails.getMassnahmeID());
        inspektion.setJahr(inspektionDetails.getJahr());
        inspektion.setKosten(inspektionDetails.getKosten());
        inspektion.setAnmerkung(inspektionDetails.getAnmerkung());
        return inspektionRepository.save(inspektion);
    }

    public void deleteInspektion(Long id) {
        inspektionRepository.deleteById(id);
    }
}

