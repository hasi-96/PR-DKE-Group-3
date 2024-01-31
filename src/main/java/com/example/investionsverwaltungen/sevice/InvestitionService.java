
package com.example.investionsverwaltungen.sevice;

import com.example.investionsverwaltungen.model.Investition;
import com.example.investionsverwaltungen.repository.InvestitionRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Der {@code InvestitionService} bietet Geschäftslogik und Dienste zur Verwaltung von {@link Investition}-Objekten.
 * Dieser Service fungiert als Zwischenschicht zwischen dem Controller und dem Repository,
 * um Geschäftsregeln und -operationen für Investitionen zu implementieren.
 * Dieser Service verwendet {@link InvestitionRepository}, um Datenbankoperationen auf Investitionsdaten durchzuführen.
 */
@Service
@Setter
@Getter
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
        investition.setMassnahmeid(investitionDetails.getMassnahmeid());
        investition.setJahr(investitionDetails.getJahr());
        investition.setKosten(investitionDetails.getKosten());
        investition.setAnmerkung(investitionDetails.getAnmerkung());
        return investitionRepository.save(investition);
    }

    public void deleteInvestition(Long id) {
        investitionRepository.deleteById(id);
    }
}