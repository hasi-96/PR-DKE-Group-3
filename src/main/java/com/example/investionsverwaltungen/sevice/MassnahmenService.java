package com.example.investionsverwaltungen.sevice;

import com.example.investionsverwaltungen.model.Investition;
import com.example.investionsverwaltungen.model.Massnahme;
import com.example.investionsverwaltungen.repository.MassnahmenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Massnahme getMassnahmeById(Long id){
        return massnahmenRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Die Massnahme konnte nicht gefunden werden")
        );
    }
    public Massnahme createMassnahme(Massnahme massnahme){return  massnahmenRepository.save(massnahme);}
    public Massnahme updateMassnahme(Long id, Massnahme massnahmeDetails) {
        Massnahme massnahme = getMassnahmeById(id);
        massnahme.setBezeichnung(massnahmeDetails.getBezeichnung());
        massnahme.setInvestition(massnahmeDetails.getInvestition());
        massnahme.setStatus(massnahmeDetails.getStatus());
        massnahme.setDringlichkeit(massnahmeDetails.getDringlichkeit());
        return massnahmenRepository.save(massnahme);
    }
    public void deleteMassnahme(Long id) {
        massnahmenRepository.deleteById(id);
    }
}
