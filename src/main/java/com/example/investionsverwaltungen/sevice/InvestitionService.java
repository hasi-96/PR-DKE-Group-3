package com.example.investionsverwaltungen.sevice;

import com.example.investionsverwaltungen.entity.Investition;
import com.example.investionsverwaltungen.repository.InvestitionRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvestitionService {

    private final InvestitionRepository investitionRepository;

    @Autowired
    public InvestitionService(InvestitionRepository investitionRepository) {
        this.investitionRepository = investitionRepository;
    }

    public List<Investition> getAllInvestitionen() {
        return investitionRepository.findAll();
    }

    public Investition getInvestitionById(Long id) {
        return investitionRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Investition nicht gefunden"));
    }

    public Investition createInvestition(Investition investition) {
        return investitionRepository.save(investition);
    }

    public Investition updateInvestition(Long id, Investition investitionDetails) {
        Investition investition = getInvestitionById(id);
        investition.setMaßnahmeID(investitionDetails.getMassnahmeID());
        investition.setJahr(investitionDetails.getJahr());
        investition.setKosten(investitionDetails.getKosten());
        investition.setAnmerkung(investitionDetails.getAnmerkung());
        return investitionRepository.save(investition);
    }

    public void deleteInvestition(Long id) {
        investitionRepository.deleteById(id);
    }
}

