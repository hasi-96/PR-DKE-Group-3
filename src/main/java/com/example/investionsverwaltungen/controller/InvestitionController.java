package com.example.investionsverwaltungen.controller;

import com.example.investionsverwaltungen.model.Investition;

import com.example.investionsverwaltungen.sevice.InvestitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Der {@code InvestitionController} ist eine Spring REST Controller-Klasse, die HTTP-Anfragen für die Verwaltung von Investitionen verarbeitet.
 * Sie bietet Endpunkte zum Erstellen, Abrufen, Aktualisieren und Löschen von Investitionsdatensätzen.
 * Dieser Controller ermöglicht die Interaktion mit der Investitions-Domäne und verwendet {@link InvestitionService},
 * um Geschäftslogikoperationen auszuführen.
 * Die Klasse unterstützt Cross-Origin-Anfragen von "http://localhost:4200", was die Nutzung dieser API von einer Frontend-Anwendung, die auf diesem Host läuft,
 * * erleichtert.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/investitionen")
public class InvestitionController {

    private final InvestitionService investitionService;

    @Autowired
    public InvestitionController(InvestitionService investitionService) {
        this.investitionService = investitionService;
    }

    @GetMapping
    public ResponseEntity<List<Investition>> getAllInvestitionen() {
        List<Investition> invest = investitionService.getAllInvestitionen();
        return ResponseEntity.ok(invest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Investition> getInvestitionById(@PathVariable Long id) {
        Investition investition = investitionService.getInvestitionById(id);
        return ResponseEntity.ok(investition);
    }

    @PostMapping
    public ResponseEntity<Investition> createInvestition(@RequestBody Investition investition) {
        Investition createdInvestition = investitionService.createInvestition(investition);
        return new ResponseEntity<>(createdInvestition, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Investition> updateInvestition(@RequestBody Investition investitionDetails) {
        Investition updatedInvestition = investitionService.updateInvestition(investitionDetails.getId(), investitionDetails);
        return ResponseEntity.ok(updatedInvestition);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInvestition(@PathVariable Long id) {
        investitionService.deleteInvestition(id);
        return ResponseEntity.noContent().build();
    }
}



